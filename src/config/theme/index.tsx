"use client";

import {
  createTheme,
  responsiveFontSizes,
  type Shadows,
  type Theme,
  type ThemeOptions
} from '@mui/material/styles';


// === Module Augmentation: Palette.neutral ===
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// === Module Augmentation: Button variant "soft" ===
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

const brand = {
  primary: { main: '#2563eb' },    // blue-600
  secondary: { main: '#9333ea' },  // purple-600
  neutral: { main: '#64748B' },    // slate-500
  success: { main: '#16a34a' },
  warning: { main: '#d97706' },
  error: { main: '#dc2626' },
  info: { main: '#0ea5e9' },
};

export type Mode = 'light' | 'dark';

const STORAGE_THEME_KEY = 'theme-mode';

const themeCache: Partial<Record<Mode, Theme>> = {};

const createShadowScale = (base: string[], fill: string): Shadows => {
  const result = base.slice(0, 25);
  while (result.length < 25) {
    result.push(fill);
  }
  return result as Shadows;
};

export const getDesignTokens = (mode: Mode = 'light'): ThemeOptions => ({
  palette: {
    mode,
    ...brand,
    background: {
      default: mode === 'light' ? '#F8FAFC' : '#0B1220',
      paper: mode === 'light' ? '#FFFFFF' : '#0F172A',
    },
    text: {
      primary: mode === 'light' ? '#0F172A' : '#E2E8F0',
      secondary: mode === 'light' ? '#475569' : '#94A3B8',
    },
    divider: mode === 'light' ? '#E2E8F0' : '#1F2937',
  },

  shape: { borderRadius: 2 },

  typography: {
    fontFamily: [
      'Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto',
      'Helvetica', 'Arial', 'Apple Color Emoji', 'Segoe UI Emoji',
    ].join(','),
    h1: { fontWeight: 700, letterSpacing: -0.5 },
    h2: { fontWeight: 700, letterSpacing: -0.25 },
    h3: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },

  // ringkas: bayangan custom per mode
  shadows:
    mode === 'light'
      ? createShadowScale(
        [
          'none',
          '0 1px 2px rgba(0,0,0,0.05)',
          '0 2px 6px rgba(0,0,0,0.06)',
          '0 8px 24px rgba(2,6,23,0.08)',
        ],
        '0 10px 30px rgba(2,6,23,0.08)',
      )
      : createShadowScale(
        [
          'none',
          '0 1px 2px rgba(0,0,0,0.4)',
          '0 2px 6px rgba(0,0,0,0.45)',
          '0 8px 24px rgba(0,0,0,0.5)',
        ],
        '0 10px 30px rgba(0,0,0,0.5)',
      ),

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        size: "medium",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 2,
          paddingInline: theme.spacing(2.25),
          transition: 'transform 120ms ease, box-shadow 120ms ease',
          '&:hover': { transform: 'translateY(-1px)' },
        }),
        containedPrimary: { color: '#fff' },
      },
      variants: [
        // Soft primary
        {
          props: { variant: 'soft', color: 'primary' },

          style: ({ theme }) => ({
            background: theme.palette.primary.main + '22',
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}33`,
            '&:hover': {
              background: theme.palette.primary.main + '33',
              borderColor: theme.palette.primary.main + '66',
            },
          }),
        },
        // Soft secondary
        {
          props: { variant: 'soft', color: 'secondary' },

          style: ({ theme }) => ({
            background: theme.palette.secondary.main + '22',
            color: theme.palette.secondary.main,
            border: `1px solid ${theme.palette.secondary.main}33`,
            '&:hover': {
              background: theme.palette.secondary.main + '33',
              borderColor: theme.palette.secondary.main + '66',
            },
          }),
        },
      ],
    },

    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          // borderRadius: theme.shape.borderRadius + 2,
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.text.secondary,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
          },
        }),
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          fontWeight: 600,
          '&:hover': { textDecoration: 'underline' },
        },
      },
    },
  },
});


export function getThemeMode(): Mode {
  if (typeof window === 'undefined') return 'light'

  const saved = localStorage.getItem(STORAGE_THEME_KEY)

  if (saved === 'light' || saved === 'dark') {
    return saved
  }

  return 'light'
};

export function applyThemeMode(mode: Mode) {
  const root = document.documentElement

  if (mode === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }

  localStorage.setItem(STORAGE_THEME_KEY, mode)
};

export const makeTheme = (mode: Mode = 'light'): Theme => {
  const normalizedMode: Mode = mode === 'dark' ? 'dark' : 'light';
  if (!themeCache[normalizedMode]) {
    // TODO: error parameter (type tidak sesuai)
    themeCache[normalizedMode] = responsiveFontSizes(createTheme(getDesignTokens(normalizedMode)));
  };
  return themeCache[normalizedMode]!;
};

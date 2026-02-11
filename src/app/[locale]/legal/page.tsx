'use client';

import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Stack,
    Divider,
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import CookieIcon from '@mui/icons-material/Cookie';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CopyrightIcon from '@mui/icons-material/Copyright';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ReplayIcon from '@mui/icons-material/Replay';
import { SmartLink } from '@/components/link';

type LegalItem = {
    path: string;
    title: string;
    description: string;
    icon: React.ReactNode;
};

const legalItems: LegalItem[] = [
    {
        path: "/[locale]/legal/privacy-policy",
        title: 'Privacy Policy',
        description:
            'Menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi pengguna.',
        icon: <PrivacyTipIcon fontSize="large" />,
    },
    {
        path: "/[locale]/legal/terms-conditions",
        title: 'Terms & Conditions',
        description:
            'Mengatur hak, kewajiban, serta aturan penggunaan layanan dan website kami.',
        icon: <GavelIcon fontSize="large" />,
    },
    {
        path: "/[locale]/legal/cookie-policy",
        title: 'Cookie Policy',
        description:
            'Informasi mengenai penggunaan cookie dan teknologi pelacakan lainnya.',
        icon: <CookieIcon fontSize="large" />,
    },
    {
        path: "/[locale]/legal/disclaimer",
        title: 'Disclaimer',
        description:
            'Batasan tanggung jawab atas informasi dan layanan yang disediakan.',
        icon: <WarningAmberIcon fontSize="large" />,
    },
    {
        path: "/[locale]/legal/copyright",
        title: 'Copyright Notice',
        description:
            'Ketentuan hak cipta dan kepemilikan kekayaan intelektual.',
        icon: <CopyrightIcon fontSize="large" />,
    },
    {
        path: "/[locale]/legal/legal-contact-information",
        title: 'Contact & Legal Inquiries',
        description:
            'Informasi kontak resmi untuk pertanyaan hukum dan privasi.',
        icon: <ContactMailIcon fontSize="large" />,
    },
    {
        path: "/[locale]/legal/refund",
        title: 'Refund & Return Policy',
        description:
            'Ketentuan pengembalian dana dan pembatalan layanan.',
        icon: <ReplayIcon fontSize="large" />,
    },
];

export default function Legal() {
    return (
        <Box sx={{ bgcolor: 'background.default', py: 10 }}>
            <Container maxWidth="lg">
                <Stack spacing={2} mb={6}>
                    <Typography variant="h3" fontWeight={600}>
                        Legal Center
                    </Typography>
                    <Typography color="text.secondary" maxWidth={720}>
                        Transparansi dan kepatuhan hukum adalah bagian dari komitmen kami
                        terhadap kepercayaan pengguna dan mitra bisnis.
                    </Typography>
                </Stack>

                <Divider sx={{ mb: 6 }} />

                <Grid container spacing={4}>
                    {legalItems.map((item, i) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                            <SmartLink href={{ pathname: item.path }}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        height: '100%',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            boxShadow: 3,
                                            transform: 'translateY(-4px)',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Stack spacing={2}>
                                            <Box color="primary.main">{item.icon}</Box>
                                            <Typography variant="h6" fontWeight={600}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.description}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </SmartLink>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

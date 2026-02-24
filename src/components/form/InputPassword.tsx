"use client";

import {
    forwardRef,
    useImperativeHandle,
    ChangeEvent,
    FocusEvent,
    useState,
    Fragment
} from "react";
import {
    FormControl,
    TextField,
    TextFieldProps,
    InputAdornment,
    IconButton,
    Alert
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

/**
 * Custom type untuk onChange handler
 * @param event Event input
 * @param valid Boolean, true jika password valid
 */
type ChangeEventHandler<T = Element> = (event: ChangeEvent<T>, valid: boolean) => void;

/**
 * Custom type untuk onBlur handler
 * @param event Event input
 * @param valid Boolean, true jika password valid
 */
type FocusEventHandler<T = Element> = (event: FocusEvent<T, Element>, valid: boolean) => void;

/**
 * Props untuk InputPassword
 * Extend TextFieldProps dari MUI tapi override onChange & onBlur
 */
export interface InputPasswordProps extends Omit<TextFieldProps, "onChange" | "onBlur"> {
    /** Minimal panjang password untuk validasi */
    minLength?: number;

    /**
     * Menonaktifkan tampilan alert error di bawah input.
     * true: Alert error tidak akan ditampilkan
     * false / undefined: Alert error ditampilkan
     * Default: false
     */
    disableAlert?: boolean;

    /** Callback onChange, memberi info validitas */
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    /** Callback onBlur, memberi info validitas */
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

/** Ref interface, expose method untuk ambil error */
export interface InputPasswordRef {
    getErrors(): Form["errors"];
}

/** Interface state form, menyimpan array error */
interface Form {
    errors: string[];
}

/** Inisialisasi form state */
const initialForm: Form = {
    errors: [],
};

/**
 * Komponen InputPassword
 * Menangani:
 * - onChange & onBlur
 * - Validasi password minimal panjang
 * - Show/Hide password
 * - Alert error
 */
const InputPassword = forwardRef<InputPasswordRef, InputPasswordProps>(({
    fullWidth,
    minLength = 8, // default panjang minimal password
    onChange,
    onBlur,
    ...props
}, ref) => {

    /** State error form */
    const [form, setForm] = useState<Form>(initialForm);

    /** State value input */
    const [value, setValue] = useState<string>("");

    /** State show/hide password */
    const [showPassword, setShowPassword] = useState<boolean>(false);

    /** Expose method getErrors lewat ref */
    useImperativeHandle(ref, () => ({
        getErrors: () => form.errors
    }), [form]);

    /**
     * Fungsi validasi password
     * @param password string input password
     * @returns object { valid: boolean, error: string }
     */
    const validatePassword = (password: string) => {
        if (!password) {
            return { valid: false, error: "Password tidak boleh kosong" };
        }

        if (password.length < minLength) {
            return { valid: false, error: `Password minimal ${minLength} karakter` };
        }

        return { valid: true, error: "" };
    };

    /**
     * Handler onChange
     * - Update state value
     * - Validasi password
     * - Set error state
     * - Panggil callback eksternal onChange
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value;
        setValue(val);

        const { valid, error } = validatePassword(val);
        // setForm({ errors: valid ? [] : [error] });

        onChange?.(event, valid);
    };

    /**
     * Handler onBlur
     * - Validasi saat fokus keluar
     * - Set error state
     * - Panggil callback eksternal onBlur
     */
    const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { valid, error } = validatePassword(value);
        setForm({ errors: valid ? [] : [error] });

        onBlur?.(event, valid);
    };

    /** Toggle show/hide password */
    const toggleShowPassword = () => setShowPassword(prev => !prev);

    return (
        <FormControl fullWidth={fullWidth}>
            {/* Tampilkan Alert jika ada error dan disableAlert false */}
            {!props.disableAlert && form.errors.length > 0 && (
                <Alert severity="error" sx={{ mb: 1 }}>
                    {form.errors.join(", ")}
                </Alert>
            )}

            {/* TextField utama */}
            <TextField
                {...props}
                type={showPassword ? "text" : "password"} // show/hide password
                value={value}           // value controlled
                onChange={handleChange} // handler onChange
                onBlur={handleBlur}     // handler onBlur
                error={form.errors.length > 0}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockOutlinedIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={toggleShowPassword}
                                edge="end"
                                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </FormControl>
    );
});

InputPassword.displayName = "InputPassword";

export { InputPassword };
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
    Alert
} from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

/**
 * Custom type untuk onChange handler
 * @param event Event bawaan dari input
 * @param valid Boolean, true jika email valid
 */
type ChangeEventHandler<T = Element> = (event: ChangeEvent<T>, valid: boolean) => void;

/**
 * Custom type untuk onBlur handler
 * @param event Event bawaan dari input
 * @param valid Boolean, true jika email valid
 */
type FocusEventHandler<T = Element> = (event: FocusEvent<T, Element>, valid: boolean) => void;

/**
 * Props untuk InputEmail
 * extend TextFieldProps dari MUI tapi override onChange & onBlur
 */
export interface InputEmailProps extends Omit<TextFieldProps, "onChange" | "onBlur"> {
    /**
     * Mode validasi email.
     * - "none": tidak melakukan validasi
     * - "soft": validasi sederhana (regex dasar)
     * - "strict": validasi ketat (regex lebih konservatif)
     * Default: "soft"
     */
    validateMode?: "none" | "soft" | "strict";

    /**
     * Menonaktifkan tampilan alert error di bawah input.
     * 
     * - true: Alert error tidak akan ditampilkan walaupun email tidak valid.
     * - false / undefined: Alert error ditampilkan secara normal saat validasi gagal.
     * 
     * Default: false (alert ditampilkan).
     */
    disableAlert?: boolean;

    /** Callback onChange, memberi info validitas */
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    /** Callback onBlur, memberi info validitas */
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

/** Ref interface kosong (bisa dikembangkan nanti) */
export interface InputEmailRef { 
    getErrors(): Form["errors"];
}

/** Regex email sederhana, cocok untuk validasi dasar */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/*
^               -> Awal string
[^\s@]+         -> 1+ karakter selain spasi dan '@' (username)
@               -> Harus ada '@'
[^\s@]+         -> 1+ karakter selain spasi dan '@' (domain)
\.              -> Titik sebelum TLD
[^\s@]{2,}      -> Minimal 2 karakter untuk TLD
$               -> Akhir string
*/

/** Regex email ketat, menolak karakter aneh di username/domain */
const emailRegexStrict = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
/*
^                   -> Awal string
[a-zA-Z0-9._%+-]+   -> Username hanya huruf, angka, titik, underscore, persen, plus, minus
@                   -> '@' wajib ada
[a-zA-Z0-9.-]+      -> Domain hanya huruf, angka, titik atau strip
\.                  -> Titik sebelum TLD
[a-zA-Z]{2,}        -> TLD minimal 2 huruf
$                   -> Akhir string
*/

/** Interface untuk form state, menampung array error */
interface Form {
    errors: string[];
}

/** Inisialisasi form state */
const initialForm: Form = {
    errors: [],
};

/**
 * Komponen InputEmail
 * Menangani:
 * - onChange & onBlur
 * - validasi email sesuai validateMode
 * - menampilkan alert error
 */
const InputEmail = forwardRef<InputEmailRef, InputEmailProps>(({
    fullWidth,
    onChange,
    onBlur,
    validateMode = "soft", // default mode validasi
    ...props
}, ref) => {

    /** State error form */
    const [form, setForm] = useState<Form>(initialForm);

    /** State value input */
    const [value, setValue] = useState<string>("");

    /** Ref handler kosong (bisa ditambah method expose) */
    useImperativeHandle(ref, () => ({
        getErrors: () => (form.errors),
    }), [form]);

    /**
     * Fungsi validasi email
     * @param email string input email
     * @returns object { valid: boolean, error: string }
     */
    const validateEmail = (email: string) => {
        if (!email) {
            return { valid: false, error: "Email tidak boleh kosong" };
        }

        if (validateMode === "soft") {
            if (!emailRegex.test(email)) {
                return { valid: false, error: "Email tidak valid (format dasar)" };
            }
        } else if (validateMode === "strict") {
            if (!emailRegexStrict.test(email)) {
                return { valid: false, error: "Email tidak valid (format ketat)" };
            }
        }

        // Mode "none" melewati validasi
        return { valid: true, error: "" };
    };

    /**
     * Handler onChange
     * - Update state value
     * - Validasi email
     * - Set error state
     * - Panggil callback eksternal onChange
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value;
        setValue(val);

        const { valid, error } = validateEmail(val);
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
        const { valid, error } = validateEmail(value);
        setForm({ errors: valid ? [] : [error] });

        onBlur?.(event, valid);
    };

    return (
        <FormControl fullWidth={fullWidth}>
            {/* Tampilkan Alert jika ada error */}
            {
                !props.disableAlert ?
                <Fragment>
                    {form.errors.length > 0 && (
                        <Alert severity="error" sx={{ mb: 1 }}>
                            {form.errors.join(", ")}
                        </Alert>
                    )}
                </Fragment> : null
            }
            {/* TextField utama */}
            <TextField
                {...props}
                value={value}           // value controlled
                onChange={handleChange} // handler onChange
                onBlur={handleBlur}     // handler onBlur
                error={form.errors.length > 0}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailOutlinedIcon />
                            </InputAdornment>
                        ),
                    }
                }}
            />
        </FormControl>
    );
});

InputEmail.displayName = "InputEmail";

export { InputEmail };
"use client";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectProps } from '@mui/material/Select';
import Typography from "@mui/material/Typography";


export interface PhoneCode {
    code: string;
    country: string;
    iso: string;
    flag: string;
}

export const PHONE_CODES: PhoneCode[] = [
    { code: "+93", country: "Afghanistan", iso: "AF", flag: "🇦🇫" },
    { code: "+355", country: "Albania", iso: "AL", flag: "🇦🇱" },
    { code: "+213", country: "Algeria", iso: "DZ", flag: "🇩🇿" },
    { code: "+1", country: "United States", iso: "US", flag: "🇺🇸" },
    { code: "+376", country: "Andorra", iso: "AD", flag: "🇦🇩" },
    { code: "+244", country: "Angola", iso: "AO", flag: "🇦🇴" },
    { code: "+54", country: "Argentina", iso: "AR", flag: "🇦🇷" },
    { code: "+374", country: "Armenia", iso: "AM", flag: "🇦🇲" },
    { code: "+61", country: "Australia", iso: "AU", flag: "🇦🇺" },
    { code: "+43", country: "Austria", iso: "AT", flag: "🇦🇹" },
    { code: "+994", country: "Azerbaijan", iso: "AZ", flag: "🇦🇿" },

    { code: "+973", country: "Bahrain", iso: "BH", flag: "🇧🇭" },
    { code: "+880", country: "Bangladesh", iso: "BD", flag: "🇧🇩" },
    { code: "+375", country: "Belarus", iso: "BY", flag: "🇧🇾" },
    { code: "+32", country: "Belgium", iso: "BE", flag: "🇧🇪" },
    { code: "+501", country: "Belize", iso: "BZ", flag: "🇧🇿" },
    { code: "+229", country: "Benin", iso: "BJ", flag: "🇧🇯" },
    { code: "+975", country: "Bhutan", iso: "BT", flag: "🇧🇹" },
    { code: "+591", country: "Bolivia", iso: "BO", flag: "🇧🇴" },
    { code: "+387", country: "Bosnia and Herzegovina", iso: "BA", flag: "🇧🇦" },
    { code: "+267", country: "Botswana", iso: "BW", flag: "🇧🇼" },
    { code: "+55", country: "Brazil", iso: "BR", flag: "🇧🇷" },
    { code: "+359", country: "Bulgaria", iso: "BG", flag: "🇧🇬" },

    { code: "+855", country: "Cambodia", iso: "KH", flag: "🇰🇭" },
    { code: "+237", country: "Cameroon", iso: "CM", flag: "🇨🇲" },
    { code: "+1", country: "Canada", iso: "CA", flag: "🇨🇦" },
    { code: "+56", country: "Chile", iso: "CL", flag: "🇨🇱" },
    { code: "+86", country: "China", iso: "CN", flag: "🇨🇳" },
    { code: "+57", country: "Colombia", iso: "CO", flag: "🇨🇴" },
    { code: "+506", country: "Costa Rica", iso: "CR", flag: "🇨🇷" },
    { code: "+385", country: "Croatia", iso: "HR", flag: "🇭🇷" },
    { code: "+53", country: "Cuba", iso: "CU", flag: "🇨🇺" },
    { code: "+357", country: "Cyprus", iso: "CY", flag: "🇨🇾" },
    { code: "+420", country: "Czech Republic", iso: "CZ", flag: "🇨🇿" },

    { code: "+45", country: "Denmark", iso: "DK", flag: "🇩🇰" },
    { code: "+253", country: "Djibouti", iso: "DJ", flag: "🇩🇯" },
    { code: "+20", country: "Egypt", iso: "EG", flag: "🇪🇬" },
    { code: "+503", country: "El Salvador", iso: "SV", flag: "🇸🇻" },
    { code: "+372", country: "Estonia", iso: "EE", flag: "🇪🇪" },
    { code: "+251", country: "Ethiopia", iso: "ET", flag: "🇪🇹" },

    { code: "+358", country: "Finland", iso: "FI", flag: "🇫🇮" },
    { code: "+33", country: "France", iso: "FR", flag: "🇫🇷" },

    { code: "+49", country: "Germany", iso: "DE", flag: "🇩🇪" },
    { code: "+30", country: "Greece", iso: "GR", flag: "🇬🇷" },

    { code: "+852", country: "Hong Kong", iso: "HK", flag: "🇭🇰" },
    { code: "+36", country: "Hungary", iso: "HU", flag: "🇭🇺" },

    { code: "+91", country: "India", iso: "IN", flag: "🇮🇳" },
    { code: "+62", country: "Indonesia", iso: "ID", flag: "🇮🇩" },
    { code: "+98", country: "Iran", iso: "IR", flag: "🇮🇷" },
    { code: "+964", country: "Iraq", iso: "IQ", flag: "🇮🇶" },
    { code: "+353", country: "Ireland", iso: "IE", flag: "🇮🇪" },
    { code: "+972", country: "Israel", iso: "IL", flag: "🇮🇱" },
    { code: "+39", country: "Italy", iso: "IT", flag: "🇮🇹" },

    { code: "+81", country: "Japan", iso: "JP", flag: "🇯🇵" },
    { code: "+962", country: "Jordan", iso: "JO", flag: "🇯🇴" },

    { code: "+82", country: "South Korea", iso: "KR", flag: "🇰🇷" },
    { code: "+965", country: "Kuwait", iso: "KW", flag: "🇰🇼" },

    { code: "+856", country: "Laos", iso: "LA", flag: "🇱🇦" },
    { code: "+371", country: "Latvia", iso: "LV", flag: "🇱🇻" },
    { code: "+370", country: "Lithuania", iso: "LT", flag: "🇱🇹" },

    { code: "+60", country: "Malaysia", iso: "MY", flag: "🇲🇾" },
    { code: "+52", country: "Mexico", iso: "MX", flag: "🇲🇽" },
    { code: "+212", country: "Morocco", iso: "MA", flag: "🇲🇦" },

    { code: "+31", country: "Netherlands", iso: "NL", flag: "🇳🇱" },
    { code: "+64", country: "New Zealand", iso: "NZ", flag: "🇳🇿" },
    { code: "+234", country: "Nigeria", iso: "NG", flag: "🇳🇬" },
    { code: "+47", country: "Norway", iso: "NO", flag: "🇳🇴" },

    { code: "+92", country: "Pakistan", iso: "PK", flag: "🇵🇰" },
    { code: "+63", country: "Philippines", iso: "PH", flag: "🇵🇭" },
    { code: "+48", country: "Poland", iso: "PL", flag: "🇵🇱" },
    { code: "+351", country: "Portugal", iso: "PT", flag: "🇵🇹" },

    { code: "+7", country: "Russia", iso: "RU", flag: "🇷🇺" },
    { code: "+966", country: "Saudi Arabia", iso: "SA", flag: "🇸🇦" },
    { code: "+65", country: "Singapore", iso: "SG", flag: "🇸🇬" },
    { code: "+27", country: "South Africa", iso: "ZA", flag: "🇿🇦" },
    { code: "+34", country: "Spain", iso: "ES", flag: "🇪🇸" },
    { code: "+94", country: "Sri Lanka", iso: "LK", flag: "🇱🇰" },
    { code: "+46", country: "Sweden", iso: "SE", flag: "🇸🇪" },
    { code: "+41", country: "Switzerland", iso: "CH", flag: "🇨🇭" },

    { code: "+66", country: "Thailand", iso: "TH", flag: "🇹🇭" },
    { code: "+90", country: "Turkey", iso: "TR", flag: "🇹🇷" },

    { code: "+971", country: "United Arab Emirates", iso: "AE", flag: "🇦🇪" },
    { code: "+44", country: "United Kingdom", iso: "GB", flag: "🇬🇧" },

    { code: "+58", country: "Venezuela", iso: "VE", flag: "🇻🇪" },
    { code: "+84", country: "Vietnam", iso: "VN", flag: "🇻🇳" },
];


export interface FormPhoneCodeProps {
    inputTitle?: string;
    inputLabel?: string;
};

function PhoneCodeRow({ item, diableRenderCountry }: { item: PhoneCode, diableRenderCountry?: boolean }) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
            }}
        >
            <Box sx={{ width: 24, textAlign: "center" }}>
                {item.flag}
            </Box>

            <Typography sx={{ width: 48 }}>
                {item.code}
            </Typography>
            {
                !diableRenderCountry &&
                <Typography
                    sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {item.country}
                </Typography>
            }
        </Box>
    );
}

export function FormPhoneCode(props: FormPhoneCodeProps & SelectProps<string>) {
    return (
        <Box>
            <FormControl fullWidth size="small">
                {
                    props.inputTitle && <InputLabel>{props.inputTitle}</InputLabel>
                }
                <Select
                    {...props}
                    label={props.inputLabel}
                    renderValue={(value) => {
                        const item = PHONE_CODES.find(p => p.code === value);
                        return item ? (
                            <PhoneCodeRow item={item} diableRenderCountry/>
                        ) : (
                            <PhoneCodeRow
                                item={{
                                    code: "+62",
                                    country: "Indonesia",
                                    iso: "ID",
                                    flag: "🇮🇩",
                                }}
                                
                            />
                        );
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                maxHeight: 300,      // ← tinggi maksimal dropdown
                                overflowY: "auto",   // ← scroll saat meluap
                            },
                        },
                    }}
                >
                    {PHONE_CODES.map((item) => (
                        <MenuItem key={Math.random()} value={item.code}>
                            <PhoneCodeRow item={item} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
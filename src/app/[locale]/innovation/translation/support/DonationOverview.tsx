import {
    Paper,
    Typography,
    Stack,
    Box,
    Divider,
    Button,
    Avatar,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Donation {
    name: string;
    amount: number;
}

interface DonationSummary {
    totalCollected: number;
    totalUsed: number;
}

const donations: Donation[] = [
    { name: "Andi Pratama", amount: 500_000 },
    { name: "Siti Rahma", amount: 300_000 },
    { name: "Budi Santoso", amount: 250_000 },
];

const summary: DonationSummary = {
    totalCollected: 1_200_000,
    totalUsed: 700_000,
};

const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

export const DonationOverview: React.FC = () => {
    const readyToAllocate =
        summary.totalCollected - summary.totalUsed;

    return (
        <Paper sx={{ p: 4, borderRadius: 3 }}>
            {/* HEADER SUMMARY */}
            <Stack spacing={3}>
                <Typography variant="h6" fontWeight={600}>
                    Ringkasan Dana
                </Typography>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                >
                    <SummaryItem
                        label="Dana Terkumpul"
                        value={summary.totalCollected}
                    />
                    <SummaryItem
                        label="Dana Digunakan"
                        value={summary.totalUsed}
                    />
                    <SummaryItem
                        label="Siap Dialokasikan"
                        value={readyToAllocate}
                        highlight
                    />
                </Stack>

                {/* NAVIGASI TRANSPARANSI */}
                <Box>
                    <Button
                        endIcon={<ArrowForwardIcon />}
                        sx={{ textTransform: "none", px: 0 }}
                    >
                        Lihat alokasi penggunaan dana
                    </Button>
                </Box>

                <Divider />

                {/* TOP DONATION */}
                <Typography variant="h6" fontWeight={600}>
                    Top Donation
                </Typography>

                <Stack spacing={2}>
                    {donations.map((donor, index) => (
                        <Stack
                            key={`${donor.name}-${index}`}
                            direction="row"
                            spacing={2}
                            alignItems="center"
                        >
                            <Avatar sx={{ bgcolor: "primary.main" }}>
                                {donor.name.charAt(0)}
                            </Avatar>

                            <Box sx={{ flexGrow: 1 }}>
                                <Typography fontWeight={500}>
                                    {donor.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ opacity: 0.7 }}
                                >
                                    {formatCurrency(donor.amount)}
                                </Typography>
                            </Box>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Paper>
    );
};

/* ---------- Sub Component ---------- */

interface SummaryItemProps {
    label: string;
    value: number;
    highlight?: boolean;
}

const SummaryItem: React.FC<SummaryItemProps> = ({
    label,
    value,
    highlight = false,
}) => {
    return (
        <Box
            sx={{
                flex: 1,
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: highlight ? "action.hover" : "transparent",
            }}
        >
            <Typography
                variant="body2"
                sx={{ opacity: 0.7 }}
            >
                {label}
            </Typography>
            <Typography
                variant="h6"
                fontWeight={600}
            >
                {formatCurrency(value)}
            </Typography>
        </Box>
    );
};

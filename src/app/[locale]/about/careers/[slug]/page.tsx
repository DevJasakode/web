"use client";

import { useParams } from "next/navigation";
import {
    Box,
    Typography,
    Chip,
    Stack,
    Divider,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

/**
 * Dummy data karier
 */
const dummyCareers = [
    {
        id: 1,
        slug: "frontend-engineer",
        title: "Frontend Engineer",
        department: "Engineering",
        location: "Remote",
        employmentType: "full-time",
        workMode: "remote",
        description:
            "Sebagai Frontend Engineer, kamu akan bertanggung jawab membangun antarmuka modern yang cepat, aksesibel, dan menyenangkan digunakan.",
        responsibilities: [
            "Mengembangkan UI menggunakan React dan TypeScript",
            "Bekerja sama dengan tim desain dan backend",
            "Menjaga kualitas kode dan performa aplikasi",
        ],
        requirements: [
            "Pengalaman dengan React",
            "Memahami HTML, CSS, dan JavaScript modern",
            "Terbiasa bekerja dengan Git",
        ],
    },
    {
        id: 2,
        slug: "ui-ux-designer",
        title: "UI/UX Designer",
        department: "Product",
        location: "Jakarta",
        employmentType: "contract",
        workMode: "onsite",
        description:
            "Peran ini fokus pada perancangan pengalaman pengguna yang intuitif dan estetis untuk produk digital kami.",
        responsibilities: [
            "Membuat wireframe dan prototype",
            "Melakukan user research dan usability testing",
            "Berkolaborasi dengan product manager dan engineer",
        ],
        requirements: [
            "Pengalaman sebagai UI/UX Designer",
            "Menguasai Figma atau tools sejenis",
            "Memahami prinsip desain berbasis user",
        ],
    },
] as const;

export default function CareersDetail() {
    const params = useParams<{ slug: string }>();

    const career = dummyCareers.find(
        (item) => item.slug === params.slug
    );

    if (!career) {
        return (
            <Box
                maxWidth="md"
                sx={{
                    margin: "0 auto",
                    p: 4,
                    textAlign: "center",
                }}
            >
                <WorkOutlineIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                    Lowongan tidak ditemukan
                </Typography>
                <Typography color="text.secondary">
                    Posisi yang kamu cari tidak tersedia atau sudah ditutup.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            maxWidth="lg"
            sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 auto",
                p: 3,
                minHeight: "100svh",
            }}
        >
            {/* Header */}
            <Stack spacing={1} mb={3}>
                <Typography variant="h4" fontWeight={700}>
                    {career.title}
                </Typography>
                <Typography color="text.secondary">
                    {career.department}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <LocationOnOutlinedIcon fontSize="small" />
                    <Typography variant="body2">{career.location}</Typography>
                    <Chip label={career.employmentType} size="small" />
                    <Chip label={career.workMode} size="small" variant="outlined" />
                </Stack>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            {/* Deskripsi */}
            <Box mb={4}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Deskripsi Pekerjaan
                </Typography>
                <Typography color="text.secondary">
                    {career.description}
                </Typography>
            </Box>

            {/* Tanggung jawab */}
            <Box mb={4}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Tanggung Jawab
                </Typography>
                <Stack spacing={1}>
                    {career.responsibilities.map((item, index) => (
                        <Typography key={index} color="text.secondary">
                            • {item}
                        </Typography>
                    ))}
                </Stack>
            </Box>

            {/* Kualifikasi */}
            <Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Kualifikasi
                </Typography>
                <Stack spacing={1}>
                    {career.requirements.map((item, index) => (
                        <Typography key={index} color="text.secondary">
                            • {item}
                        </Typography>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}

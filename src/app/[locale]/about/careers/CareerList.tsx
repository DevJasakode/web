'use client';

import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Button,
    Grid,
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

/**
 * Tipe data lowongan
 */
type Job = {
    id: number;
    title: string;
    department: string;
    location: string;
    type: 'Full Time' | 'Part Time' | 'Contract' | 'Internship';
    description: string;
};

/**
 * Data dummy lowongan
 * Kosongkan array ini untuk melihat empty state
 */
const dummyJobs: Job[] = [
    {
        id: 1,
        title: 'Frontend Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full Time',
        description:
            'Mengembangkan antarmuka modern menggunakan React dan TypeScript.',
    },
    {
        id: 2,
        title: 'UI/UX Designer',
        department: 'Product',
        location: 'Jakarta',
        type: 'Contract',
        description:
            'Merancang pengalaman pengguna yang intuitif dan estetis.',
    },
    {
        id: 3,
        title: 'Backend Engineer',
        department: 'Engineering',
        location: 'Bandung',
        type: 'Full Time',
        description:
            'Membangun API yang andal dan scalable dengan fokus pada performa.',
    },
];

export function CareerList() {
    const jobs = dummyJobs; // nanti bisa diganti dari API

    if (jobs.length === 0) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                py={10}
                textAlign="center"
            >
                <WorkOutlineIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                    Belum ada lowongan tersedia
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Saat ini kami belum membuka posisi baru. Silakan cek kembali nanti.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Karier & Lowongan
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
                Bergabunglah dengan tim kami dan bangun sesuatu yang bermakna.
            </Typography>

            <Grid container spacing={3}>
                {jobs.map((job) => (
                    <Grid size={{ xs: 12, md: 6 }} key={job.id}>
                        <Card
                            sx={{
                                height: '100%',
                                transition: '0.3s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardContent>
                                <Stack spacing={2}>
                                    <Box>
                                        <Typography variant="h6" fontWeight={600}>
                                            {job.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {job.department}
                                        </Typography>
                                    </Box>

                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <LocationOnOutlinedIcon fontSize="small" />
                                        <Typography variant="body2">
                                            {job.location}
                                        </Typography>
                                        <Chip
                                            label={job.type}
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                        />
                                    </Stack>

                                    <Typography variant="body2" color="text.secondary">
                                        {job.description}
                                    </Typography>

                                    <Box>
                                        <Button variant="contained">
                                            Lihat Detail
                                        </Button>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

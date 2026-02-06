import { Box, Container, Typography, Stack, Chip } from '@mui/material'

interface HeroSectionProps {
  tags: string[]
}

export default function HeroSection({ tags }: HeroSectionProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{ pt: { xs: 6, md: 14 }, mb: { xs: 6, md: 10 } }}
    >
      <Box textAlign="center">
        <Typography variant="h3" fontWeight={800}>
          Driving{' '}
          <Box component="span" color="primary.main">
            Innovation
          </Box>
          : Technology, Business, and Growth
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: 'text.secondary',
            maxWidth: 720,
            mx: 'auto',
          }}
        >
          Readable, evidence-based insights on modern challenges. Explore curated
          solutions in software, management, and digital transformation.
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          flexWrap="wrap"
          sx={{ mt: 4 }}
        >
          {tags.map((tag) => (
            <Chip key={tag} label={tag} variant="outlined" clickable />
          ))}
          <Chip label="+ More" clickable color="primary" />
        </Stack>
      </Box>
    </Container>
  )
}

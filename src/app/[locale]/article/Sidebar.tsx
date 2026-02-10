import {
  Card,
  Typography,
  Stack,
  Avatar,
  Button,
  TextField,
  Grid,
} from '@mui/material'

export default function Sidebar() {
  return (
    <Stack spacing={3} direction={"row"} width={"100%"}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* Author */}
          <Card sx={{ p: 3 }}>
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>E</Avatar>
              <div>
                <Typography fontWeight={600}>Ethan Caldwell</Typography>
                <Typography variant="caption" color="text.secondary">
                  Writer • Designer • Product
                </Typography>
              </div>
            </Stack>

            <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
              Writing thoughtful essays about work, care, and creative technology.
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button size="small" variant="outlined">
                Follow
              </Button>
              <Button size="small" variant="outlined">
                Contact
              </Button>
            </Stack>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* Newsletter */}
          <Card sx={{ p: 3, minHeight: "100%" }}>
            <Typography fontWeight={600}>Subscribe</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Get fresh essays in your inbox.
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <TextField size="small" placeholder="you@email.com" fullWidth />
              <Button variant="contained">Join</Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}

import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={3} sx={{ minHeight: '70vh' }}>
      <Typography variant="h1" fontWeight={900}>404</Typography>
      <Typography color="text.secondary">This page could not be found.</Typography>
      <Button component={Link} to="/" variant="contained">Back home</Button>
    </Stack>
  );
}

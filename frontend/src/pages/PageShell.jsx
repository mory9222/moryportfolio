import { Box, Container, Typography } from '@mui/material';

const INK = '#1A1A2E';
const MUTED = '#5A5A72';

export default function PageShell({ eyebrow, title, description, children }) {
  return (
    <Box sx={{
      minHeight: '75vh',
      py: { xs: 9, md: 14 },
      bgcolor: '#FFFFFF',   // fond blanc explicite
      backgroundImage:
        'radial-gradient(ellipse at 80% 10%, rgba(108,92,231,.10), transparent 42%)',
    }}>
      <Container maxWidth="lg">
        <Typography sx={{
          color: '#6C5CE7',   // violet lisible sur blanc
          letterSpacing: 2,
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
        }}>
          {eyebrow}
        </Typography>

        <Typography component="h1" sx={{
          mt: 2,
          fontSize: { xs: 44, md: 68 },
          fontWeight: 800,
          letterSpacing: '-3px',
          lineHeight: 1.08,
          color: INK,          // ← texte foncé (c'était invisible)
        }}>
          {title}
        </Typography>

        {description && (
          <Typography sx={{
            mt: 3,
            maxWidth: 700,
            color: MUTED,      // ← gris foncé lisible (avant: #9299AE clair)
            fontSize: 17,
            lineHeight: 1.9,
          }}>
            {description}
          </Typography>
        )}

        <Box sx={{ mt: 7 }}>{children}</Box>
      </Container>
    </Box>
  );
}
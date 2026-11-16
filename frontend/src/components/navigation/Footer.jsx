import { useRef, useEffect } from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'motion/react';
import profile from '../../config/profile';

/* ═════════════════════════ PALETTE ═════════════════════════ */
const C = {
  cream: '#FAF7F2',
  paper: '#FFFFFF',
  ink: '#0B0B0F',
  ink2: '#2A2A33',
  muted: '#7A7A85',
  tomato: '#F0503A',
  tomatoSoft: '#FFE5E0',
  lime: '#C4E538',
  limeSoft: '#F0FAD0',
  cobalt: '#2D5BFF',
  cobaltSoft: '#E0E7FF',
  mustard: '#FFB627',
  mustardSoft: '#FFF1CC',
  hair: '#E7E1D6',
};

const FONT_DISPLAY = '"Instrument Serif", "Playfair Display", Georgia, serif';
const FONT_SANS = '"Space Grotesk", "Inter", system-ui, sans-serif';
const FONT_MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const monoLabel = {
  fontFamily: FONT_MONO,
  fontSize: 10.5,
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};

const EASE = [0.16, 1, 0.3, 1];

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

/* ═════════════════════════ MAGNETIC ═════════════════════════ */
function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  const reduced = useReducedMotion();

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}

/* ═════════════════════════ FOOTER ═════════════════════════ */
export default function Footer() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (document.getElementById('mory-fonts')) return;
    const l = document.createElement('link');
    l.id = 'mory-fonts';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap';
    document.head.appendChild(l);
  }, []);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  const fadeUp = reduced
    ? {}
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      };

  const stagger = reduced
    ? {}
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
      };

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        mt: { xs: 4, md: 6 },
        bgcolor: C.cream,
        overflow: 'hidden',
        fontFamily: FONT_SANS,
        color: C.ink,
      }}
    >
      {/* ═══ Top rule ═══ */}
      <Box
        sx={{
          height: 3,
          bgcolor: C.ink,
        }}
      />

      {/* ═══ Ambient halos ═══ */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: -160,
          left: '10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.tomatoSoft} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: -160,
          right: '5%',
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.limeSoft} 0%, transparent 70%)`,
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* ═══ Giant outlined "Mory." in background ═══ */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: -80,
          right: '-3%',
          fontFamily: FONT_DISPLAY,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: { xs: 200, md: 340, lg: 460 },
          letterSpacing: '-.06em',
          lineHeight: 0.8,
          color: 'transparent',
          WebkitTextStroke: `1.5px ${C.ink}0F`,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        Mory.
      </Box>

      <Container
        maxWidth="xl"
        sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}
      >
        {/* ════════════ MAIN BLOCK ════════════ */}
        <Box
          component={motion.div}
          variants={stagger}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
          sx={{
            pt: { xs: 7, md: 10 },
            pb: { xs: 5, md: 7 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr 1fr' },
            gap: { xs: 5, md: 6 },
            alignItems: 'start',
          }}
        >
          {/* ═══ BRAND + CTA ═══ */}
          <motion.div variants={fadeUp}>
            <Box>
              {/* Editorial label */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box sx={{ width: 8, height: 8, bgcolor: C.tomato }} />
                <Typography sx={{ ...monoLabel, color: C.ink }}>
                  The portfolio
                </Typography>
              </Box>

              {/* Serif logo */}
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 400,
                    fontSize: { xs: 44, md: 56 },
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: C.ink,
                  }}
                >
                  Mory
                </Typography>
                <Typography
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: { xs: 44, md: 56 },
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: C.tomato,
                  }}
                >
                  .
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontFamily: FONT_SANS,
                  color: C.ink2,
                  fontSize: 14.5,
                  lineHeight: 1.7,
                  maxWidth: 340,
                }}
              >
                Building thoughtful digital experiences, one line of code at a time.
              </Typography>

              <Magnetic>
                <Box
                  component={Link}
                  to="/contact"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.25,
                    mt: 3,
                    px: 2.8,
                    py: 1.4,
                    fontFamily: FONT_SANS,
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: 'none',
                    color: '#fff',
                    bgcolor: C.tomato,
                    border: `2px solid ${C.tomato}`,
                    transition: 'all .2s ease',
                    '&:hover': {
                      bgcolor: C.ink,
                      borderColor: C.ink,
                      transform: 'translate(-2px, -2px)',
                      boxShadow: `4px 4px 0 ${C.ink}`,
                    },
                    '&:focus-visible': { outline: `2px solid ${C.ink}`, outlineOffset: 3 },
                    '& svg': { transition: 'transform .3s ease' },
                    '&:hover svg': { transform: 'translate(3px, -3px)' },
                  }}
                >
                  Let's work together
                  <NorthEastIcon sx={{ fontSize: 16 }} />
                </Box>
              </Magnetic>
            </Box>
          </motion.div>

          {/* ═══ NAVIGATION ═══ */}
          <motion.div variants={fadeUp}>
            <Box>
              <Typography sx={{ ...monoLabel, color: C.muted, mb: 2.5 }}>
                Navigation
              </Typography>
              <Box component="nav" aria-label="Footer navigation">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                  {navLinks.map((link, i) => (
                    <Box
                      key={link.path}
                      component={Link}
                      to={link.path}
                      sx={{
                        position: 'relative',
                        display: 'inline-flex',
                        alignItems: 'baseline',
                        gap: 1.25,
                        width: 'fit-content',
                        py: 0.9,
                        color: C.ink2,
                        fontFamily: FONT_SANS,
                        fontSize: 15,
                        fontWeight: 600,
                        textDecoration: 'none',
                        letterSpacing: '-0.01em',
                        transition: 'color .2s ease, transform .2s ease',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          bottom: 4,
                          height: 2,
                          width: 0,
                          bgcolor: C.tomato,
                          transition: 'width .3s cubic-bezier(.16,1,.3,1)',
                        },
                        '&:hover': {
                          color: C.ink,
                          transform: 'translateX(3px)',
                        },
                        '&:hover::after': { width: '100%' },
                        '&:focus-visible': {
                          outline: `2px solid ${C.tomato}`,
                          outlineOffset: 3,
                        },
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          ...monoLabel,
                          fontSize: 9,
                          color: C.muted,
                          fontFamily: FONT_MONO,
                          fontWeight: 700,
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </Typography>
                      {link.label}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </motion.div>

          {/* ═══ STATUS + BACK TO TOP ═══ */}
          <motion.div variants={fadeUp}>
            <Box>
              <Typography sx={{ ...monoLabel, color: C.muted, mb: 2.5 }}>
                Status
              </Typography>

              {/* Availability badge */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 0.75,
                  bgcolor: C.lime,
                  border: `1.5px solid ${C.ink}`,
                  boxShadow: `3px 3px 0 ${C.ink}`,
                }}
              >
                <Box
                  component={motion.span}
                  animate={
                    reduced
                      ? {}
                      : { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }
                  }
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    bgcolor: C.ink,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: FONT_MONO,
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: C.ink,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Available
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontFamily: FONT_SANS,
                  color: C.ink2,
                  fontSize: 13,
                  mt: 2.5,
                  lineHeight: 1.7,
                }}
              >
                Based in Bamako, Mali
                <br />
                Open to remote
              </Typography>

              {/* Back to top */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  mt: 3,
                }}
              >
                <Typography
                  sx={{
                    ...monoLabel,
                    fontSize: 9.5,
                    color: C.muted,
                  }}
                >
                  Back to top
                </Typography>
                <IconButton
                  component={motion.button}
                  onClick={scrollToTop}
                  whileHover={reduced ? {} : { y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Back to top"
                  sx={{
                    color: C.ink,
                    bgcolor: C.paper,
                    border: `1.5px solid ${C.ink}`,
                    borderRadius: 0,
                    width: 40,
                    height: 40,
                    transition: 'all .2s ease',
                    '&:hover': {
                      bgcolor: C.lime,
                      transform: 'translate(-2px, -2px)',
                      boxShadow: `3px 3px 0 ${C.ink}`,
                    },
                    '&:focus-visible': {
                      outline: `2px solid ${C.tomato}`,
                      outlineOffset: 3,
                    },
                  }}
                >
                  <KeyboardArrowUpRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* ═══ Separator ═══ */}
        <Box sx={{ height: 2, bgcolor: C.ink }} />

        {/* ═══ Copyright ═══ */}
        <Box
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1.5,
          }}
        >
          <Typography
            sx={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              fontWeight: 500,
              color: C.ink2,
              letterSpacing: '0.06em',
            }}
          >
            © {new Date().getFullYear()} {profile.name} — All rights reserved
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 5, height: 5, bgcolor: C.tomato }} />
            <Box sx={{ width: 5, height: 5, bgcolor: C.mustard }} />
            <Box sx={{ width: 5, height: 5, bgcolor: C.lime }} />
            <Box sx={{ width: 5, height: 5, bgcolor: C.cobalt }} />
            <Typography
              sx={{
                ...monoLabel,
                fontSize: 9.5,
                color: C.muted,
                ml: 1,
              }}
            >
              React · MUI · Motion
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
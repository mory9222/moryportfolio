import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValue,
} from 'motion/react';

/* ═════════════════════════ PALETTE — WARM & LIGHT ═════════════════════════ */
const C = {
  cream: '#FAF7F2',
  paper: '#FFFFFF',
  ink: '#3D2E28',
  ink2: '#6B5849',
  muted: '#A08C7D',
  tomato: '#F0503A',
  tomatoDeep: '#D93D26',
  tomatoSoft: '#FFE5E0',
  lime: '#C4E538',
  limeSoft: '#F5FBD9',
  cobalt: '#6B8EFF',
  cobaltSoft: '#EBF0FF',
  mustard: '#FFB627',
  mustardSoft: '#FFF4D6',
  mint: '#5EEAD4',
  lavender: '#B4A7FF',
  hair: '#E7E1D6',
  hairSoft: '#F2EDE4',
};

const FONT_DISPLAY = '"Instrument Serif", "Playfair Display", Georgia, serif';
const FONT_SANS = '"Space Grotesk", "Inter", system-ui, sans-serif';
const FONT_MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

/* ═════════════════════════ CONSTANTS ═════════════════════════ */
const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Expertise', path: '/expertise' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Resume', path: '/resume' },
];

const EASE = [0.16, 1, 0.3, 1];

const monoLabel = {
  fontFamily: FONT_MONO,
  fontSize: 10.5,
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};

/* ═════════════════════════ SCROLL PROGRESS ═════════════════════════ */
function ScrollProgressBar() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.4,
  });

  return (
    <Box
      component={motion.div}
      aria-hidden
      style={{ scaleX }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        transformOrigin: 'left',
        background: C.tomato,
        zIndex: 9999,
        opacity: reduced ? 0.6 : 1,
        pointerEvents: 'none',
      }}
    />
  );
}

/* ═════════════════════════ MAGNETIC ═════════════════════════ */
function Magnetic({ children, strength = 0.3 }) {
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

/* ═════════════════════════ HEADER ═════════════════════════ */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();

  useEffect(() => {
    if (document.getElementById('mory-fonts')) return;
    const l = document.createElement('link');
    l.id = 'mory-fonts';
    l.rel = 'stylesheet';
    l.href =
      'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap';
    document.head.appendChild(l);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActivePath = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  return (
    <>
      <ScrollProgressBar />

      {/* ═══════════ MAIN HEADER ═══════════ */}
      <Box
        component={motion.header}
        initial={prefersReducedMotion ? false : { y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          pt: scrolled ? { xs: 1, md: 1.5 } : 0,
          bgcolor: C.cream,
          transition: 'all .35s cubic-bezier(.16,1,.3,1)',
          fontFamily: FONT_SANS,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            px: scrolled ? { xs: 1.5, md: 2 } : { xs: 2.5, sm: 4, md: 6 },
            transition: 'padding .4s cubic-bezier(.16,1,.3,1)',
          }}
        >
          <Box
            sx={{
              bgcolor: C.paper,
              border: scrolled ? `2px solid ${C.ink}` : `2px solid ${C.hair}`,
              boxShadow: scrolled ? `4px 4px 0 ${C.ink}` : 'none',
              transition: 'all .35s cubic-bezier(.16,1,.3,1)',
              mt: scrolled ? 0 : { xs: 1, md: 1.5 },
              mb: scrolled ? 0 : { xs: 1, md: 1.5 },
            }}
          >
            <Toolbar
              disableGutters
              sx={{
                minHeight: { xs: 64, md: scrolled ? 64 : 80 },
                px: { xs: 2, md: 3 },
                transition: 'all .4s cubic-bezier(.16,1,.3,1)',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              {/* LOGO */}
              <Box
                component={Link}
                to="/"
                aria-label="Home"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  gap: 0.5,
                  textDecoration: 'none',
                  color: C.ink,
                  position: 'relative',
                  '&:focus-visible': {
                    outline: `2px solid ${C.tomato}`,
                    outlineOffset: 4,
                  },
                  '&:hover .logo-dot': {
                    transform: 'scale(1.25) rotate(12deg)',
                  },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 400,
                    fontSize: { xs: 26, md: 32 },
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: C.ink,
                  }}
                >
                  Mory
                </Typography>
                <Typography
                  component="span"
                  className="logo-dot"
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: { xs: 26, md: 32 },
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: C.tomato,
                    display: 'inline-block',
                    transformOrigin: 'bottom left',
                    transition: 'transform .35s cubic-bezier(.16,1,.3,1)',
                  }}
                >
                  .
                </Typography>
                <Box
                  component="span"
                  sx={{
                    ml: 0.75,
                    ...monoLabel,
                    fontSize: 9,
                    color: C.muted,
                    alignSelf: 'flex-start',
                    mt: 1,
                    display: { xs: 'none', sm: 'inline' },
                  }}
                >
                  Dev · AI
                </Box>
              </Box>

              {/* DESKTOP NAV */}
              <Box
                component="nav"
                aria-label="Main navigation"
                sx={{
                  display: { xs: 'none', lg: 'flex' },
                  gap: 0.5,
                  alignItems: 'center',
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                {links.map((link, i) => {
                  const active = isActivePath(link.path);
                  return (
                    <Box
                      key={link.path}
                      component={NavLink}
                      to={link.path}
                      end={link.path === '/'}
                      sx={{
                        position: 'relative',
                        px: 1.75,
                        py: 1,
                        fontFamily: FONT_SANS,
                        fontSize: 13,
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                        color: active ? C.ink : C.ink2,
                        textDecoration: 'none',
                        bgcolor: active ? C.limeSoft : 'transparent',
                        transition: 'all .2s ease',
                        '&:hover': {
                          color: C.ink,
                          bgcolor: active ? C.limeSoft : C.hairSoft,
                        },
                        '&:focus-visible': {
                          outline: `2px solid ${C.tomato}`,
                          outlineOffset: 2,
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 6,
                          right: 6,
                          height: 2,
                          bgcolor: C.tomato,
                          transform: active ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'left',
                          transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
                        },
                        '&:hover::before': { transform: 'scaleX(1)' },
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          display: 'inline-block',
                          ...monoLabel,
                          fontSize: 8.5,
                          color: active ? C.tomato : C.muted,
                          mr: 0.75,
                          verticalAlign: 'super',
                          fontWeight: 700,
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </Box>
                      {link.label}
                    </Box>
                  );
                })}
              </Box>

              {/* RIGHT GROUP */}
              <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'center' }}>
                <Box sx={{ display: { xs: 'none', lg: 'inline-flex' }, border: `1.5px solid ${C.hair}`, bgcolor: C.cream, p: '3px', gap: '2px' }} aria-label="Language selector">
                  
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                  <Magnetic>
                    <Box
                      component={NavLink}
                      to="/contact"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2.4,
                        py: 1.15,
                        fontFamily: FONT_SANS,
                        fontSize: 13,
                        fontWeight: 700,
                        textTransform: 'none',
                        textDecoration: 'none',
                        color: '#fff',
                        bgcolor: C.tomato,
                        border: `2px solid ${C.tomato}`,
                        transition: 'all .2s ease',
                        '&:hover': {
                          bgcolor: C.tomatoDeep,
                          borderColor: C.ink,
                          transform: 'translate(-2px, -2px)',
                          boxShadow: `4px 4px 0 ${C.ink}`,
                        },
                        '&:focus-visible': {
                          outline: `2px solid ${C.ink}`,
                          outlineOffset: 3,
                        },
                        '& svg': { transition: 'transform .3s ease' },
                        '&:hover svg': { transform: 'translate(2px, -2px)' },
                      }}
                    >
                      Contact
                      <NorthEastIcon sx={{ fontSize: 16 }} />
                    </Box>
                  </Magnetic>
                </Box>

                <IconButton
                  onClick={() => setOpen(true)}
                  aria-label="Open navigation"
                  sx={{
                    display: { xs: 'inline-flex', lg: 'none' },
                    color: C.ink,
                    bgcolor: C.limeSoft,
                    border: `2px solid ${C.ink}`,
                    borderRadius: 0,
                    width: 42,
                    height: 42,
                    transition: 'all .2s ease',
                    '&:hover': {
                      bgcolor: C.lime,
                      boxShadow: `3px 3px 0 ${C.ink}`,
                      transform: 'translate(-2px, -2px)',
                    },
                    '&:focus-visible': {
                      outline: `2px solid ${C.tomato}`,
                      outlineOffset: 3,
                    },
                  }}
                >
                  <MenuRoundedIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Box>
        </Container>
      </Box>

      {/* ═══════════ MOBILE DRAWER ═══════════ */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: '440px',
            maxWidth: '100vw',
            boxSizing: 'border-box',
            flexShrink: 0,
            bgcolor: C.cream,
            color: C.ink,
            boxShadow: 'none',
            overflow: 'hidden',
            fontFamily: FONT_SANS,
          },
        }}
      >
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            minHeight: 0,
          }}
        >
          {/* MAIN PAPER BOX */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: C.paper,
              border: `2px solid ${C.ink}`,
              boxShadow: `4px 4px 0 ${C.ink}`,
              overflow: 'hidden',
              minWidth: 0,
              minHeight: 0,
            }}
          >
            {/* TOP BAR */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2.5,
                py: 1.75,
                borderBottom: `1.5px solid ${C.hair}`,
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  gap: 0.5,
                  whiteSpace: 'nowrap',
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 400,
                    fontSize: 28,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: C.ink,
                  }}
                >
                  Mory
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 28,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: C.tomato,
                  }}
                >
                  .
                </Typography>
              </Box>

              <IconButton
                component={motion.button}
                onClick={() => setOpen(false)}
                whileHover={prefersReducedMotion ? {} : { rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close navigation"
                sx={{
                  color: C.ink,
                  bgcolor: C.tomatoSoft,
                  border: `2px solid ${C.tomato}`,
                  borderRadius: 0,
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  transition: 'all .2s ease',
                  '&:hover': {
                    bgcolor: C.tomato,
                    color: '#fff',
                    borderColor: C.tomato,
                    boxShadow: `3px 3px 0 ${C.ink}`,
                    transform: 'translate(-2px, -2px)',
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${C.ink}`,
                    outlineOffset: 3,
                  },
                }}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Box>

            {/* SUB-HEADER */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2.5,
                py: 1.5,
                borderBottom: `1.5px solid ${C.hair}`,
                flexShrink: 0,
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  ...monoLabel,
                  color: C.muted,
                  fontWeight: 700,
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                Menu · {String(links.length).padStart(2, '0')}
              </Typography>
              <Box sx={{ flex: 1, height: '1px', bgcolor: C.hair, minWidth: 0 }} />
            </Box>

            

            {/* LINKS — overflowY: scroll reserves the gutter at all times */}
            <Box
              component="nav"
              aria-label="Mobile navigation"
              sx={{
                p: { xs: 1.5, sm: 2 },
                display: 'flex',
                flexDirection: 'column',
                gap: 0.75,
                flex: 1,
                overflowY: 'scroll',
                overflowX: 'hidden',
                minWidth: 0,
                minHeight: 0,
                scrollbarWidth: 'thin',
                scrollbarColor: `${C.hair} transparent`,
                '&::-webkit-scrollbar': { width: 6 },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
                '&::-webkit-scrollbar-thumb': {
                  background: C.hair,
                  borderRadius: 3,
                },
              }}
            >
              {links.map((link, index) => {
                const active = isActivePath(link.path);
                return (
                  <Box
                    key={link.path}
                    component={motion.div}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.08 + index * 0.05,
                      duration: 0.4,
                      ease: EASE,
                    }}
                    sx={{ flexShrink: 0, minWidth: 0 }}
                  >
                    <Box
                      component={NavLink}
                      to={link.path}
                      end={link.path === '/'}
                      onClick={() => setOpen(false)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        py: 1.5,
                        px: 1.75,
                        textDecoration: 'none',
                        color: active ? C.ink : C.ink2,
                        bgcolor: active ? C.limeSoft : C.paper,
                        border: `2px solid ${active ? C.ink : C.hair}`,
                        boxShadow: active ? `3px 3px 0 ${C.ink}` : 'none',
                        transition: 'all .2s ease',
                        minWidth: 0,
                        '&:hover': {
                          bgcolor: active ? C.lime : C.hairSoft,
                          borderColor: C.ink,
                          boxShadow: `3px 3px 0 ${C.ink}`,
                          transform: 'translate(-2px, -2px)',
                        },
                        '&:focus-visible': {
                          outline: `2px solid ${C.tomato}`,
                          outlineOffset: 2,
                        },
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          ...monoLabel,
                          fontSize: 10,
                          color: active ? C.tomato : C.muted,
                          width: 24,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </Typography>
                      <Typography
                        component="span"
                        sx={{
                          fontFamily: FONT_SANS,
                          fontSize: 16,
                          fontWeight: 600,
                          letterSpacing: '-0.01em',
                          flex: 1,
                          minWidth: 0,
                          color: active ? C.ink : C.ink2,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {link.label}
                      </Typography>
                      <NorthEastIcon
                        sx={{
                          fontSize: 16,
                          color: active ? C.tomato : C.muted,
                          flexShrink: 0,
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* BOTTOM CTA */}
            <Box
              component={motion.div}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.45,
                duration: 0.5,
                ease: EASE,
              }}
              sx={{
                p: { xs: 1.5, sm: 2 },
                borderTop: `1.5px solid ${C.hair}`,
                flexShrink: 0,
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  bgcolor: C.paper,
                  border: `2px solid ${C.ink}`,
                  boxShadow: `4px 4px 0 ${C.ink}`,
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1.25,
                    minWidth: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      bgcolor: C.lime,
                      boxShadow: `0 0 0 3px ${C.limeSoft}`,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      ...monoLabel,
                      color: C.ink,
                      fontSize: 9.5,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      minWidth: 0,
                    }}
                  >
                    Available · 2026
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontFamily: FONT_DISPLAY,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 24,
                    lineHeight: 1.1,
                    color: C.ink,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Have a project in mind?
                </Typography>
                <Typography
                  sx={{
                    fontFamily: FONT_SANS,
                    fontSize: 12.5,
                    color: C.ink2,
                    mt: 0.75,
                    lineHeight: 1.5,
                  }}
                >
                  Reach out by phone or message.
                </Typography>

                <Box
                  component={NavLink}
                  to="/contact"
                  onClick={() => setOpen(false)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2,
                    px: 2,
                    py: 1.25,
                    bgcolor: C.tomato,
                    color: '#FFFFFF',
                    border: `2px solid ${C.tomato}`,
                    fontFamily: FONT_SANS,
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all .2s ease',
                    '&:hover': {
                      bgcolor: C.tomatoDeep,
                      borderColor: C.ink,
                      transform: 'translate(-2px, -2px)',
                      boxShadow: `4px 4px 0 ${C.ink}`,
                    },
                    '&:focus-visible': {
                      outline: `2px solid ${C.ink}`,
                      outlineOffset: 3,
                    },
                    '& svg': { transition: 'transform .3s ease', flexShrink: 0 },
                    '&:hover svg': { transform: 'translate(2px, -2px)' },
                  }}
                >
                  Contact
                  <NorthEastIcon sx={{ fontSize: 16 }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
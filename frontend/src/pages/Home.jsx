// src/pages/Home.jsx
import { useRef, useCallback, useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { Link } from 'react-router-dom';
import profile from '../config/profile';

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

/* ═════════════════════════ KEYFRAMES ═════════════════════════ */
const keyframesCSS = `
  @keyframes floaty {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes floatySlow {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-6px) rotate(0deg); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes spinRev {
    to { transform: rotate(-360deg); }
  }
  @keyframes wiggle {
    0%, 100% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg); }
  }
  @keyframes drawLine {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  @keyframes marquee {
    to { transform: translateX(-50%); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  @keyframes pulseRing {
    0% { transform: scale(0.9); opacity: 0.8; }
    100% { transform: scale(1.6); opacity: 0; }
  }
`;

/* ═════════════════════════ FONTS LOADER ═════════════════════════ */
function useFonts() {
  useEffect(() => {
    if (document.getElementById('mory-fonts')) return;
    const l = document.createElement('link');
    l.id = 'mory-fonts';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap';
    document.head.appendChild(l);
    const s = document.createElement('style');
    s.textContent = keyframesCSS;
    document.head.appendChild(s);
  }, []);
}

/* ═════════════════════════ HELPERS ═════════════════════════ */

/** Returns the hostname of a URL (fallback: raw URL). */
function hostOf(url) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

/**
 * Generates an inline static SVG image (zero network requests) that
 * serves as the last fallback if both the local screenshot and the
 * remote service fail. Editorial design consistent with the brand.
 */
function placeholderImage(name, accent, accentSoft) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
    <defs>
      <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="${accent}" opacity="0.18"/>
      </pattern>
    </defs>
    <rect width="1200" height="750" fill="${accentSoft}"/>
    <rect width="1200" height="750" fill="url(#dots)"/>
    <circle cx="1000" cy="150" r="260" fill="${accent}" opacity="0.16"/>
    <circle cx="150" cy="640" r="290" fill="${accent}" opacity="0.10"/>
    <rect x="0" y="0" width="1200" height="750" fill="none" stroke="${accent}" stroke-width="4" opacity="0.32"/>
    <text x="64" y="440" font-family="Georgia, 'Times New Roman', serif" font-size="148" fill="${accent}" opacity="0.92">${name}</text>
    <text x="66" y="500" font-family="ui-monospace, Menlo, monospace" font-size="22" letter-spacing="7" fill="${accent}" opacity="0.6">PROJECT PREVIEW</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Free remote screenshot services (no API key).
 * Each is tried in turn if the previous one fails.
 */
const screenshotServices = {
  thumio: (url, w = 1200, h = 750) =>
    `https://image.thum.io/get/width/${w}/crop/${h}/noanimate/${url}`,
  mshots: (url, w = 1200, h = 750) =>
    `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${w}&h=${h}`,
};

/* ═════════════════════════ PROJECTS ═════════════════════════ */
const featuredProjects = [
  {
    id: 'brain',
    name: 'Brain',
    type: 'Personal project',
    category: 'AI · Chatbot',
    description:
      "Conversational AI assistant available on WhatsApp. It understands and generates text and voice messages. React for the interface, Python + FastAPI for the back-end, AI services for understanding.",
    technologies: ['React', 'Python', 'FastAPI', 'AI'],
    demo: 'https://brainia-ai.web.app',
    imageSources: [
      '/images/brain.jpg',
      screenshotServices.thumio('https://brainia-ai.web.app'),
      screenshotServices.mshots('https://brainia-ai.web.app'),
      placeholderImage('Brain', C.cobalt, C.cobaltSoft),
    ],
    accent: C.cobalt,
    accentSoft: C.cobaltSoft,
  },
  {
    id: 'hope',
    name: 'Hope',
    type: 'Personal project',
    category: 'E-commerce',
    description:
      "Online store specializing in innovative travel gadgets. React + Vite + Material UI, products via Firebase Firestore, product pages, variants, customer reviews, complete checkout flow.",
    technologies: ['React', 'Vite', 'MUI', 'Firebase'],
    demo: 'https://hope-shop.web.app', // TODO: replace with the real URL
    imageSources: [
      '/images/hope.jpg',
      screenshotServices.thumio('https://hope-shop.web.app'),
      screenshotServices.mshots('https://hope-shop.web.app'),
      placeholderImage('Hope', C.tomato, C.tomatoSoft),
    ],
    accent: C.tomato,
    accentSoft: C.tomatoSoft,
  },
  {
    id: 'sarab',
    name: 'Sarab',
    type: 'Client work',
    category: 'Showcase · Restaurant',
    description:
      "Showcase website for the Sarab restaurant: menu presentation, online reservation, photo gallery and practical information. A responsive experience designed to highlight the venue's identity and make it easy to get in touch.",
    technologies: ['React', 'MUI', 'Design'],
    demo: 'http://169.58.36.220:8081/',
    imageSources: [
      '/images/sarab.jpg',
      screenshotServices.thumio('http://169.58.36.220:8081/'),
      screenshotServices.mshots('http://169.58.36.220:8081/'),
      placeholderImage('Sarab', C.mustard, C.mustardSoft),
    ],
    accent: C.mustard,
    accentSoft: C.mustardSoft,
  },
  {
    id: 'royal-hotel',
    name: 'Royal Hotel',
    type: 'Client work',
    category: 'Showcase · Hospitality',
    description:
      "Showcase website for the Royal Hotel: presentation of rooms and suites, online reservation, photo gallery and hotel services. A digital experience worthy of the venue's elegance.",
    technologies: ['React', 'MUI', 'Design'],
    demo: 'http://169.58.36.220:8083/',
    imageSources: [
      '/images/royal-hotel.jpg',
      screenshotServices.thumio('http://169.58.36.220:8083/'),
      screenshotServices.mshots('http://169.58.36.220:8083/'),
      placeholderImage('Royal Hotel', C.cobalt, C.cobaltSoft),
    ],
    accent: C.cobalt,
    accentSoft: C.cobaltSoft,
  },
  {
    id: 'coraluxe',
    name: 'Coraluxe',
    type: 'Client work',
    category: 'Showcase · Real Estate',
    description:
      "High-end real estate platform: exceptional properties for sale and rent, detailed listings, advanced search filters, immersive gallery and direct contact with agents.",
    technologies: ['React', 'MUI', 'API'],
    demo: 'http://169.58.36.220:8084/',
    imageSources: [
      '/images/coraluxe.jpg',
      screenshotServices.thumio('http://169.58.36.220:8084/'),
      screenshotServices.mshots('http://169.58.36.220:8084/'),
      placeholderImage('Coraluxe', C.lime, C.limeSoft),
    ],
    accent: C.lime,
    accentSoft: C.limeSoft,
  },
].filter((project) =>
  ['sarab', 'royal-hotel', 'coraluxe'].includes(project.id)
);

 /* ═════════════════════════ MAGNETIC ═════════════════════════ */
function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  const reduced = useReducedMotion();

  const onMove = useCallback(
    (e) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [reduced, strength, x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

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

/* ═════════════════════════ IMAGE WITH CASCADING FALLBACKS ═════════════════════════ */
/**
 * Shows `sources[0]`. On error (404, network, etc.) automatically
 * advances to the next source. If all sources are exhausted,
 * `onAllFailed` is called.
 */
function ImageWithFallback({ sources, alt, sx, onAllFailed, ...rest }) {
  const list = Array.isArray(sources) ? sources : [sources];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [list[0]]);

  const handleError = () => {
    if (index < list.length - 1) {
      setIndex((i) => i + 1);
    } else if (onAllFailed) {
      onAllFailed();
    }
  };

  return (
    <Box
      component="img"
      src={list[index]}
      alt={alt}
      loading="lazy"
      onError={handleError}
      sx={sx}
      {...rest}
    />
  );
}

/* ═════════════════════════ PROJECT PREVIEW (IFRAME MODAL) ═════════════════════════ */
const DEVICES = [
  { id: 'desktop', label: 'Desktop', width: '100%' },
  { id: 'tablet', label: 'Tablet', width: '820px' },
  { id: 'mobile', label: 'Mobile', width: '390px' },
];

function ProjectPreview({ project, onClose }) {
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [device, setDevice] = useState('desktop');
  const [reloadKey, setReloadKey] = useState(0);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    setLoaded(false);
    setBlocked(false);
    setDevice('desktop');
    setReloadKey(0);
    const t = setTimeout(() => setBlocked(true), 10000);
    return () => clearTimeout(t);
  }, [project]);

  useEffect(() => {
    if (project && closeBtnRef.current) {
      const id = setTimeout(() => closeBtnRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  const handleReload = () => {
    setLoaded(false);
    setBlocked(false);
    setReloadKey((k) => k + 1);
  };

  const isMixedContent =
    typeof window !== 'undefined' &&
    window.location.protocol === 'https:' &&
    project?.demo?.startsWith('http://');

  const currentDevice = DEVICES.find((d) => d.id === device) || DEVICES[0];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1400,
            display: 'grid',
            placeItems: 'center',
            padding: 16,
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Project preview ${project.name}`}
        >
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(11,11,15,0.78)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: 'min(1200px, 96vw)',
              height: 'min(86vh, 900px)',
              display: 'flex',
              flexDirection: 'column',
              background: C.paper,
              border: `2px solid ${C.ink}`,
              boxShadow: `10px 10px 0 ${project.accent}`,
              overflow: 'hidden',
            }}
          >
            {/* ───────── Top bar ───────── */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                px: { xs: 1.5, sm: 2 },
                py: 1.25,
                bgcolor: C.ink,
                color: C.cream,
                borderBottom: `2px solid ${C.ink}`,
                flexShrink: 0,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: project.accent,
                    flexShrink: 0,
                    animation: 'blink 2s ease-in-out infinite',
                  }}
                />
                <Typography
                  sx={{ ...monoLabel, color: C.cream, fontSize: 10, whiteSpace: 'nowrap' }}
                >
                  {project.name}
                </Typography>
                <Typography
                  component="a"
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontFamily: FONT_MONO,
                    fontSize: 10,
                    color: 'rgba(250,247,242,.55)',
                    textDecoration: 'none',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: { xs: 'none', sm: 'block' },
                    '&:hover': { color: C.lime },
                  }}
                >
                  {hostOf(project.demo)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                <Box
                  component="button"
                  type="button"
                  onClick={handleReload}
                  aria-label="Reload preview"
                  title="Reload preview"
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 34,
                    height: 34,
                    cursor: 'pointer',
                    color: C.cream,
                    bgcolor: 'transparent',
                    border: `2px solid rgba(250,247,242,.35)`,
                    transition: 'all .2s ease',
                    '&:hover': {
                      bgcolor: C.lime,
                      borderColor: C.lime,
                      color: C.ink,
                      '& svg': { transform: 'rotate(180deg)' },
                    },
                    '& svg': { transition: 'transform .4s ease' },
                  }}
                >
                  <RefreshRoundedIcon sx={{ fontSize: 16 }} />
                </Box>

                <Box
                  component="a"
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                    px: 1.5,
                    py: 0.75,
                    fontFamily: FONT_SANS,
                    fontSize: 11.5,
                    fontWeight: 700,
                    textDecoration: 'none',
                    color: C.ink,
                    bgcolor: C.lime,
                    border: `2px solid ${C.lime}`,
                    transition: 'all .2s ease',
                    '&:hover': { bgcolor: C.tomato, borderColor: C.tomato, color: '#fff' },
                  }}
                >
                  <OpenInNewRoundedIcon sx={{ fontSize: 14 }} />
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    New tab
                  </Box>
                </Box>

                <Box
                  component="button"
                  type="button"
                  ref={closeBtnRef}
                  onClick={onClose}
                  aria-label="Close preview"
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 34,
                    height: 34,
                    cursor: 'pointer',
                    color: C.cream,
                    bgcolor: 'transparent',
                    border: `2px solid rgba(250,247,242,.35)`,
                    transition: 'all .2s ease',
                    '&:hover': { bgcolor: C.tomato, borderColor: C.tomato, color: '#fff' },
                    '&:focus-visible': {
                      outline: `2px solid ${C.lime}`,
                      outlineOffset: 2,
                    },
                  }}
                >
                  <CloseRoundedIcon sx={{ fontSize: 18 }} />
                </Box>
              </Box>
            </Box>

            {/* ───────── Preview area ───────── */}
            <Box
              sx={{
                position: 'relative',
                flex: 1,
                minHeight: 0,
                bgcolor: device === 'desktop' ? C.cream : C.ink,
                p: device === 'desktop' ? 0 : 2,
                transition: 'background-color .3s ease, padding .3s ease',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: currentDevice.width,
                  maxWidth: '100%',
                  height: '100%',
                  bgcolor: '#fff',
                  boxShadow:
                    device === 'desktop' ? 'none' : `0 12px 48px rgba(0,0,0,.55)`,
                  overflow: 'hidden',
                  transition: 'width .4s cubic-bezier(.2,.9,.3,1), box-shadow .3s ease',
                }}
              >
                <Box
                  component="iframe"
                  key={reloadKey}
                  src={project.demo}
                  title={`Preview of project ${project.name}`}
                  onLoad={() => {
                    setLoaded(true);
                    setBlocked(false);
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals"
                  allow="fullscreen; clipboard-read; clipboard-write; autoplay"
                  sx={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    border: 0,
                    bgcolor: '#fff',
                    opacity: loaded && !blocked ? 1 : 0,
                    transition: 'opacity .35s ease',
                  }}
                />

                {!loaded && !blocked && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(135deg, ${project.accentSoft} 0%, ${C.cream} 100%)`,
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          mx: 'auto',
                          mb: 2.5,
                          border: `3px solid ${C.hair}`,
                          borderTopColor: project.accent,
                          borderRadius: '50%',
                          animation: 'spin 0.9s linear infinite',
                        }}
                      />
                      <Typography sx={{ ...monoLabel, color: C.ink2, mb: 0.5 }}>
                        Loading preview…
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: FONT_MONO,
                          fontSize: 9.5,
                          color: C.muted,
                          letterSpacing: '0.06em',
                        }}
                      >
                        {hostOf(project.demo)}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {blocked && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'grid',
                      placeItems: 'center',
                      p: 3,
                      bgcolor: C.cream,
                      backgroundImage: `radial-gradient(circle at 80% 20%, ${project.accentSoft} 0%, transparent 60%)`,
                    }}
                  >
                    <Box sx={{ textAlign: 'center', maxWidth: 480 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          mx: 'auto',
                          mb: 2.5,
                          display: 'grid',
                          placeItems: 'center',
                          bgcolor: project.accentSoft,
                          border: `2px solid ${project.accent}`,
                          position: 'relative',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            border: `2px solid ${project.accent}`,
                            animation: 'pulseRing 1.8s ease-out infinite',
                          }}
                        />
                        <OpenInNewRoundedIcon
                          sx={{ fontSize: 22, color: project.accent, position: 'relative' }}
                        />
                      </Box>

                      <Typography
                        sx={{
                          fontFamily: FONT_DISPLAY,
                          fontSize: { xs: 28, sm: 38 },
                          lineHeight: 1.05,
                          letterSpacing: '-0.02em',
                          color: C.ink,
                          mb: 1.5,
                        }}
                      >
                        Preview unavailable{' '}
                        <Box component="span" sx={{ fontStyle: 'italic', color: project.accent }}>
                          here.
                        </Box>
                      </Typography>

                      <Typography
                        sx={{
                          fontFamily: FONT_SANS,
                          fontSize: 13.5,
                          lineHeight: 1.65,
                          color: C.ink2,
                          mb: 3,
                        }}
                      >
                        {isMixedContent
                          ? "This site is served over HTTP and cannot be displayed inside a secure HTTPS frame. Open it directly in a new tab."
                          : "This site refuses to be displayed inside a frame (X-Frame-Options). Open it directly in a new tab to enjoy the full experience."}
                      </Typography>

                      <Box
                        component="a"
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          px: 2.75,
                          py: 1.5,
                          fontFamily: FONT_SANS,
                          fontSize: 13.5,
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
                            boxShadow: `4px 4px 0 ${project.accent}`,
                          },
                        }}
                      >
                        Open project
                        <NorthEastIcon sx={{ fontSize: 16 }} />
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 0.25,
                  p: 0.5,
                  bgcolor: 'rgba(11,11,15,.82)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: `1.5px solid rgba(250,247,242,.22)`,
                  zIndex: 4,
                }}
              >
                {DEVICES.map((d) => (
                  <Box
                    component="button"
                    type="button"
                    key={d.id}
                    onClick={() => setDevice(d.id)}
                    sx={{
                      px: 1.5,
                      py: 0.55,
                      cursor: 'pointer',
                      border: 0,
                      bgcolor: device === d.id ? C.lime : 'transparent',
                      color: device === d.id ? C.ink : 'rgba(250,247,242,.85)',
                      fontFamily: FONT_MONO,
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      transition: 'all .2s ease',
                      '&:hover': { color: device === d.id ? C.ink : C.lime },
                    }}
                  >
                    {d.label}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* ───────── Panel footer ───────── */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                px: { xs: 1.5, sm: 2 },
                py: 1.25,
                borderTop: `2px solid ${C.ink}`,
                bgcolor: C.paper,
                flexShrink: 0,
              }}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {project.technologies.map((tech) => (
                  <Box
                    key={tech}
                    sx={{
                      px: 1,
                      py: 0.3,
                      bgcolor: project.accentSoft,
                      border: `1px solid ${C.ink}`,
                      fontFamily: FONT_MONO,
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      color: C.ink,
                    }}
                  >
                    {tech}
                  </Box>
                ))}
              </Box>
              <Typography
                sx={{
                  ...monoLabel,
                  fontSize: 9,
                  color: C.muted,
                  whiteSpace: 'nowrap',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Esc to close
              </Typography>
            </Box>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═════════════════════════ MARQUEE ═════════════════════════ */
function MarqueeStrip() {
  const reduced = useReducedMotion();
  const items = [
    'FULL-STACK',
    'REACT · FASTAPI',
    'AI · CHATBOTS',
    'BAMAKO · ML',
    'EN · FR',
    'FREELANCE',
    'AVAILABLE',
  ];
  const content = [...items, ...items, ...items];

  return (
    <Box
      sx={{
        py: 2,
        bgcolor: C.ink,
        color: C.lime,
        overflow: 'hidden',
        borderTop: `2px solid ${C.ink}`,
        borderBottom: `2px solid ${C.ink}`,
        position: 'relative',
      }}
    >
      <motion.div
        animate={reduced ? {} : { x: ['0%', '-33.33%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 32, whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {content.map((item, i) => (
          <Box
            key={i}
            component="span"
            sx={{
              ...monoLabel,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
              fontSize: 14,
            }}
          >
            {item}
            <Box component="span" sx={{ color: C.tomato, fontSize: 18, lineHeight: 1 }}>
              ✦
            </Box>
          </Box>
        ))}
      </motion.div>
    </Box>
  );
}

/* ═════════════════════════ HERO VISUAL ═════════════════════════ */
function HeroVisual() {
  const reduced = useReducedMotion();
  const cardRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-8deg', '8deg']);

  const onMove = useCallback(
    (e) => {
      if (reduced || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [reduced, pointerX, pointerY]
  );

  const onLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <Box
      ref={cardRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 520,
        aspectRatio: '1 / 1.05',
        perspective: 1200,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          width: '65%',
          height: '65%',
          background: `radial-gradient(circle, ${C.tomatoSoft} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: '0%',
          left: '0%',
          width: '55%',
          height: '55%',
          background: `radial-gradient(circle, ${C.limeSoft} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <motion.div style={reduced ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <Box
          sx={{
            width: { xs: 280, sm: 320, md: 360 },
            aspectRatio: '3 / 4',
            bgcolor: C.paper,
            border: `2px solid ${C.ink}`,
            boxShadow: `8px 8px 0 ${C.ink}`,
            transform: 'rotate(-2deg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 3,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src="/images/profile.jpg"
            alt=""
            onError={(e) => {
              e.target.style.display = 'none';
            }}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 1,
              filter: 'none',
              pointerEvents: 'none',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.25,
                py: 0.5,
                bgcolor: C.lime,
                border: `1.5px solid ${C.ink}`,
              }}
            >
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: C.ink,
                  animation: 'blink 2s ease-in-out infinite',
                }}
              />
              <Typography sx={{ ...monoLabel, fontSize: 8.5, color: C.ink }}>
                Portfolio
              </Typography>
            </Box>
            <Typography sx={{ ...monoLabel, fontSize: 9, color: C.muted }}>© 2026</Typography>
          </Box>

                    <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ height: 1, bgcolor: C.hair, mb: 1.5 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ ...monoLabel, fontSize: 8.5, color: C.muted }}>
                Dev · AI
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Box sx={{ width: 5, height: 5, bgcolor: C.tomato }} />
                <Box sx={{ width: 5, height: 5, bgcolor: C.mustard }} />
                <Box sx={{ width: 5, height: 5, bgcolor: C.lime }} />
                <Box sx={{ width: 5, height: 5, bgcolor: C.cobalt }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </motion.div>

      <motion.div
        animate={reduced ? {} : { y: [-6, 6, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '10%', left: '-6%', zIndex: 3 }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            bgcolor: C.paper,
            border: `2px solid ${C.ink}`,
            boxShadow: `4px 4px 0 ${C.ink}`,
            transform: 'rotate(3deg)',
          }}
        >
          <Typography sx={{ ...monoLabel, fontSize: 8, color: C.tomato, mb: 0.5 }}>
            Currently
          </Typography>
          <Typography
            sx={{
              fontFamily: FONT_SANS,
              fontSize: 12,
              fontWeight: 700,
              color: C.ink,
              lineHeight: 1.2,
            }}
          >
            {profile?.experience?.company || 'Experco International'}
          </Typography>
          <Typography sx={{ fontFamily: FONT_SANS, fontSize: 10, color: C.muted, mt: 0.25 }}>
            {profile?.experience?.position || 'Full-Stack Developer'}
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        animate={reduced ? {} : { y: [4, -8, 4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '12%', right: '-8%', zIndex: 3 }}
      >
        <Box
          sx={{
            px: 1.5,
            py: 1,
            bgcolor: C.ink,
            color: C.lime,
            border: `2px solid ${C.ink}`,
            boxShadow: `3px 3px 0 ${C.tomato}`,
            transform: 'rotate(-5deg)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
          }}
        >
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: C.lime }} />
          <Typography sx={{ ...monoLabel, fontSize: 9, color: C.lime }}>Full-Stack</Typography>
        </Box>
      </motion.div>

      <motion.div
        animate={reduced ? {} : { y: [-4, 8, -4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '22%', right: '-4%', zIndex: 3 }}
      >
        <Box
          sx={{
            px: 1.5,
            py: 1,
            bgcolor: C.mustard,
            border: `2px solid ${C.ink}`,
            boxShadow: `3px 3px 0 ${C.ink}`,
            transform: 'rotate(2deg)',
          }}
        >
          <Typography sx={{ ...monoLabel, fontSize: 7.5, color: C.ink }}>Based in</Typography>
          <Typography
            sx={{ fontFamily: FONT_SANS, fontSize: 11, fontWeight: 700, color: C.ink, mt: 0.25 }}
          >
            Bamako · ML
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
}

/* ═════════════════════════ HERO ═════════════════════════ */
function Hero() {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
      <Box
        sx={{
          minHeight: { md: '92vh' },
          py: { xs: 6, md: 8 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.1fr .9fr' },
          alignItems: 'center',
          gap: { xs: 6, md: 4 },
        }}
      >
        <motion.div
          variants={reduced ? {} : container}
          initial={reduced ? false : 'hidden'}
          animate={reduced ? false : 'visible'}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <motion.div variants={reduced ? {} : item}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: C.lime,
                  boxShadow: `0 0 0 4px ${C.limeSoft}`,
                  animation: 'blink 2s ease-in-out infinite',
                }}
              />
              <Typography sx={{ ...monoLabel, color: C.ink2 }}>Available · 2026</Typography>
            </Box>
          </motion.div>

          <Box sx={{ mb: 2 }}>
            <motion.div variants={reduced ? {} : item}>
              <Typography
                component="h1"
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 400,
                  fontSize: { xs: 64, sm: 88, md: 112, lg: 132 },
                  lineHeight: 0.85,
                  letterSpacing: '-0.05em',
                  color: C.ink,
                  mb: 1,
                }}
              >
                I build
              </Typography>
            </motion.div>

            <motion.div
              variants={reduced ? {} : item}
              style={{ position: 'relative', display: 'inline-block' }}
            >
              <Typography
                component="span"
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: { xs: 64, sm: 88, md: 112, lg: 132 },
                  lineHeight: 0.85,
                  letterSpacing: '-0.05em',
                  color: C.tomato,
                  display: 'inline-block',
                  position: 'relative',
                }}
              >
                digital
                <Box
                  component={motion.div}
                  initial={reduced ? false : { scaleX: 0 }}
                  animate={reduced ? false : { scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  sx={{
                    position: 'absolute',
                    bottom: '0.04em',
                    left: '0.02em',
                    right: '0.02em',
                    height: '0.04em',
                    bgcolor: C.tomato,
                    transformOrigin: 'left center',
                  }}
                />
              </Typography>
            </motion.div>

            <motion.div variants={reduced ? {} : item}>
              <Typography
                component="h1"
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 400,
                  fontSize: { xs: 64, sm: 88, md: 112, lg: 132 },
                  lineHeight: 0.85,
                  letterSpacing: '-0.05em',
                  color: C.ink,
                  mt: 1,
                }}
              >
                experiences
                <Box component="span" sx={{ color: C.tomato }}>
                  .
                </Box>
              </Typography>
            </motion.div>
          </Box>

          <motion.div variants={reduced ? {} : item}>
            <Typography
              sx={{
                fontFamily: FONT_SANS,
                color: C.ink2,
                maxWidth: 520,
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.7,
                mt: 4,
              }}
            >
              I'm{' '}
              <Box component="span" sx={{ color: C.ink, fontWeight: 700 }}>
                {profile?.name || 'Mory Tounkara'}
              </Box>
              , a full-stack developer based in Bamako. I design web applications, AI
              solutions and digital products that solve real problems.
            </Typography>
          </motion.div>

          <motion.div variants={reduced ? {} : item}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1.5,
                mt: 4,
              }}
            >
              <Magnetic>
                <Box
                  component={Link}
                  to="/projects"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.25,
                    px: 3,
                    py: 1.75,
                    fontFamily: FONT_SANS,
                    fontSize: 14,
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
                    '& svg': { transition: 'transform .3s ease' },
                    '&:hover svg': { transform: 'translate(3px, -3px)' },
                  }}
                >
                  View my projects
                  <NorthEastIcon sx={{ fontSize: 18 }} />
                </Box>
              </Magnetic>

              <Magnetic>
                <Box
                  component={Link}
                  to="/contact"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.25,
                    px: 3,
                    py: 1.75,
                    fontFamily: FONT_SANS,
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: 'none',
                    color: C.ink,
                    bgcolor: C.paper,
                    border: `2px solid ${C.ink}`,
                    transition: 'all .2s ease',
                    '&:hover': {
                      bgcolor: C.lime,
                      transform: 'translate(-2px, -2px)',
                      boxShadow: `4px 4px 0 ${C.ink}`,
                    },
                  }}
                >
                  Contact me
                  <ArrowOutwardRoundedIcon sx={{ fontSize: 18 }} />
                </Box>
              </Magnetic>
            </Box>
          </motion.div>

          <motion.div variants={reduced ? {} : item}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 4 }}>
              {(profile?.technologies ||
                ['React', 'Node.js', 'Python', 'FastAPI', 'Firebase', 'MUI'])
                .slice(0, 6)
                .map((tech) => (
                  <Box
                    key={tech}
                    sx={{
                      px: 1.25,
                      py: 0.6,
                      bgcolor: C.paper,
                      border: `1.5px solid ${C.hair}`,
                      fontFamily: FONT_MONO,
                      fontSize: 10.5,
                      fontWeight: 600,
                      color: C.ink2,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      transition: 'all .2s ease',
                      '&:hover': {
                        bgcolor: C.ink,
                        color: C.lime,
                        borderColor: C.ink,
                      },
                    }}
                  >
                    {tech}
                  </Box>
                ))}
            </Box>
          </motion.div>
        </motion.div>

        <Box sx={{ display: 'grid', placeItems: 'center', position: 'relative' }}>
          <HeroVisual />
        </Box>
      </Box>
    </Container>
  );
}

/* ═════════════════════════ OVERLAY BUTTON (project image) ═════════════════════════ */
function OverlayButton({ as = 'button', children, icon, ...rest }) {
  return (
    <Box
      component={as}
      {...rest}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.75,
        py: 1,
        cursor: 'pointer',
        fontFamily: FONT_SANS,
        fontSize: 12,
        fontWeight: 700,
        textDecoration: 'none',
        color: C.ink,
        bgcolor: C.paper,
        border: `2px solid ${C.ink}`,
        boxShadow: `3px 3px 0 ${C.ink}`,
        transition: 'all .2s ease',
        '&:hover': {
          bgcolor: C.lime,
          transform: 'translate(-2px, -2px)',
          boxShadow: `5px 5px 0 ${C.ink}`,
        },
        '& svg': { fontSize: 15 },
      }}
    >
      {icon}
      {children}
    </Box>
  );
}

/* ═════════════════════════ PROJECT CARD (grid) ═════════════════════════ */
function ProjectCard({ project, index, prefersReducedMotion, onPreview, spanFull = false }) {
  const [hover, setHover] = useState(false);
  const number = String(index + 1).padStart(2, '0');
  const hasDemo = Boolean(project.demo);

  const openPreview = (e) => {
    if (e) e.preventDefault();
    if (hasDemo) onPreview(project);
  };

  const card = (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: C.paper,
          border: `2px solid ${C.ink}`,
          boxShadow: hover ? `8px 8px 0 ${C.ink}` : `4px 4px 0 ${C.ink}`,
          transition: 'all .3s cubic-bezier(.2,.9,.3,1)',
          transform: hover ? 'translate(-4px, -4px)' : 'none',
          overflow: 'hidden',
        }}
      >
        {/* Static image + action overlay */}
        <Box
          onClick={openPreview}
          role={hasDemo ? 'button' : undefined}
          tabIndex={hasDemo ? 0 : undefined}
          onKeyDown={(e) => {
            if (hasDemo && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              openPreview();
            }
          }}
          aria-label={hasDemo ? `Open project preview ${project.name}` : project.name}
          sx={{
            position: 'relative',
            aspectRatio: spanFull ? { xs: '16 / 10', sm: '21 / 9' } : '16 / 10',
            overflow: 'hidden',
            borderBottom: `2px solid ${C.ink}`,
            bgcolor: project.accentSoft,
            cursor: hasDemo ? 'pointer' : 'default',
            '&:focus-visible': {
              outline: `3px solid ${project.accent}`,
              outlineOffset: -4,
            },
          }}
        >
          <Box
            component="iframe"
            src={project.demo}
            title={`Live preview of site ${project.name}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            tabIndex={-1}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 0,
              bgcolor: '#FFFFFF',
              pointerEvents: 'none',
              transform: hover ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform .8s cubic-bezier(.2,.9,.3,1)',
            }}
          />

          <Typography
            sx={{
              position: 'absolute',
              top: 12,
              left: 14,
              fontFamily: FONT_DISPLAY,
              fontStyle: 'italic',
              fontSize: 42,
              lineHeight: 1,
              color: '#FFFFFF',
              textShadow: '0 2px 12px rgba(0,0,0,.5)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            {number}
          </Typography>

          <Box
            sx={{
              position: 'absolute',
              top: 14,
              right: 14,
              px: 1.25,
              py: 0.5,
              bgcolor: 'rgba(255,255,255,.95)',
              backdropFilter: 'blur(8px)',
              border: `1.5px solid ${C.ink}`,
              fontFamily: FONT_MONO,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: C.ink,
              textTransform: 'uppercase',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            {project.type}
          </Box>

          {hasDemo && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 14,
                left: 14,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.25,
                py: 0.5,
                bgcolor: C.ink,
                border: `1.5px solid ${C.ink}`,
                zIndex: 2,
                opacity: hover ? 0 : 1,
                transition: 'opacity .25s ease',
                pointerEvents: 'none',
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: C.lime,
                  animation: 'blink 2s ease-in-out infinite',
                }}
              />
              <Typography sx={{ ...monoLabel, fontSize: 8.5, color: C.lime }}>
                Live preview
              </Typography>
            </Box>
          )}

          {hasDemo && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 1.25,
                px: 2,
                bgcolor: 'rgba(11,11,15,.55)',
                backdropFilter: hover ? 'blur(3px)' : 'none',
                opacity: hover ? 1 : 0,
                pointerEvents: hover ? 'auto' : 'none',
                transition: 'opacity .28s ease',
              }}
            >
              <OverlayButton
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openPreview(e);
                }}
                icon={<VisibilityRoundedIcon />}
              >
                Preview
              </OverlayButton>

              <OverlayButton
                as="a"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                icon={<OpenInNewRoundedIcon />}
              >
                New tab
              </OverlayButton>
            </Box>
          )}
        </Box>

        {/* Content */}
        <Box
          sx={{
            p: 3,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            ...(spanFull && {
              maxWidth: { sm: 900 },
            }),
          }}
        >
          <Typography sx={{ ...monoLabel, color: project.accent, mb: 1 }}>
            {project.category}
          </Typography>
          <Typography
            sx={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 400,
              fontSize: 32,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: C.ink,
              mb: 1.5,
            }}
          >
            {project.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: FONT_SANS,
              fontSize: 13.5,
              lineHeight: 1.6,
              color: C.ink2,
              mb: 2.5,
              flex: 1,
              ...(spanFull && { maxWidth: 720 }),
            }}
          >
            {project.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2.5 }}>
            {project.technologies.map((tech) => (
              <Box
                key={tech}
                sx={{
                  px: 1,
                  py: 0.35,
                  bgcolor: project.accentSoft,
                  border: `1px solid ${C.ink}`,
                  fontFamily: FONT_MONO,
                  fontSize: 9.5,
                  fontWeight: 600,
                  color: C.ink,
                  letterSpacing: '0.04em',
                }}
              >
                {tech}
              </Box>
            ))}
          </Box>

          {hasDemo ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                pt: 2,
                borderTop: `1.5px solid ${C.hair}`,
              }}
            >
              <Box
                component="button"
                type="button"
                onClick={openPreview}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 0,
                  cursor: 'pointer',
                  bgcolor: 'transparent',
                  border: 0,
                  fontFamily: FONT_SANS,
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.ink,
                  transition: 'color .2s ease',
                  '&:hover': { color: project.accent },
                }}
              >
                Project preview
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    border: `1.5px solid ${C.ink}`,
                    display: 'grid',
                    placeItems: 'center',
                    transition: 'all .3s ease',
                    bgcolor: hover ? project.accent : 'transparent',
                    color: hover ? '#FFFFFF' : C.ink,
                    ...(hover && { borderColor: project.accent }),
                  }}
                >
                  <VisibilityRoundedIcon sx={{ fontSize: 15 }} />
                </Box>
              </Box>

              <Box
                component="a"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name} in a new tab`}
                title="Open in a new tab"
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                  color: C.ink,
                  bgcolor: 'transparent',
                  border: `1.5px solid ${C.ink}`,
                  textDecoration: 'none',
                  transition: 'all .3s ease',
                  '&:hover': { bgcolor: C.ink, color: C.lime },
                }}
              >
                <OpenInNewRoundedIcon sx={{ fontSize: 15 }} />
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                pt: 2,
                borderTop: `1.5px solid ${C.hair}`,
                fontFamily: FONT_MONO,
                fontSize: 10,
                fontWeight: 600,
                color: C.muted,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              In progress
            </Box>
          )}
        </Box>
      </Box>
    </motion.div>
  );

  if (spanFull) {
    return (
      <Box sx={{ gridColumn: { xs: 'span 1', sm: '1 / -1' }, height: '100%' }}>
        {card}
      </Box>
    );
  }

  return card;
}

/* ═════════════════════════ PROJECTS SECTION ═════════════════════════ */
function ProjectsSection() {
  const reduced = useReducedMotion();
  const [preview, setPreview] = useState(null);

  const closePreview = useCallback(() => setPreview(null), []);
  const totalIsOdd = featuredProjects.length % 2 === 1;

  return (
    <>
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              gap: 3,
              mb: { xs: 6, md: 8 },
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box sx={{ width: 8, height: 8, bgcolor: C.tomato }} />
                <Typography sx={{ ...monoLabel, color: C.ink }}>Selected work</Typography>
              </Box>
              <Typography
                component="h2"
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 400,
                  fontSize: { xs: 48, sm: 64, md: 88 },
                  lineHeight: 0.92,
                  letterSpacing: '-0.04em',
                  color: C.ink,
                }}
              >
                Projects that
                <br />
                <Box component="span" sx={{ fontStyle: 'italic', color: C.tomato }}>
                  make a difference.
                </Box>
              </Typography>
            </Box>

            <Box
              component={Link}
              to="/projects"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                pb: 0.5,
                fontFamily: FONT_MONO,
                fontSize: 11,
                fontWeight: 700,
                color: C.ink,
                textDecoration: 'none',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderBottom: `1.5px solid ${C.ink}`,
                transition: 'all .2s ease',
                '&:hover': {
                  color: C.tomato,
                  borderBottomColor: C.tomato,
                },
                '& svg': { transition: 'transform .3s ease' },
                '&:hover svg': { transform: 'translate(2px, -2px)' },
              }}
            >
              All projects
              <NorthEastIcon sx={{ fontSize: 14 }} />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: { xs: 3, md: 4 },
            }}
          >
            {featuredProjects.map((project, index) => {
              const isLast = index === featuredProjects.length - 1;
              const spanFull = isLast && totalIsOdd;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  prefersReducedMotion={reduced}
                  onPreview={setPreview}
                  spanFull={spanFull}
                />
              );
            })}
          </Box>
        </Box>
      </Container>

      <ProjectPreview project={preview} onClose={closePreview} />
    </>
  );
}

/* ═════════════════════════ FINAL CTA ═════════════════════════ */
function FinalCTA() {
  const reduced = useReducedMotion();

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
      <Box sx={{ py: { xs: 8, md: 14 }, position: 'relative' }}>
        <Box
          sx={{
            position: 'relative',
            bgcolor: C.ink,
            color: C.cream,
            border: `2px solid ${C.ink}`,
            boxShadow: `8px 8px 0 ${C.tomato}`,
            p: { xs: 4, sm: 6, md: 10 },
            overflow: 'hidden',
          }}
        >
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              top: '-50%',
              right: '-10%',
              width: '50%',
              height: '150%',
              bgcolor: C.tomato,
              opacity: 0.08,
              transform: 'rotate(-15deg)',
              pointerEvents: 'none',
            }}
          />

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: C.lime,
                  animation: 'blink 2s ease-in-out infinite',
                }}
              />
              <Typography sx={{ ...monoLabel, color: C.lime }}>
                Let's build something
              </Typography>
            </Box>

            <Typography
              component="h2"
              sx={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 400,
                fontSize: { xs: 48, sm: 72, md: 100 },
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: C.cream,
                mb: 3,
                maxWidth: 900,
              }}
            >
              Have an idea&nbsp;?
              <br />
              <Box component="span" sx={{ fontStyle: 'italic', color: C.lime }}>
                Contact
              </Box>
            </Typography>

            <Typography
              sx={{
                fontFamily: FONT_SANS,
                color: 'rgba(250,247,242,.7)',
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.7,
                maxWidth: 560,
                mb: 5,
              }}
            >
              An idea, a project, a collaboration? I'm always open to new
              conversations.
            </Typography>

            <Magnetic strength={0.3}>
              <Box
                component={Link}
                to="/contact"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 4,
                  py: 2,
                  fontFamily: FONT_SANS,
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: C.ink,
                  bgcolor: C.lime,
                  border: `2px solid ${C.lime}`,
                  transition: 'all .2s ease',
                  '&:hover': {
                    bgcolor: C.tomato,
                    borderColor: C.tomato,
                    color: '#FFFFFF',
                    transform: 'translate(-2px, -2px)',
                    boxShadow: `4px 4px 0 ${C.lime}`,
                  },
                  '& svg': { transition: 'transform .3s ease' },
                  '&:hover svg': { transform: 'translate(3px, -3px)' },
                }}
              >
                Start a conversation
                <NorthEastIcon sx={{ fontSize: 18 }} />
              </Box>
            </Magnetic>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
}

/* ═════════════════════════ HOME PAGE ═════════════════════════ */
export default function Home() {
  useFonts();

  return (
    <Box
      sx={{
        bgcolor: C.cream,
        minHeight: '100vh',
        fontFamily: FONT_SANS,
        color: C.ink,
        overflow: 'hidden',
      }}
    >
      <Hero />
      <MarqueeStrip />
      <ProjectsSection />
      <FinalCTA />
    </Box>
  );
}
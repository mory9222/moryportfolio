/**
 * ⚠️  TIKTOK PROOF IMAGE
 * ─────────────────────────────────────────────────────────
 * Drop your screenshot in: public/tiktok-proof.png
 * It will appear automatically in the "CASE STUDY" section.
 */

import { useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';

import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import VideoLibraryRoundedIcon from '@mui/icons-material/VideoLibraryRounded';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';

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
  pink: '#DB2777',
  pinkSoft: '#FDF2F8',
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

const keyframesCSS = `
  @keyframes floaty {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  @keyframes marquee {
    to { transform: translateX(-50%); }
  }
`;

/* ═════════════════════════ FONTS ═════════════════════════ */
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

/* ═════════════════════════ DATA ═════════════════════════ */
const expertises = [
  {
    number: '02',
    title: 'Back-End & API',
    description:
      'Design of business logic, server services and communication interfaces between applications.',
    icon: TerminalRoundedIcon,
    bullets: [
      'REST API with FastAPI',
      'Node.js and Express services',
      'Routes, controllers and services',
      'Authentication and access management',
    ],
    accent: C.cobalt,
    accentSoft: C.cobaltSoft,
  },
  {
    number: '03',
    title: 'Databases',
    description:
      'Design and integration of storage solutions adapted to application needs.',
    icon: StorageRoundedIcon,
    bullets: [
      'Firebase and Cloud Firestore',
      'PostgreSQL and MySQL',
      'CRUD operations and relations',
      'Integration into web applications',
    ],
    accent: C.mustard,
    accentSoft: C.mustardSoft,
  },
  {
    number: '04',
    title: 'Artificial Intelligence',
    description:
      'Integration of AI features into web applications and business solutions.',
    icon: AutoAwesomeRoundedIcon,
    bullets: [
      'AI API integration',
      'Conversational assistants',
      'Text and voice message processing',
      'Speech recognition and generation',
    ],
    accent: C.tomato,
    accentSoft: C.tomatoSoft,
  },
  {
    number: '05',
    title: 'E-commerce',
    description:
      'Design and development of online stores with a focus on the shopping experience.',
    icon: ShoppingBagRoundedIcon,
    bullets: [
      'Stores, collections, categories',
      'Product pages and variants',
      'Cart and checkout process',
      'Customer reviews and payments',
    ],
    accent: C.lime,
    accentSoft: C.limeSoft,
  },
  {
    number: '06',
    title: 'Deployment & DevOps',
    description:
      'Deployment and preparation of applications for use in a real environment.',
    icon: RocketLaunchRoundedIcon,
    bullets: [
      'Project management with Git and GitHub',
      'VPS server deployment',
      'Environment configuration',
      'Maintenance and error resolution',
    ],
    accent: C.cobalt,
    accentSoft: C.cobaltSoft,
  },
  {
    number: '07',
    title: 'Professional websites',
    description:
      'Creation and customization of websites for various industries.',
    icon: LanguageRoundedIcon,
    bullets: [
      'Showcase and institutional websites',
      'Restaurant and hotel websites',
      'Real estate and e-commerce websites',
      'Template customization',
    ],
    accent: C.mustard,
    accentSoft: C.mustardSoft,
  },
  {
    number: '08',
    title: 'Digital marketing',
    description:
      'Design and implementation of digital strategies to grow brand visibility, audience and performance.',
    icon: TrendingUpRoundedIcon,
    bullets: [
      'Digital strategy and social media management',
      'Community management and content creation',
      'Meta Ads, TikTok Ads and sponsored campaigns',
      'Targeting, acquisition and performance analysis',
    ],
    accent: C.tomato,
    accentSoft: C.tomatoSoft,
  },
  {
    number: '09',
    title: 'Content & Creative AI',
    description:
      'Production of digital content and advertising assets assisted by artificial intelligence.',
    icon: VideoLibraryRoundedIcon,
    bullets: [
      'AI-assisted advertising videos',
      'Visuals for social media',
      'Short and promotional formats',
      'Video editing',
    ],
    accent: C.lime,
    accentSoft: C.limeSoft,
  },
];

const techGroups = [
  {
    key: 'front',
    label: 'Front-End',
    items: [
      'HTML5', 'CSS3', 'JavaScript', 'React.js', 'Vite',
      'Bootstrap', 'Tailwind CSS', 'Material UI'
    ],
    accent: C.cobalt,
    accentSoft: C.cobaltSoft,
  },
  {
    key: 'back',
    label: 'Back-End',
    items: [
      'Python', 'Django', 'FastAPI', 'Node.js', 'Express.js',
      'REST API', 'Authentication', 'API Integration'
    ],
    accent: C.tomato,
    accentSoft: C.tomatoSoft,
  },
  {
    key: 'db',
    label: 'Databases',
    items: [
      'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite',
      'Firebase', 'Cloud Firestore'
    ],
    accent: C.mustard,
    accentSoft: C.mustardSoft,
  },
  {
    key: 'firebase',
    label: 'Firebase',
    items: [
      'Firebase Authentication', 'Cloud Firestore',
      'Firebase Storage', 'Firebase Hosting',
      'User Management', 'Firebase Deployment'
    ],
    accent: C.pink,
    accentSoft: C.pinkSoft,
  },
  {
    key: 'infra',
    label: 'Infrastructure & Deployment',
    items: [
      'Linux', 'Terminal & Command Line', 'VPS',
      'Server Configuration', 'Application Deployment',
      'Environment Management', 'Server Maintenance'
    ],
    accent: C.lime,
    accentSoft: C.limeSoft,
  },
  {
    key: 'tools',
    label: 'Tools & Workflow',
    items: [
      'Git', 'GitHub', 'Version Control',
      'Canva', 'CapCut', 'Adobe Express', 'AI Tools'
    ],
    accent: C.mustard,
    accentSoft: C.mustardSoft,
  },
  {
    key: 'marketing',
    label: 'Digital marketing',
    items: [
      'Digital Marketing Strategy',
      'Social Media Management',
      'Editorial Strategy & Content Calendar',
      'Engaging Content Creation',
      'Community Management',
      'Audience Growth',
      'Meta Ads',
      'TikTok Ads & Content Promotion',
      'Audience Targeting & Segmentation',
      'Sponsored Campaign Management',
      'Analytics & KPI',
      'Performance Optimization',
      'Traffic Acquisition',
      'Engagement & Conversion',
      'AI-Assisted Advertising Videos'
    ],
    accent: C.pink,
    accentSoft: C.pinkSoft,
  },
];

const allTechs = techGroups.flatMap((g) => g.items);
const TOTAL_TECHS = allTechs.length;

const codeLines = [
  {
    indent: 0,
    tokens: [
      { text: 'const', color: C.tomato, bold: true },
      { text: ' developer', color: C.ink },
      { text: ' = ', color: C.muted },
      { text: '{', color: C.ink },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: 'name', color: C.cobalt },
      { text: ': ', color: C.muted },
      { text: "'Mory'", color: C.lime },
      { text: ',', color: C.muted },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: 'role', color: C.cobalt },
      { text: ': ', color: C.muted },
      { text: "'Full-Stack'", color: C.lime },
      { text: ',', color: C.muted },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: 'stack', color: C.cobalt },
      { text: ': [', color: C.muted },
      { text: "'React'", color: C.lime },
      { text: ', ', color: C.muted },
      { text: "'FastAPI'", color: C.lime },
      { text: '],', color: C.muted },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: 'ship', color: C.cobalt },
      { text: ': () => ', color: C.muted },
      { text: "'great work'", color: C.lime },
      { text: ',', color: C.muted },
    ],
  },
  {
    indent: 0,
    tokens: [{ text: '};', color: C.ink }],
  },
];

/* ═════════════════════════ COUNT-UP ═════════════════════════ */
function CountUp({ value, suffix = '', duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const reduced = useReducedMotion();
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.floor(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    if (reduced) { setDisplay(value); return; }
    if (inView) {
      animate(motionVal, value, { duration, ease: EASE });
    }
  }, [inView, value, duration, motionVal, reduced]);

  return <span ref={ref}>{reduced ? value : display}{suffix}</span>;
}

/* ═════════════════════════ HERO ═════════════════════════ */
function Hero({ reduced }) {
  return (
    <Box sx={{ position: 'relative', mb: { xs: 8, md: 12 }, pt: { xs: 4, md: 6 } }}>
      {/* Decorative halo */}
      <Box aria-hidden sx={{
        position: 'absolute', top: -60, right: -60,
        width: 400, height: 400,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${C.tomatoSoft} 0%, transparent 70%)`,
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1.1fr .9fr' },
        gap: { xs: 6, md: 5 },
        alignItems: 'center',
        position: 'relative',
      }}>
        {/* LEFT */}
        <Box>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={reduced ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{
                width: 10, height: 10, borderRadius: '50%',
                bgcolor: C.tomato,
                boxShadow: `0 0 0 4px ${C.tomatoSoft}`,
                animation: 'blink 2s ease-in-out infinite',
              }} />
              <Box sx={{ ...monoLabel, color: C.ink }}>02 / Expertise</Box>
            </Box>
          </motion.div>

          {/* XXL editorial title */}
          <Box
            component="h1"
            sx={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 400,
              fontSize: { xs: 56, sm: 76, md: 96, lg: 112 },
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
              color: C.ink,
              mb: 3,
            }}
          >
            <Box component="span" sx={{ display: 'block' }}>
              {['I', 'build', 'for'].map((word, i) => (
                <motion.span
                  key={word}
                  initial={reduced ? false : { opacity: 0, y: 30, filter: 'blur(6px)' }}
                  animate={reduced ? false : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.1 }}
                  style={{ display: 'inline-block', marginRight: '0.22em' }}
                >
                  {word}
                </motion.span>
              ))}
            </Box>

            <Box component="span" sx={{ display: 'block' }}>
              {['the', 'web.'].map((word, i) => (
                <motion.span
                  key={word}
                  initial={reduced ? false : { opacity: 0, y: 30, filter: 'blur(6px)' }}
                  animate={reduced ? false : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.45 + i * 0.12 }}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.22em',
                    fontStyle: 'italic',
                    color: C.tomato,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </Box>
          </Box>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={reduced ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
          >
            <Box sx={{
              fontFamily: FONT_SANS,
              color: C.ink2,
              fontSize: { xs: 15, md: 16.5 },
              lineHeight: 1.75,
              maxWidth: 540,
              mb: 3,
            }}>
              Web development is my main playground. I design and build full-stack web applications — from the React interface all the way to server APIs — with an obsession for quality, performance and user experience.
            </Box>
          </motion.div>

          {/* Techs */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={reduced ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.05 }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {['React', 'FastAPI', 'Material UI', 'Vite', 'Node.js'].map((tech) => (
                <Box
                  key={tech}
                  sx={{
                    px: 1.25, py: 0.6,
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

          {/* Stats */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? false : { opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            <Box sx={{
              display: 'flex',
              gap: 4,
              pt: 3,
              borderTop: `2px solid ${C.ink}`,
              maxWidth: 420,
            }}>
              <Box>
                <Box sx={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 400,
                  fontSize: { xs: 42, md: 52 },
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: C.ink,
                }}>
                  9
                </Box>
                <Box sx={{ ...monoLabel, color: C.ink2, mt: 1, fontSize: 9 }}>
                  Areas<br />of expertise
                </Box>
              </Box>

              <Box sx={{ width: 2, bgcolor: C.ink }} />

              <Box>
                <Box sx={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 400,
                  fontSize: { xs: 42, md: 52 },
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: C.ink,
                }}>
                  {TOTAL_TECHS}
                </Box>
                <Box sx={{ ...monoLabel, color: C.ink2, mt: 1, fontSize: 9 }}>
                  Technologies<br />mastered
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* RIGHT: terminal */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.94, y: 30 }}
          animate={reduced ? false : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
        >
          <Box sx={{
            position: 'relative',
            bgcolor: C.paper,
            border: `2px solid ${C.ink}`,
            boxShadow: `8px 8px 0 ${C.ink}`,
            overflow: 'hidden',
          }}>
            {/* Terminal header */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1.2,
              borderBottom: `2px solid ${C.ink}`,
              bgcolor: C.cream,
            }}>
              <Box sx={{ display: 'flex', gap: 0.6 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: C.tomato, border: `1px solid ${C.ink}` }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: C.mustard, border: `1px solid ${C.ink}` }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: C.lime, border: `1px solid ${C.ink}` }} />
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5, ml: 1.5 }}>
                <Box sx={{
                  px: 1.5, py: 0.5,
                  ...monoLabel,
                  fontSize: 9,
                  color: C.ink,
                  bgcolor: C.paper,
                  border: `1px solid ${C.ink}`,
                }}>
                  developer.js
                </Box>
                <Box sx={{
                  px: 1.5, py: 0.5,
                  ...monoLabel,
                  fontSize: 9,
                  color: C.muted,
                }}>
                  portfolio.tsx
                </Box>
              </Box>
            </Box>

            {/* Code */}
            <Box sx={{
              p: { xs: 2.5, md: 3 },
              fontFamily: FONT_MONO,
              fontSize: { xs: 11.5, sm: 12.5, md: 13 },
              lineHeight: 1.75,
              bgcolor: C.paper,
            }}>
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={reduced ? false : { opacity: 0, x: -16 }}
                  animate={reduced ? false : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 1.2 + i * 0.15 }}
                >
                  <Box sx={{ pl: line.indent * 3, display: 'flex' }}>
                    <Box sx={{
                      color: C.muted,
                      width: 20,
                      userSelect: 'none',
                      fontSize: 10,
                      opacity: 0.6,
                    }}>
                      {i + 1}
                    </Box>
                    <Box component="span">
                      {line.tokens.map((token, j) => (
                        <Box
                          component="span"
                          key={j}
                          sx={{ color: token.color, fontWeight: token.bold ? 700 : 500 }}
                        >
                          {token.text}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              ))}

              <motion.div
                initial={reduced ? false : { opacity: 0 }}
                animate={reduced ? false : { opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.3 }}
                style={{ display: 'flex', marginTop: 4 }}
              >
                <Box sx={{ color: C.muted, width: 20, fontSize: 10, fontFamily: 'inherit', opacity: 0.6 }}>
                  {codeLines.length + 1}
                </Box>
                <Box
                  component={motion.span}
                  animate={reduced ? {} : { opacity: [1, 0, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                  sx={{
                    display: 'inline-block',
                    width: 8,
                    height: 16,
                    bgcolor: C.tomato,
                    ml: 0.5,
                    verticalAlign: 'middle',
                  }}
                />
              </motion.div>
            </Box>

            {/* Terminal footer */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 1,
              bgcolor: C.lime,
              borderTop: `2px solid ${C.ink}`,
              ...monoLabel,
              fontSize: 9,
              color: C.ink,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: C.ink, animation: 'blink 2s ease-in-out infinite' }} />
                Full-Stack
              </Box>
              <span>Ready · 2026</span>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}

/* ═════════════════════════ FEATURED FULL-STACK ═════════════════════════ */
function FullStackFeature({ reduced }) {
  const stackLayers = [
    { label: 'FRONTEND', items: ['React', 'Material UI', 'Vite'], accent: C.tomato, accentSoft: C.tomatoSoft },
    { label: 'BACKEND', items: ['FastAPI', 'Node.js', 'Express'], accent: C.cobalt, accentSoft: C.cobaltSoft },
    { label: 'DATABASE', items: ['PostgreSQL', 'Firebase'], accent: C.mustard, accentSoft: C.mustardSoft },
  ];

  const bullets = [
    'HTML5, CSS3, JavaScript Front-End',
    'Dynamic interfaces React.js + Vite',
    'Design systems with Material UI',
    'Python, FastAPI, Node, Express Back-End',
    'Full-Stack architecture and REST integration',
  ];

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <Box sx={{
        position: 'relative',
        mb: { xs: 4, md: 6 },
        bgcolor: C.paper,
        border: `2px solid ${C.ink}`,
        boxShadow: `8px 8px 0 ${C.tomato}`,
        overflow: 'hidden',
      }}>
        <Box sx={{
          position: 'relative',
          p: { xs: 3.5, md: 5 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' },
          gap: { xs: 4, md: 5 },
          alignItems: 'center',
        }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{
                width: 56, height: 56,
                bgcolor: C.tomato,
                border: `2px solid ${C.ink}`,
                display: 'grid', placeItems: 'center',
                color: '#fff',
              }}>
                <CodeRoundedIcon sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Box sx={{ ...monoLabel, color: C.tomato, fontSize: 9 }}>Featured · 01</Box>
                <Box sx={{ ...monoLabel, color: C.ink2, fontSize: 9, mt: 0.25 }}>Core expertise</Box>
              </Box>
            </Box>

            <Box
              component="h3"
              sx={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 400,
                fontSize: { xs: 36, md: 52 },
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: C.ink,
                mb: 2.5,
              }}
            >
              Full-Stack
              <br />
              <Box component="span" sx={{ fontStyle: 'italic', color: C.tomato }}>
                Web Development
              </Box>
            </Box>

            <Box sx={{
              fontFamily: FONT_SANS,
              color: C.ink2,
              fontSize: 14.5,
              lineHeight: 1.7,
              mb: 3,
              maxWidth: 520,
            }}>
              Design, development and integration of modern web applications — from user interface design to server-side feature implementation.
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {bullets.map((bullet, i) => (
                <motion.div
                  key={i}
                  initial={reduced ? false : { opacity: 0, x: -12 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.08 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 6, height: 6, bgcolor: C.tomato }} />
                    <Box sx={{ fontFamily: FONT_SANS, fontSize: 13.5, color: C.ink2, fontWeight: 500 }}>
                      {bullet}
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>

          {/* Stack layers */}
          <Box sx={{ position: 'relative', minHeight: { xs: 340, md: 420 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mb: 3 }}>
              <LayersRoundedIcon sx={{ color: C.tomato, fontSize: 18 }} />
              <Box sx={{ ...monoLabel, color: C.tomato }}>Stack layering</Box>
            </Box>

            {stackLayers.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={reduced ? false : { opacity: 0, y: 30, rotateX: -30 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                animate={reduced ? {} : { y: [0, -4, 0] }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.5 + i * 0.15 },
                  y: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
                }}
                style={{ transform: `translateY(${i * -12}px)`, transformStyle: 'preserve-3d' }}
              >
                <Box
                  sx={{
                    mt: i > 0 ? 1.5 : 0,
                    p: 2.5,
                    bgcolor: C.paper,
                    border: `2px solid ${C.ink}`,
                    boxShadow: `4px 4px 0 ${C.ink}`,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all .3s ease',
                    '&:hover': {
                      transform: 'translate(-2px, -2px)',
                      boxShadow: `6px 6px 0 ${C.ink}`,
                    },
                  }}
                >
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', bgcolor: layer.accent }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, bgcolor: layer.accent }} />
                      <Box sx={{ ...monoLabel, color: C.ink, fontSize: 9 }}>{layer.label}</Box>
                    </Box>
                    <Box sx={{ ...monoLabel, fontSize: 8, color: C.muted }}>0{i + 1}</Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {layer.items.map((item) => (
                      <Box key={item} sx={{
                        px: 1, py: 0.4,
                        bgcolor: layer.accentSoft,
                        border: `1px solid ${C.ink}`,
                        fontFamily: FONT_MONO,
                        fontSize: 9.5,
                        fontWeight: 600,
                        color: C.ink,
                      }}>
                        {item}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

/* ═════════════════════════ EXPERTISE CARD ═════════════════════════ */
function ExpertiseCard({ expertise, index, reduced }) {
  const cardRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 22 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['3deg', '-3deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-3deg', '3deg']);

  const { number, title, description, bullets, icon: Icon, accent, accentSoft } = expertise;

  const onMove = (e) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.06 }}
      style={{ height: '100%', perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{
          height: '100%',
          transformStyle: 'preserve-3d',
          ...(reduced ? {} : { rotateX, rotateY }),
        }}
      >
        <Box
          sx={{
            p: { xs: 2.5, md: 3 },
            height: '100%',
            bgcolor: C.paper,
            border: `2px solid ${C.ink}`,
            boxShadow: `4px 4px 0 ${C.ink}`,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all .3s cubic-bezier(.2,.9,.3,1)',
            '&:hover': {
              transform: 'translate(-3px, -3px)',
              boxShadow: `7px 7px 0 ${C.ink}`,
              '& .expertise-icon': {
                bgcolor: accent,
                color: '#FFFFFF',
                transform: 'rotate(-6deg) scale(1.05)',
              },
              '& .expertise-number': { color: accent },
            },
          }}
        >
          {/* Header: icon + number */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              className="expertise-icon"
              sx={{
                width: 44, height: 44,
                bgcolor: accentSoft,
                border: `1.5px solid ${C.ink}`,
                color: accent,
                display: 'grid', placeItems: 'center',
                transition: 'all .3s cubic-bezier(.2,.9,.3,1)',
              }}
            >
              <Icon sx={{ fontSize: 22 }} />
            </Box>
            <Box
              className="expertise-number"
              sx={{
                ...monoLabel,
                fontSize: 11,
                color: C.muted,
                transition: 'color .3s ease',
              }}
            >
              {number}
            </Box>
          </Box>

          {/* Title */}
          <Box
            component="h4"
            sx={{
              fontFamily: FONT_SANS,
              fontSize: { xs: 20, md: 21 },
              fontWeight: 700,
              letterSpacing: '-0.015em',
              lineHeight: 1.2,
              color: C.ink,
              mb: 1.5,
            }}
          >
            {title}
          </Box>

          {/* Description */}
          <Box sx={{
            fontFamily: FONT_SANS,
            color: C.ink2,
            fontSize: 13.5,
            lineHeight: 1.65,
            mb: 2.5,
          }}>
            {description}
          </Box>

          {/* Bullets */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.85 }}>
            {bullets.slice(0, 3).map((bullet, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                <Box sx={{ width: 5, height: 5, bgcolor: accent, mt: '7px', flexShrink: 0 }} />
                <Box sx={{
                  fontFamily: FONT_SANS,
                  fontSize: 12.5,
                  color: C.muted,
                  lineHeight: 1.55,
                }}>
                  {bullet}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </motion.div>
    </motion.div>
  );
}

/* ═════════════════════════ TECH STACK ═════════════════════════ */
function TechStackSection({ reduced }) {
  const [active, setActive] = useState(techGroups[0].key);
  const current = techGroups.find((g) => g.key === active);

  return (
    <Box sx={{ mt: { xs: 10, md: 14 } }}>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'flex-end' },
        gap: 2,
        mb: 5,
      }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Box sx={{ width: 8, height: 8, bgcolor: C.cobalt }} />
            <Box sx={{ ...monoLabel, color: C.ink }}>Skills & technologies</Box>
          </Box>
          <Box
            component="h2"
            sx={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 400,
              fontSize: { xs: 40, sm: 52, md: 68 },
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              color: C.ink,
            }}
          >
            My skills
            <Box component="span" sx={{ fontStyle: 'italic', color: C.tomato }}>.</Box>
          </Box>
        </Box>
        <Box sx={{
          fontFamily: FONT_SANS,
          color: C.ink2,
          fontSize: 13.5,
          maxWidth: 320,
          lineHeight: 1.7,
        }}>
          A set of technical and marketing skills to design applications, deploy solutions and grow brands' digital presence.
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4, pb: 1 }}>
        {techGroups.map((group) => {
          const isActive = group.key === active;
          return (
            <Box
              key={group.key}
              component={motion.button}
              onClick={() => setActive(group.key)}
              whileHover={reduced ? {} : { y: -2 }}
              whileTap={{ scale: 0.97 }}
              sx={{
                position: 'relative',
                px: 2,
                py: 1,
                border: `1.5px solid ${isActive ? C.ink : C.hair}`,
                bgcolor: isActive ? C.ink : C.paper,
                color: isActive ? C.lime : C.ink2,
                fontFamily: FONT_MONO,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all .2s ease',
                boxShadow: isActive ? `3px 3px 0 ${C.lime}` : 'none',
                '&:hover': {
                  borderColor: C.ink,
                  color: isActive ? C.lime : C.ink,
                },
              }}
            >
              {group.label}
            </Box>
          );
        })}
      </Box>

      {/* Content */}
      <Box sx={{
        p: { xs: 3, md: 4 },
        bgcolor: C.paper,
        border: `2px solid ${C.ink}`,
        boxShadow: `4px 4px 0 ${C.ink}`,
        minHeight: 180,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 4,
          height: '100%',
          bgcolor: current.accent,
        }} />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{ width: 10, height: 10, bgcolor: current.accent }} />
              <Box sx={{ ...monoLabel, color: C.ink }}>{current.label}</Box>
              <Box sx={{ ...monoLabel, fontSize: 9, color: C.muted }}>
                · {current.items.length} technologies
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {current.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: EASE, delay: i * 0.04 }}
                >
                  <Box sx={{
                    px: 1.5,
                    py: 0.9,
                    bgcolor: current.accentSoft,
                    border: `1.5px solid ${C.ink}`,
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    fontWeight: 600,
                    color: C.ink,
                    transition: 'all .2s ease',
                    '&:hover': {
                      bgcolor: current.accent,
                      color: '#FFFFFF',
                      transform: 'translate(-2px, -2px)',
                      boxShadow: `3px 3px 0 ${C.ink}`,
                    },
                  }}>
                    {item}
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}

/* ═════════════════════════ MARQUEE ═════════════════════════ */
function Marquee({ reduced }) {
  const content = [...allTechs, ...allTechs, ...allTechs];

  return (
    <Box sx={{
      mt: { xs: 10, md: 14 },
      py: 2.5,
      bgcolor: C.ink,
      overflow: 'hidden',
      borderTop: `2px solid ${C.ink}`,
      borderBottom: `2px solid ${C.ink}`,
    }}>
      <motion.div
        animate={reduced ? {} : { x: ['0%', '-33.33%'] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 32, whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {content.map((tech, i) => (
          <Box
            key={i}
            component="span"
            sx={{
              ...monoLabel,
              fontSize: 14,
              color: i % 3 === 0 ? C.lime : 'transparent',
              WebkitTextStroke: i % 3 === 0 ? 'none' : `1px ${C.lime}40`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            {tech}
            <Box component="span" sx={{ color: C.tomato, WebkitTextStroke: 0, fontSize: 18 }}>
              ✦
            </Box>
          </Box>
        ))}
      </motion.div>
    </Box>
  );
}

/* ═════════════════════════ PAGE ═════════════════════════ */
export default function Expertise() {
  useFonts();
  const reduced = useReducedMotion();

  return (
    <Box sx={{
      position: 'relative',
      overflow: 'hidden',
      bgcolor: C.cream,
      minHeight: '100vh',
      color: C.ink,
      fontFamily: FONT_SANS,
    }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, py: { xs: 8, md: 12 } }}>
        <Box sx={{ maxWidth: 1240, mx: 'auto' }}>
          <Hero reduced={reduced} />
          <FullStackFeature reduced={reduced} />

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 2.5, md: 3 },
          }}>
            {expertises.map((exp, i) => (
              <ExpertiseCard key={exp.number} expertise={exp} index={i} reduced={reduced} />
            ))}
          </Box>

          <TechStackSection reduced={reduced} />
        </Box>
      </Container>
      <Marquee reduced={reduced} />
    </Box>
  );
}
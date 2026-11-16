import { useState, useEffect, useRef } from 'react';
import { Box, Container } from '@mui/material';
import PageShell from './PageShell';
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

const keyframesCSS = `
  @keyframes floaty {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  @keyframes drawLine {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
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

/* ═════════════════════════ REVEAL ═════════════════════════ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function RevealBlock({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <Box ref={ref} sx={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity .7s ease ${delay}s, transform .7s cubic-bezier(.2,.9,.3,1) ${delay}s`,
    }}>
      {children}
    </Box>
  );
}

/* ═════════════════════════ PORTRAIT — editorial circle ═════════════════════════ */
function Portrait({ name }) {
  const initials = (name || 'M T').split(' ').map((w) => w[0]).slice(0, 2).join('');
  const [imgError, setImgError] = useState(false);
  const photo = profile?.photo || '/images/profile.jpg';

  return (
    <Box sx={{ position: 'relative', width: { xs: 240, md: 280 }, height: { xs: 240, md: 280 }, mx: 'auto' }}>
      {/* Rotating tomato dashed circle */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: -16,
          borderRadius: '50%',
          border: `1.5px dashed ${C.tomato}`,
          animation: 'spin 30s linear infinite',
        }}
      />

      {/* Lime soft halo */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: -30,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.limeSoft} 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* Image with ink border + offset shadow */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: C.paper,
          border: `2px solid ${C.ink}`,
          boxShadow: `8px 8px 0 ${C.ink}`,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {!imgError ? (
          <Box
            component="img"
            src={photo}
            alt={name}
            onError={() => setImgError(true)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box
            sx={{
              fontFamily: FONT_DISPLAY,
              fontStyle: 'italic',
              fontSize: { xs: 80, md: 100 },
              color: C.tomato,
              lineHeight: 1,
            }}
          >
            {initials}
          </Box>
        )}
      </Box>

      {/* Floating badges */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          right: -20,
          px: 1.5,
          py: 0.75,
          bgcolor: C.lime,
          border: `1.5px solid ${C.ink}`,
          boxShadow: `3px 3px 0 ${C.ink}`,
          transform: 'rotate(-4deg)',
          animation: 'floaty 4s ease-in-out infinite',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: C.ink, animation: 'blink 2s ease-in-out infinite' }} />
          <Box sx={{ ...monoLabel, fontSize: 8.5, color: C.ink }}>Available</Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: -24,
          px: 1.25,
          py: 0.5,
          bgcolor: C.paper,
          border: `1.5px solid ${C.ink}`,
          transform: 'rotate(3deg)',
        }}
      >
        <Box sx={{ ...monoLabel, fontSize: 8, color: C.ink }}>Bamako · ML</Box>
      </Box>
    </Box>
  );
}

/* ═════════════════════════ TIMELINE ═════════════════════════ */
const journey = [
  { year: '2020 — 2024', title: 'Bachelor of Computer Applications (BCA)', org: 'Ray Integrated Degree College · Bangalore, India', color: C.tomato },
  { year: '2024', title: 'Full-Stack Web Development Certification', org: 'Kenpro Learning · India · 9 months', color: C.cobalt },
  { year: '2025', title: 'Full-Stack Web Developer', org: 'Experco International · Currently employed', color: C.lime },
  { year: '2025', title: 'Computer Maintenance Certificate', org: 'CRO-Mali · Bamako · 3 months', color: C.mustard },
];

function JourneyTimeline() {
  const [ref, visible] = useReveal(0.1);
  return (
    <Box ref={ref} sx={{ mt: 7 }} translate="yes">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <Box sx={{ width: 8, height: 8, bgcolor: C.tomato }} />
        <Box sx={{ ...monoLabel, color: C.ink }}>My journey</Box>
      </Box>

      <Box sx={{ position: 'relative', pl: { xs: 4, md: 5 } }}>
        {/* Vertical line */}
        <Box sx={{
          position: 'absolute',
          left: { xs: 6, md: 8 },
          top: 8,
          bottom: 8,
          width: 2,
          bgcolor: C.ink,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease .2s',
        }} />

        {journey.map((j, i) => (
          <Box
            key={`journey-${i}`}
            sx={{
              position: 'relative',
              mb: i === journey.length - 1 ? 0 : 4,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-14px)',
              transition: `all .6s cubic-bezier(.2,.9,.3,1) ${0.2 + i * 0.12}s`,
            }}
          >
            {/* Colored dot */}
            <Box sx={{
              position: 'absolute',
              left: { xs: -34, md: -40 },
              top: 4,
              width: 14,
              height: 14,
              borderRadius: '50%',
              bgcolor: j.color,
              border: `2px solid ${C.ink}`,
            }} />

            {/* Year in mono */}
            <Box sx={{
              display: 'inline-block',
              px: 1.25,
              py: 0.4,
              bgcolor: j.color,
              border: `1.5px solid ${C.ink}`,
              mb: 1,
            }}>
              <Box sx={{ ...monoLabel, fontSize: 9, color: C.ink }}>{j.year}</Box>
            </Box>

            <Box
              sx={{
                p: 2,
                bgcolor: C.paper,
                border: `1.5px solid ${C.ink}`,
                boxShadow: `3px 3px 0 ${C.ink}`,
                transition: 'all .2s ease',
                '&:hover': {
                  transform: 'translate(-2px, -2px)',
                  boxShadow: `5px 5px 0 ${C.ink}`,
                },
              }}
            >
              <Box sx={{
                fontFamily: FONT_SANS,
                fontSize: 16,
                fontWeight: 700,
                color: C.ink,
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
              }}>
                {j.title}
              </Box>
              <Box sx={{
                fontFamily: FONT_SANS,
                fontSize: 13,
                color: C.ink2,
                mt: 0.5,
              }}>
                {j.org}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ═════════════════════════ EDUCATION ═════════════════════════ */
const education = [
  {
    title: 'Bachelor of Computer Applications',
    subtitle: 'BCA',
    org: 'Ray Integrated Degree College — Bangalore, India',
    period: '2020 – 2024',
    color: C.tomato,
    icon: '🎓',
  },
  {
    title: 'Full-Stack Web Development Certification',
    subtitle: 'Professional training',
    org: 'Kenpro Learning — India',
    period: '2024 · 9 months',
    color: C.cobalt,
    icon: '⚡',
  },
  {
    title: 'Computer Maintenance Certificate',
    subtitle: 'Computer Maintenance Certificate',
    org: 'CRO-Mali — Bamako',
    period: '2025 · 3 months',
    color: C.lime,
    icon: '🛠️',
  },
];

function EducationCards() {
  const [ref, visible] = useReveal();
  return (
    <Box ref={ref} sx={{ mt: 7 }} translate="yes">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <Box sx={{ width: 8, height: 8, bgcolor: C.mustard }} />
        <Box sx={{ ...monoLabel, color: C.ink }}>Education</Box>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 2.5,
      }}>
        {education.map((e, i) => (
          <Box
            key={`edu-${i}`}
            sx={{
              p: 2.5,
              bgcolor: C.paper,
              border: `2px solid ${C.ink}`,
              boxShadow: `4px 4px 0 ${C.ink}`,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all .6s cubic-bezier(.2,.9,.3,1) ${0.1 + i * 0.12}s`,
              '&:hover': {
                transform: 'translate(-3px, -3px)',
                boxShadow: `7px 7px 0 ${C.ink}`,
              },
            }}
          >
            {/* Icon */}
            <Box sx={{
              width: 48,
              height: 48,
              display: 'grid',
              placeItems: 'center',
              bgcolor: e.color,
              border: `1.5px solid ${C.ink}`,
              fontSize: 22,
              mb: 2,
            }}>
              {e.icon}
            </Box>

            {/* Period */}
            <Box sx={{
              display: 'inline-block',
              px: 1,
              py: 0.3,
              bgcolor: C.cream,
              border: `1px solid ${C.ink}`,
              mb: 1.5,
            }}>
              <Box sx={{ ...monoLabel, fontSize: 8.5, color: C.ink }}>{e.period}</Box>
            </Box>

            {/* Title */}
            <Box sx={{
              fontFamily: FONT_SANS,
              fontSize: 15,
              fontWeight: 700,
              color: C.ink,
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
            }}>
              {e.title}
            </Box>

            {/* Subtitle */}
            <Box sx={{
              fontFamily: FONT_DISPLAY,
              fontStyle: 'italic',
              fontSize: 14,
              color: C.ink2,
              mt: 0.5,
            }}>
              {e.subtitle}
            </Box>

            {/* Organization */}
            <Box sx={{
              fontFamily: FONT_SANS,
              fontSize: 12.5,
              color: C.muted,
              mt: 1,
              lineHeight: 1.5,
            }}>
              {e.org}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ═════════════════════════ LANGUAGES ═════════════════════════ */
function LanguagesCard() {
  const [ref, visible] = useReveal();
  const langs = [
    { label: 'French', pct: 100, color: C.tomato, level: 'Fluent' },
    { label: 'English', pct: 100, color: C.cobalt, level: 'Fluent' },
    { label: 'Bambara', pct: 100, color: C.lime, level: 'Fluent' },
  ];
  return (
    <Box
      ref={ref}
      translate="yes"
      sx={{
        mt: 5,
        p: { xs: 3, md: 4 },
        bgcolor: C.paper,
        border: `2px solid ${C.ink}`,
        boxShadow: `4px 4px 0 ${C.ink}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all .8s cubic-bezier(.2,.9,.3,1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: C.cobalt }} />
          <Box sx={{ ...monoLabel, color: C.ink }}>Languages</Box>
        </Box>
        <Box sx={{
          px: 1.25,
          py: 0.4,
          bgcolor: C.mustardSoft,
          border: `1.5px solid ${C.ink}`,
        }}>
          <Box sx={{ ...monoLabel, fontSize: 8.5, color: C.ink }}>
            Studied in English
          </Box>
        </Box>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
        gap: 3,
      }}>
        {langs.map((l, i) => (
          <Box key={`lang-${i}`}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
              <Box sx={{
                fontFamily: FONT_SANS,
                fontSize: 15,
                fontWeight: 700,
                color: C.ink,
              }}>
                {l.label}
              </Box>
              <Box sx={{
                ...monoLabel,
                fontSize: 9,
                color: C.ink2,
              }}>
                {l.level}
              </Box>
            </Box>
            <Box sx={{
              height: 8,
              bgcolor: C.cream,
              border: `1.5px solid ${C.ink}`,
              overflow: 'hidden',
              position: 'relative',
            }}>
              <Box sx={{
                height: '100%',
                width: visible ? `${l.pct}%` : '0%',
                bgcolor: l.color,
                transition: `width 1.1s cubic-bezier(.2,.9,.3,1) ${0.3 + i * 0.12}s`,
              }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ═════════════════════════ PAGE ═════════════════════════ */
export default function About() {
  useFonts();
  const [refHero, heroVisible] = useReveal(0.1);
  const name = profile?.name || 'Mory Tounkara';
  const location = profile?.location || 'Mali';

  return (
    <PageShell
      eyebrow="01 / ABOUT"
      title="The person behind the code."
      description="Who I am, where I come from, and what drives me to build digital products."
    >
      <Container maxWidth="md" disableGutters>
        {/* ═══ HERO ═══ */}
        <Box
          ref={refHero}
          translate="yes"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
            gap: { xs: 5, md: 6 },
            alignItems: 'center',
            mb: 8,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all .9s cubic-bezier(.2,.9,.3,1)',
          }}
        >
          <Portrait name={name} />

          <Box>
            {/* Kicker */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: C.tomato }} />
              <Box sx={{ ...monoLabel, color: C.ink }}>Full-Stack Developer</Box>
            </Box>

            {/* Title */}
            <Box
              component="h2"
              sx={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 400,
                fontSize: { xs: 36, md: 48 },
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: C.ink,
                mb: 2.5,
              }}
            >
              I'm{' '}
              <Box
                component="span"
                sx={{
                  fontStyle: 'italic',
                  color: C.tomato,
                }}
              >
                {name}
              </Box>
              .
            </Box>

            {/* Paragraph 1 */}
            <Box sx={{
              fontFamily: FONT_SANS,
              color: C.ink2,
              fontSize: { xs: 15, md: 16 },
              lineHeight: 1.75,
              mb: 2,
            }}>
              Holder of a{' '}
              <Box component="strong" sx={{ color: C.ink, fontWeight: 700 }}>
                Bachelor's degree in Computer Applications (BCA)
              </Box>
              , earned at Ray Integrated Degree College, India. Passionate about software development and emerging technologies, I design modern web applications, digital platforms, and solutions that address real-world needs.
            </Box>

            {/* Paragraph 2 */}
            <Box sx={{
              fontFamily: FONT_SANS,
              color: C.ink2,
              fontSize: 14.5,
              lineHeight: 1.7,
              mb: 3,
            }}>
              Based in {location}, I enjoy exploring new technologies, learning continuously, and turning ideas into functional solutions.
            </Box>

            {/* Tags */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {['Full-Stack', 'Artificial Intelligence', 'Digital Products'].map((tag, i) => (
                <Box
                  key={tag}
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    bgcolor: [C.tomatoSoft, C.cobaltSoft, C.limeSoft][i],
                    border: `1.5px solid ${C.ink}`,
                    fontFamily: FONT_MONO,
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: C.ink,
                    textTransform: 'uppercase',
                    transition: 'all .2s ease',
                    '&:hover': {
                      transform: 'translate(-2px, -2px)',
                      boxShadow: `3px 3px 0 ${C.ink}`,
                    },
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ═══ MY JOURNEY ═══ */}
        <RevealBlock delay={0.05}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: C.tomato }} />
              <Box sx={{ ...monoLabel, color: C.ink }}>My journey</Box>
            </Box>
            <Box
              component="h3"
              sx={{
                fontFamily: FONT_DISPLAY,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: { xs: 30, md: 38 },
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: C.ink,
                mb: 2.5,
              }}
            >
              A versatile path.
            </Box>
            <Box sx={{
              fontFamily: FONT_SANS,
              color: C.ink2,
              fontSize: 15.5,
              lineHeight: 1.85,
            }}>
              My journey has allowed me to develop a versatile approach to software development, working across user interfaces as well as server logic, databases, and external service integrations.
            </Box>
          </Box>
        </RevealBlock>

        {/* ═══ TODAY ═══ */}
        <RevealBlock delay={0.15}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: C.cobalt }} />
              <Box sx={{ ...monoLabel, color: C.ink }}>Today</Box>
            </Box>
            <Box
              component="h3"
              sx={{
                fontFamily: FONT_DISPLAY,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: { xs: 30, md: 38 },
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: C.ink,
                mb: 2.5,
              }}
            >
              What I'm working on.
            </Box>
            <Box sx={{
              fontFamily: FONT_SANS,
              color: C.ink2,
              fontSize: 15.5,
              lineHeight: 1.85,
            }}>
              I've gained professional experience at{' '}
              <Box component="strong" sx={{ color: C.ink, fontWeight: 700 }}>
                Experco International
              </Box>
              , where I contribute to the development of web solutions. In parallel, I design my own projects, notably{' '}
              <Box component="strong" sx={{ color: C.ink, fontWeight: 700 }}>
                Brain
              </Box>
              , an AI-powered solution, and{' '}
              <Box component="strong" sx={{ color: C.ink, fontWeight: 700 }}>
                HOPE
              </Box>
              , an e-commerce store specializing in innovative travel gadgets.
            </Box>
            <Box sx={{
              fontFamily: FONT_SANS,
              color: C.ink2,
              fontSize: 15.5,
              lineHeight: 1.85,
              mt: 1.5,
            }}>
              I'm also interested in artificial intelligence, automation, digital marketing, and digital product creation.
            </Box>
          </Box>
        </RevealBlock>

        {/* ═══ TIMELINE ═══ */}
        <JourneyTimeline />

        {/* ═══ VISION ═══ */}
        <RevealBlock delay={0.1}>
          <Box
            sx={{
              mt: 7,
              p: { xs: 3, md: 5 },
              bgcolor: C.ink,
              color: C.cream,
              border: `2px solid ${C.ink}`,
              boxShadow: `8px 8px 0 ${C.tomato}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative shape */}
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

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: C.lime, animation: 'blink 2s ease-in-out infinite' }} />
                <Box sx={{ ...monoLabel, color: C.lime }}>My vision</Box>
              </Box>

              <Box
                component="blockquote"
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: { xs: 24, md: 32 },
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  color: C.cream,
                  m: 0,
                  mb: 3,
                }}
              >
                "I see software development as a way to solve problems, simplify processes, and create new possibilities."
              </Box>

              <Box sx={{
                fontFamily: FONT_SANS,
                color: 'rgba(250,247,242,.7)',
                fontSize: 14.5,
                lineHeight: 1.7,
                maxWidth: 640,
              }}>
                My ambition is to contribute to the creation of innovative, useful, and scalable digital products, while continuing to develop my skills and experience through ambitious projects.
              </Box>
            </Box>
          </Box>
        </RevealBlock>

        {/* ═══ EDUCATION ═══ */}
        <EducationCards />

        {/* ═══ LANGUAGES ═══ */}
        <LanguagesCard />

        {/* ═══ FOOTER ═══ */}
        <Box
          sx={{
            mt: 6,
            py: 4,
            borderTop: `2px solid ${C.ink}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ ...monoLabel, color: C.muted }}>
            The rest is written project after project.
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, bgcolor: C.tomato }} />
            <Box sx={{ width: 8, height: 8, bgcolor: C.mustard }} />
            <Box sx={{ width: 8, height: 8, bgcolor: C.lime }} />
            <Box sx={{ width: 8, height: 8, bgcolor: C.cobalt }} />
          </Box>
        </Box>
      </Container>
    </PageShell>
  );
}
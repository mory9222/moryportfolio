import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import PageShell from './PageShell';

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

const keyframesCSS = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
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

/* ═════════════════════════ SVG ILLUSTRATIONS ═════════════════════════ */
function Illustration({ name, color, size = 64 }) {
  const common = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none' };
  const stroke = { stroke: color, strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' };

  if (name === 'code') {
    return (
      <svg {...common}>
        <rect x="6" y="10" width="52" height="42" rx="4" {...stroke} />
        <path d="M6 20h52" {...stroke} />
        <circle cx="14" cy="15" r="1.6" fill={color} />
        <circle cx="20" cy="15" r="1.6" fill={color} />
        <polyline points="24,32 18,38 24,44" {...stroke} />
        <polyline points="40,32 46,38 40,44" {...stroke} />
        <line x1="34" y1="30" x2="30" y2="46" {...stroke} />
      </svg>
    );
  }
  if (name === 'sprout') {
    return (
      <svg {...common}>
        <path d="M32 54V30" {...stroke} />
        <path d="M32 38c-8 0-14-6-14-14 8 0 14 6 14 14z" {...stroke} />
        <path d="M32 32c0-8 6-14 14-14 0 8-6 14-14 14z" {...stroke} />
        <path d="M22 54h20" {...stroke} />
      </svg>
    );
  }
  if (name === 'brain') {
    return (
      <svg {...common}>
        <path d="M24 12c-6 0-10 5-10 11 0 2-2 3-2 6 0 3 2 4 2 6 0 6 4 11 10 11 2 0 4-1 4-3V15c0-2-2-3-4-3z" {...stroke} />
        <path d="M40 12c6 0 10 5 10 11 0 2 2 3 2 6 0 3-2 4-2 6 0 6-4 11-10 11-2 0-4-1-4-3V15c0-2 2-3 4-3z" {...stroke} />
        <circle cx="32" cy="22" r="2" fill={color} />
        <circle cx="32" cy="32" r="2" fill={color} />
        <circle cx="32" cy="42" r="2" fill={color} />
      </svg>
    );
  }
  if (name === 'cart') {
    return (
      <svg {...common}>
        <path d="M8 10h6l5 26h26l5-18H20" {...stroke} />
        <circle cx="24" cy="48" r="3" {...stroke} />
        <circle cx="44" cy="48" r="3" {...stroke} />
        <path d="M28 24h12M28 32h10" {...stroke} />
      </svg>
    );
  }
  return null;
}

/* ═════════════════════════ DATA ═════════════════════════ */
const experiences = [
  {
    id: 'experco-full',
    type: 'work',
    period: 'Oct. 2025 — Present',
    role: 'Full-Stack Web Developer',
    company: 'Experco International',
    tagline: 'Business applications & professional web platforms.',
    accent: C.tomato,
    accentSoft: C.tomatoSoft,
    illustration: 'code',
    missions: [
      'Design and development of professional web applications.',
      'User interfaces with React.js & JavaScript.',
      'Front-End and Back-End features based on project needs.',
      'API integration and communication between application layers.',
      'Design and improvement of business digital solutions.',
    ],
    skills: [
      { label: 'React.js', level: 90 },
      { label: 'JavaScript', level: 88 },
      { label: 'REST API', level: 85 },
      { label: 'Front-End', level: 90 },
      { label: 'Back-End', level: 78 },
      { label: 'UX / UI', level: 80 },
    ],
    projects: [
      { name: 'SGGDAS', desc: 'Secure Administrative Document Management and Generation System.', tags: ['React', 'API', 'UX'] },
      { name: 'Waybills', desc: 'Complete waybill management application.', tags: ['Front-End', 'Back-End', 'API'] },
    ],
  },
  {
    id: 'experco-stage',
    type: 'work',
    period: 'Apr. 2025 — Sept. 2025',
    role: 'Full-Stack Web Developer Intern',
    company: 'Experco International',
    tagline: 'First steps in a professional environment.',
    accent: C.cobalt,
    accentSoft: C.cobaltSoft,
    illustration: 'sprout',
    missions: [
      'Participation in web development activities.',
      'Hands-on Front-End and Back-End practice.',
      'Contribution to the development of application features.',
      'Familiarization with team work methods.',
    ],
    skills: [
      { label: 'JavaScript', level: 75 },
      { label: 'HTML / CSS', level: 85 },
      { label: 'Teamwork', level: 82 },
      { label: 'Git', level: 70 },
    ],
    projects: [],
  },
  {
    id: 'brain',
    type: 'personal',
    period: 'Personal project',
    role: 'Full-Stack Developer & Creator',
    company: 'BRAIN — AI Assistant',
    tagline: 'A conversational, text and voice AI on WhatsApp.',
    accent: C.cobalt,
    accentSoft: C.cobaltSoft,
    illustration: 'brain',
    missions: [
      'Design of a digital solution integrating AI.',
      'Front-End React.js, Back-End Python & FastAPI.',
      'Integration of artificial intelligence services.',
      'WhatsApp interaction: text and voice messages.',
      'Generation of text and voice responses.',
    ],
    skills: [
      { label: 'Python', level: 85 },
      { label: 'FastAPI', level: 82 },
      { label: 'AI / LLM', level: 78 },
      { label: 'React.js', level: 88 },
      { label: 'WhatsApp API', level: 75 },
    ],
    projects: [
      { name: 'Live demo', desc: 'brainia-ai.web.app', tags: ['React', 'FastAPI', 'AI'], link: 'https://brainia-ai.web.app' },
    ],
  },
  {
    id: 'hope',
    type: 'personal',
    period: 'Personal project',
    role: 'Full-Stack Developer & Creator',
    company: 'HOPE — Travel e-commerce',
    tagline: 'Store for innovative travel gadgets.',
    accent: C.lime,
    accentSoft: C.limeSoft,
    illustration: 'cart',
    missions: [
      'React.js interface, Vite & Material UI.',
      'Firebase & Firestore integration.',
      'Collections, categories and product variants.',
      'Customer reviews and ratings.',
      'Cart and checkout flow.',
    ],
    skills: [
      { label: 'React + Vite', level: 88 },
      { label: 'Material UI', level: 85 },
      { label: 'Firebase', level: 80 },
      { label: 'E-commerce', level: 82 },
      { label: 'Firestore', level: 78 },
    ],
    projects: [
      { name: 'Status', desc: 'Project currently being deployed.', tags: ['React', 'Firebase', 'MUI'] },
    ],
  },
];

/* ═════════════════════════ REVEAL ═════════════════════════ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ═════════════════════════ SKILL BAR ═════════════════════════ */
function SkillBar({ label, level, accent, visible, delay }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.75 }}>
        <Box sx={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: C.ink }}>
          {label}
        </Box>
        <Box sx={{ ...monoLabel, fontSize: 9, color: accent }}>
          {level}%
        </Box>
      </Box>
      <Box sx={{
        height: 6,
        bgcolor: C.cream,
        border: `1px solid ${C.ink}`,
        overflow: 'hidden',
      }}>
        <Box sx={{
          height: '100%',
          width: visible ? `${level}%` : '0%',
          bgcolor: accent,
          transition: `width 1.1s cubic-bezier(.2,.9,.3,1) ${delay}s`,
        }} />
      </Box>
    </Box>
  );
}

/* ═════════════════════════ EXPERIENCE CARD ═════════════════════════ */
function ExperienceCard({ item, index }) {
  const [ref, visible] = useReveal();
  const [hover, setHover] = useState(false);
  const isPersonal = item.type === 'personal';
  const number = String(index + 1).padStart(2, '0');

  return (
    <Box
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '260px 1fr' },
        gap: { xs: 3, md: 4 },
        mb: 6,
        p: { xs: 2.5, md: 4 },
        bgcolor: C.paper,
        border: `2px solid ${C.ink}`,
        boxShadow: hover ? `8px 8px 0 ${C.ink}` : `4px 4px 0 ${C.ink}`,
        opacity: visible ? 1 : 0,
        transform: visible
          ? hover ? 'translate(-4px, -4px)' : 'translate(0, 0)'
          : 'translateY(40px)',
        transition: `opacity .7s ease ${index * 0.08}s, transform .3s cubic-bezier(.2,.9,.3,1), box-shadow .3s ease`,
        overflow: 'hidden',
      }}
    >
      {/* Decorative watermark illustration */}
      <Box aria-hidden sx={{
        position: 'absolute',
        right: -20,
        bottom: -20,
        opacity: 0.06,
        pointerEvents: 'none',
      }}>
        <Illustration name={item.illustration} color={item.accent} size={200} />
      </Box>

      {/* Left column */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Serif number */}
        <Box sx={{
          fontFamily: FONT_DISPLAY,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 56,
          lineHeight: 0.85,
          color: item.accent,
          mb: 1,
        }}>
          {number}
        </Box>

        {/* Period */}
        <Box sx={{ ...monoLabel, color: C.ink2, mb: 2 }}>
          {item.period}
        </Box>

        {/* Icon */}
        <Box sx={{
          width: 72,
          height: 72,
          display: 'grid',
          placeItems: 'center',
          bgcolor: item.accentSoft,
          border: `2px solid ${C.ink}`,
          mb: 2,
        }}>
          <Illustration name={item.illustration} color={item.accent} size={44} />
        </Box>

        {/* Type badge */}
        <Box sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.75,
          px: 1.25,
          py: 0.4,
          bgcolor: isPersonal ? item.accentSoft : C.lime,
          border: `1.5px solid ${C.ink}`,
        }}>
          <Box sx={{
            width: 5, height: 5, borderRadius: '50%',
            bgcolor: isPersonal ? item.accent : C.ink,
          }} />
          <Box sx={{ ...monoLabel, fontSize: 9, color: C.ink }}>
            {isPersonal ? 'Personal project' : 'Experience'}
          </Box>
        </Box>
      </Box>

      {/* Right column */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Title */}
        <Box sx={{
          fontFamily: FONT_SANS,
          fontSize: { xs: 22, md: 24 },
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          color: C.ink,
        }}>
          {item.role}
        </Box>

        {/* Company */}
        <Box sx={{
          fontFamily: FONT_DISPLAY,
          fontStyle: 'italic',
          fontSize: 18,
          color: item.accent,
          mt: 0.5,
        }}>
          {item.company}
        </Box>

        {/* Tagline */}
        <Box sx={{
          fontFamily: FONT_SANS,
          fontSize: 14.5,
          color: C.ink2,
          mt: 1.5,
          lineHeight: 1.65,
        }}>
          {item.tagline}
        </Box>

        {/* Missions */}
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Box sx={{ width: 8, height: 8, bgcolor: item.accent }} />
            <Box sx={{ ...monoLabel, color: C.ink }}>Missions</Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {item.missions.map((m, i) => (
              <Box key={i} sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.25,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-10px)',
                transition: `all .5s ease ${0.25 + i * 0.06}s`,
              }}>
                <Box sx={{
                  width: 5, height: 5,
                  bgcolor: item.accent,
                  mt: '7px',
                  flexShrink: 0,
                }} />
                <Box sx={{
                  fontFamily: FONT_SANS,
                  fontSize: 13.5,
                  color: C.ink2,
                  lineHeight: 1.6,
                }}>
                  {m}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Skills */}
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box sx={{ width: 8, height: 8, bgcolor: item.accent }} />
            <Box sx={{ ...monoLabel, color: C.ink }}>Skills used</Box>
          </Box>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2.5,
            columnGap: 4,
          }}>
            {item.skills.map((s, i) => (
              <SkillBar
                key={s.label}
                label={s.label}
                level={s.level}
                accent={item.accent}
                visible={visible}
                delay={0.3 + i * 0.08}
              />
            ))}
          </Box>
        </Box>

        {/* Projects */}
        {item.projects.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: item.accent }} />
              <Box sx={{ ...monoLabel, color: C.ink }}>Projects</Box>
            </Box>
            <Box sx={{ display: 'grid', gap: 1.5 }}>
              {item.projects.map((p, i) => {
                const Wrapper = p.link ? 'a' : 'div';
                return (
                  <Box
                    key={i}
                    component={Wrapper}
                    {...(p.link ? { href: p.link, target: '_blank', rel: 'noopener' } : {})}
                    sx={{
                      display: 'block',
                      p: 2,
                      bgcolor: item.accentSoft,
                      border: `1.5px solid ${C.ink}`,
                      textDecoration: 'none',
                      color: 'inherit',
                      opacity: visible ? 1 : 0,
                      transition: `opacity .6s ease ${0.5 + i * 0.1}s, transform .2s ease, box-shadow .2s ease`,
                      '&:hover': {
                        transform: 'translate(-2px, -2px)',
                        boxShadow: `3px 3px 0 ${C.ink}`,
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: 14, color: C.ink }}>
                        {p.name}
                      </Box>
                      {p.link && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Box sx={{ ...monoLabel, fontSize: 9, color: C.ink }}>View</Box>
                          <NorthEastIcon sx={{ fontSize: 12, color: C.ink }} />
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ fontFamily: FONT_SANS, fontSize: 12.5, color: C.ink2, mt: 0.5 }}>
                      {p.desc}
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1.25 }}>
                      {p.tags.map((t) => (
                        <Box key={t} sx={{
                          px: 0.9,
                          py: 0.25,
                          bgcolor: C.paper,
                          border: `1px solid ${C.ink}`,
                          ...monoLabel,
                          fontSize: 8,
                          color: C.ink,
                        }}>
                          {t}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

/* ═════════════════════════ MARKETING ═════════════════════════ */
function MarketingSection() {
  const [ref, visible] = useReveal();

  const accounts = [
    {
      image: '/images/tiktok-its-mory.png',
      name: 'Its_Mory',
      handle: '@mory_tounkara',
      followers: '67.9 K',
      likes: '282.7 K',
      description: 'Audience growth, content creation and community management.',
    },
    {
      image: '/images/tiktok-kara.jpg',
      name: 'Kara',
      handle: '@kara.digit',
      followers: '57 K',
      likes: '352.3 K',
      description: 'Account management, editorial identity and content strategy.',
    },
  ];

  return (
    <Box
      ref={ref}
      sx={{
        mt: 8,
        p: { xs: 2.5, md: 4.5 },
        bgcolor: C.paper,
        border: `2px solid ${C.ink}`,
        boxShadow: `8px 8px 0 ${C.pink}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'all .9s cubic-bezier(.2,.9,.3,1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: C.pink,
          animation: 'blink 2s ease-in-out infinite',
        }} />
        <Box sx={{ ...monoLabel, color: C.pink }}>
          Complementary experience
        </Box>
      </Box>

      <Box sx={{
        fontFamily: FONT_DISPLAY,
        fontWeight: 400,
        fontSize: { xs: 36, md: 48 },
        lineHeight: 0.95,
        letterSpacing: '-0.03em',
        color: C.ink,
        mb: 2,
      }}>
        Digital marketing &{' '}
        <Box component="span" sx={{ fontStyle: 'italic', color: C.pink }}>
          AI creation.
        </Box>
      </Box>

      <Box sx={{
        fontFamily: FONT_SANS,
        color: C.ink2,
        fontSize: 14.5,
        maxWidth: 680,
        lineHeight: 1.7,
        mb: 3,
      }}>
        Community growth, content strategies and digital asset creation,
        notably with artificial intelligence tools.
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
        gap: 1.5,
        mb: 4,
      }}>
        {[
          'Digital strategy and social media management',
          'Content creation and editorial calendar',
          'Community management and engagement',
          'AI-assisted advertising video creation',
          'Video editing and graphic design',
          'Meta Ads and TikTok ads',
          'Audience growth and acquisition',
          'Analytics and performance optimization',
        ].map((item, i) => (
          <Box key={i} sx={{
            display: 'flex',
            gap: 1.25,
            alignItems: 'flex-start',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: `all .5s ease ${0.2 + i * 0.06}s`,
          }}>
            <Box sx={{
              width: 5,
              height: 5,
              bgcolor: C.pink,
              mt: '7px',
              flexShrink: 0,
            }} />
            <Box sx={{
              fontFamily: FONT_SANS,
              fontSize: 13.5,
              color: C.ink2,
              lineHeight: 1.6,
            }}>
              {item}
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{
        p: 2.5,
        bgcolor: C.pinkSoft,
        border: `1.5px solid ${C.ink}`,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        flexWrap: 'wrap',
        mb: 4,
      }}>
        <Box>
          <Box sx={{
            fontFamily: FONT_DISPLAY,
            fontStyle: 'italic',
            fontSize: { xs: 52, md: 64 },
            lineHeight: 1,
            color: C.pink,
            letterSpacing: '-0.04em',
          }}>
            67.9 K
          </Box>
          <Box sx={{ ...monoLabel, fontSize: 9, color: C.ink2, mt: 0.5 }}>
            Followers on Its_Mory
          </Box>
        </Box>
        <Box sx={{
          width: 2,
          alignSelf: 'stretch',
          bgcolor: C.ink,
          display: { xs: 'none', sm: 'block' },
        }} />
        <Box flex={1} minWidth={200}>
          <Box sx={{
            fontFamily: FONT_SANS,
            color: C.ink,
            fontWeight: 700,
            fontSize: 14,
          }}>
            Results on social media
          </Box>
          <Box sx={{
            fontFamily: FONT_SANS,
            color: C.ink2,
            fontSize: 13.5,
            mt: 0.5,
            lineHeight: 1.5,
          }}>
            Two TikTok accounts with audiences of 67.9 K and 57 K followers.
          </Box>
        </Box>
      </Box>

      <Box sx={{
        ...monoLabel,
        color: C.pink,
        mb: 2,
      }}>
        Visual proof · TikTok accounts
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
        gap: 2.5,
      }}>
        {accounts.map((account) => (
          <Box key={account.handle} sx={{
            border: `1.5px solid ${C.ink}`,
            bgcolor: C.paper,
            overflow: 'hidden',
          }}>
            <Box
              component="img"
              src={account.image}
              alt={`Screenshot of TikTok profile ${account.name}`}
              loading="lazy"
              sx={{
                display: 'block',
                width: '100%',
                height: { xs: 440, md: 500 },
                objectFit: 'contain',
                bgcolor: '#F5F5F5',
              }}
            />
            <Box sx={{ p: 2 }}>
              <Box sx={{
                fontFamily: FONT_SANS,
                fontWeight: 700,
                fontSize: 18,
                color: C.ink,
              }}>
                {account.name}
              </Box>
              <Box sx={{
                fontFamily: FONT_SANS,
                fontSize: 12,
                color: C.muted,
                mb: 1.5,
              }}>
                {account.handle}
              </Box>
              <Box sx={{
                display: 'flex',
                gap: 3,
                flexWrap: 'wrap',
                mb: 1.5,
              }}>
                <Box>
                  <Box sx={{
                    fontWeight: 700,
                    fontSize: 20,
                    color: C.pink,
                  }}>
                    {account.followers}
                  </Box>
                  <Box sx={{ ...monoLabel, fontSize: 8, color: C.muted }}>
                    Followers
                  </Box>
                </Box>
                <Box>
                  <Box sx={{
                    fontWeight: 700,
                    fontSize: 20,
                    color: C.ink,
                  }}>
                    {account.likes}
                  </Box>
                  <Box sx={{ ...monoLabel, fontSize: 8, color: C.muted }}>
                    Likes
                  </Box>
                </Box>
              </Box>
              <Box sx={{
                fontFamily: FONT_SANS,
                fontSize: 12.5,
                color: C.ink2,
                lineHeight: 1.6,
              }}>
                {account.description}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ═════════════════════════ ACADEMIC BACKGROUND ═════════════════════════ */
function EducationSection() {
  const [ref, visible] = useReveal();

  const items = [
    {
      number: '01',
      title: 'Bachelor of Computer Applications (BCA)',
      org: 'Ray Integrated Degree College',
      location: 'Bangalore, India',
      period: '2020 — 2024',
      accent: C.tomato,
      detail: 'University education in computer science and applications.',
    },
    {
      number: '02',
      title: 'Full-Stack Web Development Certification',
      org: 'Kenpro Learning',
      location: 'India',
      period: 'March — November 2024 · 9 months',
      accent: C.cobalt,
      detail: 'Front-End and Back-End web development.',
    },
    {
      number: '03',
      title: 'Computer Maintenance Certificate',
      org: 'CRO-Mali',
      location: 'Bamako, Mali',
      period: 'July — September 2025 · 3 months',
      accent: C.lime,
      detail: 'Training in maintenance and IT environment.',
    },
  ];

  const langs = [
    { label: 'French', level: 'Fluent', accent: C.tomato },
    { label: 'English', level: 'Fluent', accent: C.cobalt },
    { label: 'Bambara', level: 'Native language', accent: C.lime },
  ];

  return (
    <Box
      ref={ref}
      sx={{
        mb: { xs: 10, md: 14 },
        bgcolor: C.ink,
        color: '#FFFFFF',
        border: `2px solid ${C.ink}`,
        boxShadow: `9px 9px 0 ${C.mustard}`,
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all .9s cubic-bezier(.2,.9,.3,1)',
      }}
    >
      {/* Editorial header */}
      <Box sx={{ p: { xs: 3, md: 5 }, pb: { xs: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: C.mustard }} />
          <Box sx={{ ...monoLabel, color: C.mustard }}>
            01 / Education & academic background
          </Box>
        </Box>

        <Box
          component="h2"
          sx={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 400,
            fontSize: { xs: 48, sm: 64, md: 84 },
            lineHeight: 0.94,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            maxWidth: 760,
            m: 0,
          }}
        >
          The foundations
          <br />
          <Box component="span" sx={{ color: C.mustard, fontStyle: 'italic' }}>
            of my journey.
          </Box>
        </Box>

        <Box sx={{
          mt: 2,
          maxWidth: 560,
          color: 'rgba(255,255,255,.66)',
          fontFamily: FONT_SANS,
          fontSize: { xs: 15, md: 17 },
          lineHeight: 1.8,
        }}>
          A journey built between university education in India,
          specialization in web development and IT training in Mali.
        </Box>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '0.95fr 1.25fr' },
        gap: { xs: 3, md: 5 },
        px: { xs: 3, md: 5 },
        pb: { xs: 4, md: 5 },
        alignItems: 'start',
      }}>
        {/* Graduation video */}
        <Box sx={{
          position: 'relative',
          width: '100%',
          maxWidth: { xs: 360, md: 440 },
          mx: 'auto',
          bgcolor: '#17171C',
          border: '1px solid rgba(255,255,255,.2)',
          overflow: 'hidden',
          boxShadow: `7px 7px 0 ${C.mustard}`,
        }}>
          <Box
            component="video"
            src="/videos/graduation.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Graduation ceremony video"
            sx={{
              display: 'block',
              width: '100%',
              aspectRatio: '9 / 16',
              objectFit: 'cover',
              background: '#17171C',
            }}
          />
          <Box sx={{
            position: 'absolute',
            inset: '45% 0 0',
            background: 'linear-gradient(transparent, rgba(0,0,0,.85))',
            pointerEvents: 'none',
          }} />
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2.5,
          }}>
            <Box sx={{ ...monoLabel, color: C.mustard, fontSize: 9 }}>
              A defining moment
            </Box>
            <Box sx={{
              fontFamily: FONT_DISPLAY,
              fontSize: 30,
              lineHeight: 1,
              mt: 0.7,
              color: '#FFFFFF',
            }}>
              Graduation.
            </Box>
            <Box sx={{
              fontFamily: FONT_MONO,
              fontSize: 9,
              color: 'rgba(255,255,255,.7)',
              mt: 1,
            }}>
              BCA · 2020 — 2024
            </Box>
          </Box>
        </Box>

        {/* Academic timeline */}
        <Box>
          <Box sx={{ ...monoLabel, color: C.mustard, mb: 2.5 }}>
            Academic background
          </Box>

          <Box sx={{ position: 'relative', pl: 0.5 }}>
            <Box sx={{
              position: 'absolute',
              left: 9,
              top: 12,
              bottom: 18,
              width: 1,
              bgcolor: 'rgba(255,255,255,.2)',
            }} />

            {items.map((it, i) => (
              <Box key={it.number} sx={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '20px 1fr',
                gap: 2,
                mb: i === items.length - 1 ? 0 : 3,
              }}>
                <Box sx={{
                  width: 11,
                  height: 11,
                  mt: 0.7,
                  borderRadius: '50%',
                  bgcolor: it.accent,
                  border: `2px solid ${C.ink}`,
                  boxShadow: `0 0 0 2px ${it.accent}`,
                  zIndex: 1,
                }} />

                <Box sx={{
                  pb: 2.5,
                  borderBottom: i === items.length - 1
                    ? 'none'
                    : '1px solid rgba(255,255,255,.15)',
                }}>
                  <Box sx={{
                    ...monoLabel,
                    fontSize: 11,
                    color: it.accent,
                    mb: 1,
                  }}>
                    {it.number} / {it.period}
                  </Box>

                  <Box sx={{
                    fontFamily: FONT_SANS,
                    fontSize: { xs: 18, md: 21 },
                    fontWeight: 700,
                    lineHeight: 1.35,
                    color: '#FFFFFF',
                  }}>
                    {it.title}
                  </Box>

                  <Box sx={{
                    fontFamily: FONT_SANS,
                    fontSize: { xs: 14, md: 16 },
                    color: 'rgba(255,255,255,.85)',
                    mt: 0.7,
                  }}>
                    {it.org}
                  </Box>

                  <Box sx={{
                    fontFamily: FONT_MONO,
                    fontSize: 9,
                    color: 'rgba(255,255,255,.48)',
                    mt: 0.5,
                  }}>
                    {it.location}
                  </Box>

                  <Box sx={{
                    fontFamily: FONT_SANS,
                    fontSize: { xs: 14, md: 15 },
                    color: 'rgba(255,255,255,.75)',
                    lineHeight: 1.6,
                    mt: 1,
                  }}>
                    {it.detail}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Languages */}
          <Box sx={{
            mt: 3,
            p: 2.5,
            bgcolor: 'rgba(255,255,255,.055)',
            border: '1px solid rgba(255,255,255,.16)',
          }}>
            <Box sx={{ ...monoLabel, color: C.mustard, mb: 2 }}>
              Languages
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {langs.map((l) => (
                <Box key={l.label} sx={{
                  px: 1.3,
                  py: 1,
                  border: '1px solid rgba(255,255,255,.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.4,
                  minWidth: 105,
                }}>
                  <Box sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: l.accent,
                  }} />
                  <Box sx={{
                    fontFamily: FONT_SANS,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}>
                    {l.label}
                  </Box>
                  <Box sx={{
                    fontFamily: FONT_MONO,
                    fontSize: 10,
                    color: 'rgba(255,255,255,.75)',
                  }}>
                    {l.level}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{
        px: { xs: 3, md: 5 },
        py: 1.5,
        bgcolor: C.mustard,
        color: C.ink,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        flexWrap: 'wrap',
      }}>
        <Box sx={{ ...monoLabel, fontSize: 9 }}>
          Learn · Build · Evolve
        </Box>
        <Box sx={{ ...monoLabel, fontSize: 9 }}>
          Mory Tounkara
        </Box>
      </Box>
    </Box>
  );
}

/* ═════════════════════════ PAGE ═════════════════════════ */
export default function Experience() {
  useFonts();

  return (
    <PageShell
      eyebrow="04 / EXPERIENCE"
      title="Education & experience."
      description="From academic foundations to professional experience, a journey focused on creating digital solutions."
    >
      <Container maxWidth="lg" disableGutters>
        <EducationSection />

        <Box sx={{ mb: 5, mt: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Box sx={{ width: 8, height: 8, bgcolor: C.tomato }} />
            <Box sx={{ ...monoLabel, color: C.tomato }}>
              02 / Professional experience
            </Box>
          </Box>
          <Box sx={{
            fontFamily: FONT_DISPLAY,
            fontSize: { xs: 38, md: 56 },
            lineHeight: 0.95,
            color: C.ink,
          }}>
            The journey <Box component="span" sx={{ color: C.tomato, fontStyle: 'italic' }}>in the field.</Box>
          </Box>
        </Box>

        {/* Counter */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box sx={{ width: 8, height: 8, bgcolor: C.tomato }} />
            <Box sx={{ ...monoLabel, color: C.ink }}>
              {experiences.length} experiences
            </Box>
          </Box>
        </Box>

        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.id} item={exp} index={i} />
        ))}

        <MarketingSection />

        {/* Editorial footer */}
        <Box sx={{
          mt: 10,
          pt: 4,
          borderTop: `2px solid ${C.ink}`,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}>
          <Box sx={{
            fontFamily: FONT_DISPLAY,
            fontStyle: 'italic',
            fontSize: 22,
            color: C.ink,
            maxWidth: 400,
          }}>
            End of the journey — for now.
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
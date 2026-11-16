import { useState, useMemo, useRef, useEffect } from 'react';
import { Box, Container } from '@mui/material';
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

/* ═════════════════════════ DATA ═════════════════════════ */
const projects = [
  {
    id: 'brain',
    name: 'Brain',
    category: 'Artificial Intelligence',
    type: 'Personal project',
    year: '2025',
    description: "Conversational AI assistant available on WhatsApp, with text and voice interactions.",
    technologies: ['React', 'Python', 'FastAPI', 'AI', 'WhatsApp API'],
    demo: 'https://brainia-ai.web.app',
    accent: C.cobalt,
    accentSoft: C.cobaltSoft,
  },
  {
    id: 'hope',
    name: 'Hope',
    category: 'E-commerce',
    type: 'Personal project',
    year: '2025',
    description: "Online store specializing in travel gadgets.",
    technologies: ['React', 'Vite', 'MUI', 'Firebase', 'Firestore'],
    demo: 'https://hope-shop.web.app',
    accent: C.tomato,
    accentSoft: C.tomatoSoft,
  },
  {
    id: 'sarab',
    name: 'Sarab',
    category: 'Showcase · Restaurant',
    type: 'Client work',
    year: '2025',
    description: "Showcase website for the Sarab restaurant: menu, reservation, photo gallery and practical information.",
    technologies: ['React', 'MUI', 'Design'],
    demo: 'http://169.58.36.220:8081/',
    accent: C.mustard,
    accentSoft: C.mustardSoft,
  },
  {
    id: 'royal-hotel',
    name: 'Royal Hotel',
    category: 'Showcase · Hospitality',
    type: 'Client work',
    year: '2025',
    description: "Showcase website for the Royal Hotel: rooms, suites, reservation and services.",
    technologies: ['React', 'MUI', 'Design'],
    demo: 'http://169.58.36.220:8083/',
    accent: C.cobalt,
    accentSoft: C.cobaltSoft,
  },
  {
    id: 'coraluxe',
    name: 'Coraluxe',
    category: 'Showcase · Real Estate',
    type: 'Client work',
    year: '2025',
    description: "Real estate platform presenting properties for sale and rent.",
    technologies: ['React', 'MUI', 'API'],
    demo: 'http://169.58.36.220:8084/',
    accent: C.lime,
    accentSoft: C.limeSoft,
  },
];

/* ═════════════════════════ REVEAL ═════════════════════════ */
function useReveal(threshold = 0.1) {
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

/* ═════════════════════════ LIVE WEBSITE PREVIEW ═════════════════════════ */
function LiveWebsitePreview({ project, hover }) {
  return (
    <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', bgcolor: '#fff' }}>
      <Box
        component="iframe"
        src={project.demo}
        title={`Website preview ${project.name}`}
        loading="lazy"
        referrerPolicy="no-referrer"
        sx={{
          width: '100%',
          height: '100%',
          border: 0,
          display: 'block',
          bgcolor: '#fff',
          pointerEvents: hover ? 'auto' : 'none',
        }}
      />
    </Box>
  );
}

/* ═════════════════════════ PROJECT CARD ═════════════════════════ */
function ProjectCard({ project, index }) {
  const [ref, visible] = useReveal();
  const [hover, setHover] = useState(false);
  const clickable = Boolean(project.demo);
  const Wrapper = clickable ? 'a' : 'div';
  const number = String(index + 1).padStart(2, '0');

  return (
    <Box
      ref={ref}
      component={Wrapper}
      {...(clickable ? { href: project.demo, target: '_blank', rel: 'noopener noreferrer' } : {})}
      translate="yes"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        bgcolor: C.paper,
        border: `2px solid ${C.ink}`,
        boxShadow: hover ? `8px 8px 0 ${C.ink}` : `4px 4px 0 ${C.ink}`,
        textDecoration: 'none',
        color: 'inherit',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hover ? 'translate(-4px, -4px)' : 'translate(0, 0)'
          : 'translateY(36px)',
        transition: `opacity .6s ease ${index * 0.06}s, transform .3s cubic-bezier(.2,.9,.3,1) ${index * 0.06}s, box-shadow .3s ease`,
        overflow: 'hidden',
      }}
    >
      {/* IMAGE */}
      <Box sx={{
        position: 'relative',
        aspectRatio: '16 / 11',
        overflow: 'hidden',
        bgcolor: project.accentSoft,
        borderBottom: `2px solid ${C.ink}`,
      }}>
        <LiveWebsitePreview project={project} hover={hover} />

        {/* Overlay gradient */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, transparent 50%, rgba(11,11,15,.6) 100%)`,
          pointerEvents: 'none',
        }} />

        {/* Serif italic number */}
        <Box sx={{
          position: 'absolute',
          top: 12,
          left: 16,
          fontFamily: FONT_DISPLAY,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 48,
          lineHeight: 1,
          color: '#FFFFFF',
          textShadow: '0 2px 12px rgba(0,0,0,.5)',
        }}>
          {number}
        </Box>

        {/* Type badge */}
        <Box sx={{
          position: 'absolute',
          top: 14,
          right: 14,
          px: 1.25,
          py: 0.5,
          bgcolor: C.paper,
          border: `1.5px solid ${C.ink}`,
          ...monoLabel,
          fontSize: 8.5,
          color: C.ink,
        }}>
          {project.type}
        </Box>

        {/* Year */}
        <Box sx={{
          position: 'absolute',
          bottom: 14,
          right: 16,
          ...monoLabel,
          fontSize: 10,
          color: '#FFFFFF',
          textShadow: '0 2px 10px rgba(0,0,0,.5)',
        }}>
          {project.year}
        </Box>
      </Box>

      {/* CONTENT */}
      <Box sx={{ p: { xs: 2.5, md: 3 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Category */}
        <Box sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.75,
          mb: 1.5,
        }}>
          <Box sx={{ width: 6, height: 6, bgcolor: project.accent }} />
          <Box sx={{ ...monoLabel, color: project.accent, fontSize: 9 }}>
            {project.category}
          </Box>
        </Box>

        {/* Title */}
        <Box
          sx={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 400,
            fontSize: { xs: 28, md: 32 },
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: C.ink,
            mb: 1.5,
            transition: 'color .3s ease',
          }}
        >
          {project.name}
        </Box>

        {/* Description */}
        <Box sx={{
          fontFamily: FONT_SANS,
          color: C.ink2,
          fontSize: 13.5,
          lineHeight: 1.65,
          mb: 2.5,
          flex: 1,
        }}>
          {project.description}
        </Box>

        {/* Technologies */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2.5 }}>
          {project.technologies.map((t) => (
            <Box key={t} sx={{
              px: 1,
              py: 0.4,
              bgcolor: project.accentSoft,
              border: `1px solid ${C.ink}`,
              ...monoLabel,
              fontSize: 8.5,
              color: C.ink,
            }}>
              {t}
            </Box>
          ))}
        </Box>

        {/* Link */}
        {clickable ? (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 2,
            borderTop: `1.5px solid ${C.hair}`,
            fontFamily: FONT_SANS,
            fontSize: 13,
            fontWeight: 700,
            color: C.ink,
            transition: 'color .2s ease',
          }}>
            View project
            <Box sx={{
              width: 32,
              height: 32,
              border: `1.5px solid ${C.ink}`,
              bgcolor: hover ? project.accent : 'transparent',
              color: hover ? '#FFFFFF' : C.ink,
              display: 'grid',
              placeItems: 'center',
              transition: 'all .3s ease',
              transform: hover ? 'translate(2px, -2px)' : 'none',
              ...(hover && { borderColor: project.accent }),
            }}>
              <NorthEastIcon sx={{ fontSize: 14 }} />
            </Box>
          </Box>
        ) : (
          <Box sx={{
            pt: 2,
            borderTop: `1.5px solid ${C.hair}`,
            ...monoLabel,
            fontSize: 9,
            color: C.muted,
          }}>
            In progress
          </Box>
        )}
      </Box>
    </Box>
  );
}

/* ═════════════════════════ FILTERS ═════════════════════════ */
function Filters({ active, setActive, counts }) {
  const categories = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => set.add(p.type));
    return ['All', ...Array.from(set)];
  }, []);

  return (
    <Box
      translate="yes"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        mb: { xs: 4, md: 5 },
        pb: 3,
        borderBottom: `2px solid ${C.ink}`,
      }}
    >
      {categories.map((c) => {
        const isActive = active === c;
        const count = c === 'All' ? projects.length : counts[c] || 0;
        return (
          <Box
            key={c}
            component="button"
            onClick={() => setActive(c)}
            sx={{
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 1.75,
              py: 0.9,
              bgcolor: isActive ? C.ink : C.paper,
              color: isActive ? C.lime : C.ink,
              border: `1.5px solid ${C.ink}`,
              boxShadow: isActive ? `3px 3px 0 ${C.lime}` : 'none',
              fontFamily: FONT_MONO,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              transition: 'all .2s ease',
              '&:hover': {
                bgcolor: isActive ? C.ink : C.limeSoft,
                transform: 'translate(-2px, -2px)',
                boxShadow: isActive ? `5px 5px 0 ${C.lime}` : `3px 3px 0 ${C.ink}`,
              },
            }}
          >
            {c}
            <Box sx={{
              px: 0.6,
              py: 0.1,
              bgcolor: isActive ? C.lime : C.cream,
              color: isActive ? C.ink : C.muted,
              border: `1px solid ${isActive ? C.lime : C.hair}`,
              fontSize: 9,
              fontWeight: 700,
              minWidth: 20,
              textAlign: 'center',
            }}>
              {count}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

/* ═════════════════════════ PAGE ═════════════════════════ */
export default function Projects() {
  useFonts();
  const [active, setActive] = useState('All');

  const counts = useMemo(() => {
    const result = {};
    projects.forEach((p) => {
      result[p.type] = (result[p.type] || 0) + 1;
    });
    return result;
  }, []);

  const filtered = useMemo(() => {
    if (active === 'All') return projects;
    return projects.filter((p) => p.type === active);
  }, [active]);

  return (
    <PageShell
      eyebrow="03 / PORTFOLIO"
      title="Selected projects."
      description="Personal products, client websites and digital solutions — crafted with careful attention to detail."
    >
      <Container maxWidth="lg" disableGutters>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Box sx={{ width: 8, height: 8, bgcolor: C.tomato }} />
            <Box sx={{ ...monoLabel, color: C.ink }}>
              {filtered.length} project{filtered.length > 1 ? 's' : ''}
            </Box>
          </Box>
        </Box>

        <Filters active={active} setActive={setActive} counts={counts} />

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: { xs: 3, md: 4 },
        }}>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </Box>

        {filtered.length === 0 && (
          <Box translate="yes" sx={{
            textAlign: 'center',
            py: 10,
            px: 4,
            bgcolor: C.paper,
            border: `2px solid ${C.ink}`,
            boxShadow: `4px 4px 0 ${C.ink}`,
            mt: 3,
          }}>
            <Box sx={{
              fontFamily: FONT_DISPLAY,
              fontStyle: 'italic',
              fontSize: 28,
              color: C.ink,
              mb: 1,
            }}>
              Nothing here, for now.
            </Box>
            <Box sx={{ fontFamily: FONT_SANS, color: C.ink2, fontSize: 14 }}>
              No projects in this category.
            </Box>
          </Box>
        )}

        {/* Editorial footer */}
        <Box sx={{
          mt: 8,
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
            fontSize: 24,
            color: C.ink,
            maxWidth: 400,
          }}>
            Every project is an opportunity to learn.
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
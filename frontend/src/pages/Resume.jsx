import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Box, Container } from '@mui/material';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
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
  @keyframes floaty {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
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

/* ═════════════════════════ RESUME CONFIG ═════════════════════════ */
const resumes = [
  {
    id: 'fr',
    lang: 'French',
    flag: '🇫🇷',
    title: 'French CV',
    subtitle: 'French version',
    file: '/cv/cv-francais.pdf',
    fileSize: '~250 KB',
    pages: 4,
    lastUpdate: 'November 2026',
    accent: C.tomato,
    accentSoft: C.tomatoSoft,
    highlights: [
      'Detailed background & experience',
      'Technical skills by category',
      'Education & languages',
    ],
  },
  {
    id: 'en',
    lang: 'English',
    flag: '🇬🇧',
    title: 'English Resume',
    subtitle: 'Full English version',
    file: '/cv/resume-english.pdf',
    fileSize: '~250 KB',
    pages: 4,
    lastUpdate: 'November 2026',
    accent: C.cobalt,
    accentSoft: C.cobaltSoft,
    highlights: [
      'Detailed background & experience',
      'Technical skills by category',
      'Education & languages',
    ],
  },
];


const UI = {
  eyebrow: '05 / RESUME',
  pageTitle: 'My resume, two versions.',
  pageDescription: 'View and download my resume in English or French — ready to share with recruiters.',
  heroTitle: 'Two versions, one goal:',
  heroAccent: 'to make an impression.',
  heroDescription: 'Preview the document directly in your browser, or download the version that suits your needs. Both documents are up to date.',
  preview: 'Preview',
  download: 'Download',
  pages: 'pages',
  updated: 'UPDATED',
  goodToKnow: 'GOOD TO KNOW',
  tips: [
    ['A4 format', 'Both resumes are in A4 format, ready to print or send by email.'],
    ['Focused and concise', 'Each version highlights key skills and professional experience.'],
    ['Bilingual', 'An English and a French resume for international applications.']
  ],
  footer: 'Last updated · November 2026',
  newTab: 'Open in new tab',
  close: 'Close',
};

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

/* ═════════════════════════ DOCUMENT ILLUSTRATION ═════════════════════════ */
function DocumentIllustration({ color, size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <rect x="14" y="6" width="52" height="68" rx="2" stroke={color} strokeWidth="2.4" fill="none" />
      <path d="M22 20h28M22 28h20M22 36h28M22 44h16" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <rect x="22" y="54" width="26" height="8" rx="1" fill={color} opacity="0.2" stroke={color} strokeWidth="1" />
      <circle cx="60" cy="60" r="12" fill="#FFFFFF" stroke={color} strokeWidth="2.4" />
      <path d="M56 60l3 3 5-6" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ═════════════════════════ RESUME CARD ═════════════════════════ */
function ResumeCard({ resume, index, onPreview, t }) {
  const [ref, visible] = useReveal();
  const [hover, setHover] = useState(false);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = resume.file;
    a.download = resume.id === 'fr' ? 'CV-Mory-Tounkara-FR.pdf' : 'Resume-Mory-Tounkara-EN.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: C.paper,
        border: `2px solid ${C.ink}`,
        boxShadow: hover ? `8px 8px 0 ${C.ink}` : `4px 4px 0 ${C.ink}`,
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hover ? 'translate(-4px, -4px)' : 'translate(0, 0)'
          : 'translateY(36px)',
        transition: `opacity .7s ease ${index * 0.1}s, transform .3s cubic-bezier(.2,.9,.3,1), box-shadow .3s ease`,
      }}
    >
      {/* Preview area */}
      <Box sx={{
        position: 'relative',
        aspectRatio: '4 / 3',
        bgcolor: resume.accentSoft,
        borderBottom: `2px solid ${C.ink}`,
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
      }}>
        {/* Background dot pattern */}
        <Box aria-hidden sx={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(${C.ink}10 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }} />
        {/* Real PDF thumbnail: first page */}
        <Box
          component="iframe"
          src={`${resume.file}#page=1&toolbar=0&navpanes=0&scrollbar=0`}
          title={`${resume.title} preview`}
          aria-label={`${resume.title} first page preview`}
          sx={{
            position: 'absolute',
            zIndex: 1,
            width: '72%',
            height: '92%',
            top: '4%',
            left: '14%',
            bgcolor: '#fff',
            border: `2px solid ${C.ink}`,
            boxShadow: `5px 5px 0 ${C.ink}`,
            pointerEvents: 'none',
            transform: hover ? 'translateY(-5px) scale(1.02)' : 'none',
            transition: 'transform .3s ease'
          }}
        />

        {/* Language badge */}
        <Box sx={{
          position: 'absolute',
          top: 12,
          left: 14,
          px: 1.25,
          py: 0.5,
          bgcolor: C.paper,
          border: `1.5px solid ${C.ink}`,
          ...monoLabel,
          fontSize: 9,
          color: C.ink,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          zIndex: 2,
        }}>
          <span>{resume.flag}</span>
          <span>{resume.lang}</span>
        </Box>

        {/* Hover overlay */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'rgba(11,11,15,.5)',
          backdropFilter: 'blur(4px)',
          opacity: hover ? 1 : 0,
          transition: 'opacity .3s ease',
          zIndex: 3,
        }}>
          <Box
            component="button"
            onClick={() => onPreview(resume)}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2.5,
              py: 1.25,
              bgcolor: C.paper,
              border: `2px solid ${C.ink}`,
              boxShadow: `4px 4px 0 ${C.ink}`,
              fontFamily: FONT_SANS,
              fontSize: 13,
              fontWeight: 700,
              color: C.ink,
              cursor: 'pointer',
              transition: 'all .2s ease',
              transform: hover ? 'translateY(0)' : 'translateY(8px)',
              '&:hover': {
                bgcolor: C.lime,
                transform: 'translate(-2px, -2px)',
                boxShadow: `6px 6px 0 ${C.ink}`,
              },
            }}
          >
            <VisibilityRoundedIcon sx={{ fontSize: 16 }} />
            {t.preview}
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Subtitle mono */}
        <Box sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.75,
          mb: 1,
        }}>
          <Box sx={{ width: 6, height: 6, bgcolor: resume.accent }} />
          <Box sx={{ ...monoLabel, color: resume.accent, fontSize: 9 }}>
            {resume.subtitle}
          </Box>
        </Box>

        {/* Serif title */}
        <Box sx={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 400,
          fontSize: { xs: 28, md: 32 },
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: C.ink,
          mb: 2,
        }}>
          {resume.title}
        </Box>

        {/* Info */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2.5 }}>
          {[
            { icon: <PictureAsPdfRoundedIcon sx={{ fontSize: 12 }} />, text: `PDF · ${resume.fileSize}` },
            { icon: null, text: `${resume.pages} ${t.pages}` },
            { icon: null, text: `${t.updated} ${resume.lastUpdate}` },
          ].map((info, i) => (
            <Box key={i} sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              ...monoLabel,
              fontSize: 9,
              color: C.ink2,
            }}>
              {info.icon}
              <span>{info.text}</span>
            </Box>
          ))}
        </Box>

        {/* Separator */}
        <Box sx={{ height: 1.5, bgcolor: C.hair, mb: 2.5 }} />

        {/* Highlights */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, mb: 3 }}>
          {resume.highlights.map((h, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
              <Box sx={{
                width: 5, height: 5,
                bgcolor: resume.accent,
                mt: '7px',
                flexShrink: 0,
              }} />
              <Box sx={{ fontFamily: FONT_SANS, fontSize: 13, color: C.ink2, lineHeight: 1.55 }}>
                {h}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Box
            component="button"
            onClick={() => onPreview(resume)}
            sx={{
              flex: 1,
              py: 1.4,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.75,
              bgcolor: 'transparent',
              color: C.ink,
              border: `2px solid ${C.ink}`,
              fontFamily: FONT_SANS,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all .2s ease',
              '&:hover': {
                bgcolor: C.cream,
                transform: 'translate(-2px, -2px)',
                boxShadow: `3px 3px 0 ${C.ink}`,
              },
            }}
          >
            <VisibilityRoundedIcon sx={{ fontSize: 16 }} />
            {t.preview}
          </Box>

          <Box
            component="button"
            onClick={handleDownload}
            sx={{
              flex: 1,
              py: 1.4,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.75,
              bgcolor: resume.accent,
              color: '#FFFFFF',
              border: `2px solid ${C.ink}`,
              fontFamily: FONT_SANS,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all .2s ease',
              '&:hover': {
                bgcolor: C.ink,
                transform: 'translate(-2px, -2px)',
                boxShadow: `3px 3px 0 ${C.ink}`,
              },
            }}
          >
            <DownloadRoundedIcon sx={{ fontSize: 16 }} />
            {t.download}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* ═════════════════════════ PDF PREVIEW MODAL ═════════════════════════ */
function PreviewModal({ resume, onClose, t }) {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!resume) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = resume.file;
    a.download = resume.id === 'fr' ? 'CV-Mory-Tounkara-FR.pdf' : 'Resume-Mory-Tounkara-EN.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return createPortal(
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483647,
        bgcolor: 'rgba(11,11,15,.65)',
        backdropFilter: 'blur(8px)',
        display: 'grid',
        placeItems: 'center',
        p: { xs: 1.5, sm: 3 },
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: '100%',
          maxWidth: 920,
          height: '92vh',
          bgcolor: C.paper,
          border: `2px solid ${C.ink}`,
          boxShadow: `8px 8px 0 ${resume.accent}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Modal header */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: `2px solid ${C.ink}`,
          bgcolor: C.cream,
          flexWrap: 'wrap',
          gap: 1.5,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{
              width: 40, height: 40,
              bgcolor: resume.accentSoft,
              border: `1.5px solid ${C.ink}`,
              display: 'grid',
              placeItems: 'center',
            }}>
              <DocumentIllustration color={resume.accent} size={24} />
            </Box>
            <Box>
              <Box sx={{ fontFamily: FONT_SANS, fontSize: 14.5, fontWeight: 700, color: C.ink }}>
                {resume.title}
              </Box>
              <Box sx={{ ...monoLabel, fontSize: 9, color: C.ink2, mt: 0.25 }}>
                {resume.flag} {resume.lang} · {resume.pages} pages · {resume.fileSize}
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="button"
              onClick={handleDownload}
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                alignItems: 'center',
                gap: 0.75,
                px: 1.75,
                py: 0.9,
                bgcolor: resume.accent,
                color: '#FFFFFF',
                border: `1.5px solid ${C.ink}`,
                fontFamily: FONT_SANS,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all .2s ease',
                '&:hover': {
                  bgcolor: C.ink,
                  transform: 'translate(-1px, -1px)',
                  boxShadow: `2px 2px 0 ${C.ink}`,
                },
              }}
            >
              <DownloadRoundedIcon sx={{ fontSize: 14 }} />
              {t.download}
            </Box>
            <Box
              component="a"
              href={resume.file}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                alignItems: 'center',
                gap: 0.75,
                px: 1.75,
                py: 0.9,
                bgcolor: C.paper,
                color: C.ink,
                border: `1.5px solid ${C.ink}`,
                fontFamily: FONT_SANS,
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all .2s ease',
                '&:hover': {
                  bgcolor: C.lime,
                  transform: 'translate(-1px, -1px)',
                  boxShadow: `2px 2px 0 ${C.ink}`,
                },
              }}
            >
              <OpenInNewRoundedIcon sx={{ fontSize: 14 }} />
              {t.newTab}
            </Box>
            <Box
              component="button"
              onClick={onClose}
              aria-label={t.close}
              sx={{
                width: 36, height: 36,
                bgcolor: C.paper,
                border: `1.5px solid ${C.ink}`,
                color: C.ink,
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                transition: 'all .2s ease',
                '&:hover': {
                  bgcolor: C.tomato,
                  color: '#FFFFFF',
                  transform: 'translate(-1px, -1px)',
                  boxShadow: `2px 2px 0 ${C.ink}`,
                },
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
          </Box>
        </Box>

        {/* PDF iframe */}
        <Box sx={{ flex: 1, position: 'relative', bgcolor: '#525659' }}>
          <Box
            component="iframe"
            src={`${resume.file}#toolbar=1&navpanes=0&scrollbar=1`}
            title={resume.title}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </Box>

        {/* Mobile footer */}
        <Box sx={{
          display: { xs: 'flex', sm: 'none' },
          p: 1.5,
          gap: 1,
          borderTop: `2px solid ${C.ink}`,
          bgcolor: C.paper,
        }}>
          <Box
            component="button"
            onClick={handleDownload}
            sx={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.75,
              py: 1.5,
              bgcolor: resume.accent,
              color: '#FFFFFF',
              border: `2px solid ${C.ink}`,
              fontFamily: FONT_SANS,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <DownloadRoundedIcon sx={{ fontSize: 16 }} />
            {t.download}
          </Box>
        </Box>
      </Box>
    </Box>,
    document.body
  );
}

/* ═════════════════════════ TIPS ═════════════════════════ */
function TipsSection({ t }) {
  const [ref, visible] = useReveal();
  const tips = t.tips.map(([title, text], i) => ({
    icon: ['📄', '🎯', '🌍'][i], title, text,
    accent: [C.tomato, C.cobalt, C.lime][i],
    accentSoft: [C.tomatoSoft, C.cobaltSoft, C.limeSoft][i]
  }));

  return (
    <Box
      ref={ref}
      sx={{
        mt: 8,
        p: { xs: 3, md: 4.5 },
        bgcolor: C.paper,
        border: `2px solid ${C.ink}`,
        boxShadow: `8px 8px 0 ${C.ink}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all .8s cubic-bezier(.2,.9,.3,1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Box sx={{ width: 8, height: 8, bgcolor: C.mustard }} />
        <Box sx={{ ...monoLabel, color: C.ink }}>{t.goodToKnow}</Box>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
        gap: 2.5,
      }}>
        {tips.map((tip, i) => (
          <Box
            key={i}
            sx={{
              p: 2.5,
              bgcolor: C.cream,
              border: `1.5px solid ${C.ink}`,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: `all .6s cubic-bezier(.2,.9,.3,1) ${0.2 + i * 0.1}s`,
              '&:hover': {
                transform: 'translate(-2px, -2px)',
                boxShadow: `3px 3px 0 ${C.ink}`,
              },
            }}
          >
            <Box sx={{
              width: 44, height: 44,
              display: 'grid',
              placeItems: 'center',
              bgcolor: tip.accentSoft,
              border: `1.5px solid ${C.ink}`,
              fontSize: 20,
              mb: 2,
            }}>
              {tip.icon}
            </Box>
            <Box sx={{
              fontFamily: FONT_SANS,
              fontSize: 15,
              fontWeight: 700,
              color: C.ink,
              mb: 0.75,
            }}>
              {tip.title}
            </Box>
            <Box sx={{
              fontFamily: FONT_SANS,
              fontSize: 13,
              color: C.ink2,
              lineHeight: 1.6,
            }}>
              {tip.text}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ═════════════════════════ PAGE ═════════════════════════ */
export default function Resume() {
  useFonts();
  const [preview, setPreview] = useState(null);
  const t = UI;
  const [refHero, heroVisible] = useReveal(0.1);

  return (
    <PageShell
      eyebrow={t.eyebrow}
      title={t.pageTitle}
      description={t.pageDescription}
    >

      <Container maxWidth="md" disableGutters>
        {/* ═══ HERO ═══ */}
        <Box
          ref={refHero}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '200px 1fr' },
            gap: { xs: 3, md: 4 },
            alignItems: 'center',
            mb: 8,
            p: { xs: 3, md: 4.5 },
            bgcolor: C.paper,
            border: `2px solid ${C.ink}`,
            boxShadow: `6px 6px 0 ${C.tomato}`,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all .9s cubic-bezier(.2,.9,.3,1)',
          }}
        >
          <Box sx={{
            display: 'grid',
            placeItems: 'center',
            animation: 'floaty 6s ease-in-out infinite',
          }}>
            <Box sx={{
              p: 2,
              bgcolor: C.tomatoSoft,
              border: `2px solid ${C.ink}`,
            }}>
              <DocumentIllustration color={C.tomato} size={100} />
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: C.tomato }} />
              <Box sx={{ ...monoLabel, color: C.ink }}>CV & Resume</Box>
            </Box>

            <Box sx={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 400,
              fontSize: { xs: 28, md: 36 },
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: C.ink,
              mb: 2,
            }}>
              {t.heroTitle}{' '}
              <Box component="span" sx={{ fontStyle: 'italic', color: C.tomato }}>
                {t.heroAccent}
              </Box>
            </Box>

            <Box sx={{
              fontFamily: FONT_SANS,
              color: C.ink2,
              fontSize: 14,
              lineHeight: 1.7,
            }}>
              {t.heroDescription}
            </Box>
          </Box>
        </Box>

        {/* ═══ RESUME CARDS ═══ */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
        }}>
          {resumes.map((r, i) => (
            <ResumeCard key={r.id} resume={r} index={i} onPreview={setPreview} t={t} />
          ))}
        </Box>

        {/* ═══ TIPS ═══ */}
        <TipsSection t={t} />

        {/* ═══ FOOTER ═══ */}
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
            fontSize: 20,
            color: C.ink,
          }}>
            {t.footer}
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, bgcolor: C.tomato }} />
            <Box sx={{ width: 8, height: 8, bgcolor: C.mustard }} />
            <Box sx={{ width: 8, height: 8, bgcolor: C.lime }} />
            <Box sx={{ width: 8, height: 8, bgcolor: C.cobalt }} />
          </Box>
        </Box>
      </Container>

      {/* Modal */}
      {preview && <PreviewModal resume={preview} onClose={() => setPreview(null)} t={t} />}
    </PageShell>
  );
}
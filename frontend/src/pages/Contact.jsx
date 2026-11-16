import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { GoogleGenAI } from '@google/genai';
import {
  Avatar, Box, Button, CircularProgress, Fab, IconButton, InputBase, Paper, SvgIcon, TextField, Snackbar, Alert,
  Typography, Zoom,
} from '@mui/material';
import { keyframes } from '@mui/system';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import PhoneIcon from '@mui/icons-material/Phone';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CodeIcon from '@mui/icons-material/Code';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import NorthEastIcon from '@mui/icons-material/NorthEast';

/* ═════════════════════════ CONFIG ═════════════════════════ */
const PROFILE = {
  name: 'Mory Tounkara',
  role: 'Web & AI Developer',
  location: 'Bamako, Mali',
  email: 'tounkaramory20266@gmail.com',
  phone: '+223 90 60 51 95',
  phoneRaw: '+22390605195',
  whatsapp:
    'https://wa.me/22390605195?text=' +
    encodeURIComponent('Hello Mory, I saw your portfolio and would like to get in touch.'),
  photo: '/mory.jpg',
  github: 'https://github.com/mory9222',
  linkedin: 'https://www.linkedin.com/in/mory-tounkara-200657378',
  tiktok: '',
  facebook: '',
  apiBase: import.meta.env.VITE_API_URL || 'http://localhost:8000',
};

/* ═════════════════════════ PALETTE ═════════════════════════ */
const C = {
  cream: '#FAF7F2',
  paper: '#FFFFFF',
  ink: '#0B0B0F',
  ink2: '#2A2A33',
  muted: '#7A7A85',
  tomato: '#F0503A',
  lime: '#C4E538',
  cobalt: '#2D5BFF',
  mustard: '#FFB627',
  mint: '#5EEAD4',
  lavender: '#B4A7FF',
  hair: '#E7E1D6',
  iosBlue: '#007AFF',
  iosGreen: '#34C759',
  iosRed: '#FF3B30',
  iosGray: '#8E8E93',
};

const FONT_DISPLAY = '"Instrument Serif", "Playfair Display", Georgia, serif';
const FONT_SANS = '"Space Grotesk", "Inter", system-ui, sans-serif';
const FONT_MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const IOS = '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif';

const GRAD_TOMATO = `linear-gradient(135deg, ${C.tomato} 0%, ${C.mustard} 100%)`;

/* ── Animations ── */
const spin = keyframes`to{transform:rotate(360deg)}`;
const floaty = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}`;
const pop = keyframes`0%{transform:scale(0)}70%{transform:scale(1.15)}100%{transform:scale(1)}`;
const rise = keyframes`from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}`;
const marquee = keyframes`to{transform:translateX(-50%)}`;
const iosRipple = keyframes`0%{transform:scale(1);opacity:.5}100%{transform:scale(1.35);opacity:0}`;
const iosPulse = keyframes`0%,100%{transform:scale(1)}50%{transform:scale(1.05)}`;
const bar = keyframes`0%,100%{transform:scaleY(.2)}50%{transform:scaleY(1)}`;
const dot = keyframes`0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-4px);opacity:1}`;
const show = keyframes`0%,3%{opacity:0;transform:translateY(8px)}8%,86%{opacity:1;transform:none}94%,100%{opacity:0;transform:translateY(-4px)}`;
const calm = { '@media (prefers-reduced-motion: reduce)': { animation: 'none !important' } };
const enter = (i) => ({ animation: `${rise} .8s cubic-bezier(.2,.9,.3,1) ${0.09 * i}s both`, ...calm });

/* ── Shared styles ── */
const monoLabel = {
  fontFamily: FONT_MONO,
  fontSize: 10.5,
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: C.muted,
};

/* ── FORM FIELD — text always visible ── */
const fieldStyle = {
  '& .MuiOutlinedInput-root': {
    fontFamily: FONT_SANS,
    color: C.ink,
    borderRadius: 0,
    bgcolor: 'transparent',
    fontSize: 15,
    '& fieldset': { border: 'none', borderBottom: `1.5px solid ${C.hair}` },
    '&:hover fieldset': { borderBottomColor: C.ink },
    '&.Mui-focused fieldset': { borderBottom: `1.5px solid ${C.ink}`, borderWidth: '1.5px' },
  },
  '& .MuiOutlinedInput-input': {
    color: `${C.ink} !important`,
    fontFamily: FONT_SANS,
    fontSize: 15,
    WebkitTextFillColor: `${C.ink} !important`,
  },
  '& .MuiInputBase-input': {
    color: `${C.ink} !important`,
    WebkitTextFillColor: `${C.ink} !important`,
  },
  '& .MuiInputBase-inputMultiline': {
    color: `${C.ink} !important`,
    WebkitTextFillColor: `${C.ink} !important`,
  },
  '& .MuiOutlinedInput-inputMultiline': {
    color: `${C.ink} !important`,
    WebkitTextFillColor: `${C.ink} !important`,
  },
  '& textarea': {
    color: `${C.ink} !important`,
    WebkitTextFillColor: `${C.ink} !important`,
    fontFamily: `${FONT_SANS} !important`,
    fontSize: '15px !important',
    caretColor: C.tomato,
  },
  '& .MuiInputLabel-root': {
    fontFamily: FONT_MONO,
    fontSize: 12,
    color: `${C.muted} !important`,
    letterSpacing: '0.06em',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: `${C.ink} !important`,
  },
  '& .MuiInputLabel-root.MuiFormLabel-filled': {
    color: `${C.muted} !important`,
  },
  '& input': {
    color: `${C.ink} !important`,
    WebkitTextFillColor: `${C.ink} !important`,
    caretColor: C.tomato,
  },
  '& input::placeholder': {
    color: `${C.muted} !important`,
    opacity: 0.6,
  },
  '& textarea::placeholder': {
    color: `${C.muted} !important`,
    opacity: 0.6,
  },
  '& .MuiInput-underline:before': { borderBottomColor: C.hair },
  '& .MuiInput-underline:after': { borderBottomColor: C.ink },
};

/* ═════════════════════════ TEXTS ═════════════════════════ */
const T = {
  kicker: 'Contact',
  h1: 'Contact',
  h1b: '',
  intro: 'A project to scope, an idea to test, a product to build? I personally answer every message.',
  avail: 'Available · New projects',
  aiBadge: 'AI voice call',
  aiTitle: 'The voice assistant',
  aiDesc: 'What if you could discover my journey by talking directly with an AI? Ask my voice assistant anything: it knows my skills, my projects, and my experience. A natural, real-time conversation.',
  aiCta: 'Start a conversation',
  formTitle: 'Or write to me',
  name: 'Your name', email: 'Your email', message: 'Your message',
  send: 'Send', sending: 'Sending…',
  sent: 'Message sent.',
  error: 'Sending failed.',
  phone: 'Phone', whatsapp: 'WhatsApp',
  write: 'Write', call: 'Call', waCta: 'Chat',
  socials: 'Elsewhere',
  copy: 'Copy', copied: 'Copied',
  botTitle: "Mory's assistant", botSubtitle: 'Voice AI',
  botHello: "Hi, I'm Mory's assistant. Ask me about his background, projects or skills.",
  botPlaceholder: 'Type your question…',
  botError: 'Connection failed. Email Mory directly.',
  botSend: 'Send', botOpen: 'Assistant', botClose: 'Close',
  ideas: ['His skills?', 'The Brain project?', 'Open to work?'],
  speech: 'en-US',
  start: 'Start', end: 'Hang up', close: 'Close',
  idle: 'Ready', listening: 'Listening', thinking: 'Thinking', speaking: 'Answering',
  greeting: "Hi, I'm Mory's assistant. Ask me anything about his work or projects.",
  unsupported: 'Speech recognition not supported. Use Chrome/Edge or the chat.',
  denied: 'Mic blocked. Allow access then retry.',
  callError: "I couldn't answer.",
  you: 'You', assistant: 'Assistant',
  muted: 'Mic', speaker: 'Speaker', voice: 'Voice',
};

const TICKER = [
  'AVAILABLE FOR WORK',
  'FULL-STACK',
  'REACT · FASTAPI',
  'AI · CHATBOTS',
  'BAMAKO · ML',
  'FR · EN',
];

/* ═════════════════════════ SVG ICONS ═════════════════════════ */
function TikTokIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </SvgIcon>
  );
}

function Asterisk({ size = 20, color = C.tomato, sx }) {
  return (
    <Box component="svg" viewBox="0 0 24 24" aria-hidden sx={{ width: size, height: size, ...sx }}>
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </Box>
  );
}

function Squiggle({ size = 40, color = C.tomato, sx }) {
  return (
    <Box component="svg" viewBox="0 0 64 24" aria-hidden sx={{ width: size, height: size * 0.375, ...sx }}>
      <path d="M2 12 Q12 0 22 12 T42 12 T62 12" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    </Box>
  );
}

/* ═════════════════════════ REVEAL ═════════════════════════ */
function Reveal({ children, delay = 0, sx }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setSeen(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Box
      ref={ref}
      sx={{
        opacity: seen ? 1 : 0, transform: seen ? 'none' : 'translateY(32px)',
        transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.2,.9,.3,1) ${delay}ms`,
        '@media (prefers-reduced-motion: reduce)': { opacity: 1, transform: 'none', transition: 'none' },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

/* ═════════════════════════ WAVE ═════════════════════════ */
function Wave({ active, color = C.ink, n = 17, h = 28 }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', height: h }} aria-hidden>
      {Array.from({ length: n }).map((_, i) => {
        const dur = active ? 0.5 + (i % 6) * 0.12 : 1.6 + (i % 4) * 0.3;
        return (
          <Box key={i} sx={{
            width: 3, height: h * 0.9, borderRadius: 1, bgcolor: color,
            transform: 'scaleY(.15)', transformOrigin: 'center',
            animation: `${bar} ${dur}s ease-in-out ${i * 0.04}s infinite`,
            opacity: active ? 1 : 0.3,
            ...calm,
          }} />
        );
      })}
    </Box>
  );
}

/* ═════════════════════════ MINI PHONE ═════════════════════════ */
function MiniPhone({ t }) {
  return (
    <Box sx={{ position: 'relative', width: 220, mx: 'auto' }}>
      <Box sx={{
        position: 'absolute', inset: -30, borderRadius: '50%',
        background: `radial-gradient(circle, ${C.tomato}30, transparent 65%)`,
        filter: 'blur(30px)',
      }} />

      <Box sx={{
        position: 'relative',
        width: 220,
        height: 440,
        borderRadius: '48px',
        bgcolor: '#0A0A0F',
        p: '10px',
        boxShadow: `0 40px 80px -30px rgba(10,10,15,.5), 0 20px 40px -20px rgba(10,10,15,.3), inset 0 0 0 2px rgba(255,255,255,.08)`,
        transform: 'rotate(-4deg)',
        animation: `${floaty} 6s ease-in-out infinite`,
        ...calm,
      }}>
        <Box sx={{
          position: 'absolute', top: 14, left: '50%',
          transform: 'translateX(-50%)',
          width: 70, height: 22,
          borderRadius: 99,
          bgcolor: '#000',
          zIndex: 20,
        }} />

        <Box sx={{
          position: 'relative',
          width: '100%', height: '100%',
          borderRadius: '38px',
          overflow: 'hidden',
          bgcolor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          pt: 5, px: 2, pb: 1.5,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: C.ink, fontFamily: IOS, px: 1, mb: 1.5 }}>
            <span>9:41</span>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ width: 3, height: 8, bgcolor: C.ink, borderRadius: 0.5 }} />
              <Box sx={{ width: 18, height: 8, borderRadius: 2, border: `1.5px solid ${C.ink}`, p: '1px', position: 'relative' }}>
                <Box sx={{ width: '75%', height: '100%', bgcolor: C.ink }} />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, pb: 2, borderBottom: `1px solid ${C.hair}` }}>
            <Box sx={{
              width: 52, height: 52, borderRadius: '50%',
              background: GRAD_TOMATO,
              display: 'grid', placeItems: 'center',
              color: '#fff', fontWeight: 800, fontSize: 20, fontFamily: FONT_DISPLAY,
            }}>M</Box>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: C.ink, fontFamily: FONT_SANS }}>Mory AI</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: C.iosGreen }} />
              <Typography sx={{ fontSize: 10, color: C.iosGray, fontFamily: FONT_SANS }}>{t.listening}</Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, position: 'relative', mt: 2 }}>
            {[
              { me: true, text: t.ideas[0], top: 0 },
              { me: false, text: 'React, FastAPI, AI — I know them well.', top: 56 },
              { me: true, text: t.ideas[1], top: 116 },
              { me: false, text: 'Brain — AI assistant on WhatsApp.', top: 176 },
            ].map((l, i) => (
              <Box key={i} sx={{
                position: 'absolute', left: 0, right: 0, top: l.top,
                display: 'flex', justifyContent: l.me ? 'flex-end' : 'flex-start',
                animation: `${show} 12s ease-in-out ${i * 2.6}s infinite both`,
                ...calm,
              }}>
                <Box sx={{
                  maxWidth: '82%', px: 1.5, py: 0.8, fontSize: 11, lineHeight: 1.35,
                  fontFamily: FONT_SANS, fontWeight: 500,
                  borderRadius: l.me ? '14px 14px 3px 14px' : '14px 14px 14px 3px',
                  ...(l.me ? { bgcolor: C.ink, color: '#fff' } : { bgcolor: '#F2F2F7', color: C.ink }),
                }}>
                  {l.text}
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
            <Wave active n={11} h={16} color={C.tomato} />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', pb: 1 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: C.iosRed, display: 'grid', placeItems: 'center', color: '#fff' }}>
              <CallEndIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: C.iosGreen, display: 'grid', placeItems: 'center', color: '#fff' }}>
              <CallIcon sx={{ fontSize: 20 }} />
            </Box>
          </Box>

          <Box sx={{ width: 100, height: 4, borderRadius: 99, bgcolor: C.ink, mx: 'auto', mt: 0.5 }} />
        </Box>
      </Box>
    </Box>
  );
}

/* ═════════════════════════ USE ASSISTANT ═════════════════════════ */
function useAssistant() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useRef([]);
  const conversationId = useRef(crypto.randomUUID());

  const send = useCallback(async (text) => {
    history.current = [...history.current, { role: 'user', content: text }];
    setMessages([...history.current]);
    setLoading(true);
    try {
      const res = await fetch(`${PROFILE.apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversation_id: conversationId.current }),
      });
      if (!res.ok) throw new Error('assistant_error');
      const { reply } = await res.json();
      history.current = [...history.current, { role: 'assistant', content: reply }];
      setMessages([...history.current]);
      return reply;
    } catch (err) {
      history.current = history.current.slice(0, -1);
      setMessages([...history.current]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addMessage = useCallback((role, content) => {
    if (!content?.trim()) return;
    history.current = [...history.current, { role, content: content.trim() }];
    setMessages([...history.current]);
  }, []);

  return { messages, loading, send, addMessage };
}

/* ═════════════════════════ CHATBOT FAB ═════════════════════════ */
function ChatbotFab({ t, assistant, onCall }) {
  const { messages, loading, send } = assistant;
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [failed, setFailed] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading, open]);

  const submit = async (value = text) => {
    const v = value.trim();
    if (!v || loading) return;
    setText('');
    setFailed(false);
    try { await send(v); } catch { setFailed(true); }
  };

  return (
    <>
      <Zoom in={open} unmountOnExit>
        <Paper elevation={0} sx={{
          position: 'fixed', right: { xs: 12, sm: 28 }, bottom: { xs: 92, sm: 108 }, zIndex: 1300,
          width: { xs: 'calc(100vw - 24px)', sm: 380 }, height: 'min(540px, calc(100dvh - 150px))',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          bgcolor: C.paper, borderRadius: 0, border: `1px solid ${C.ink}`,
          boxShadow: `8px 8px 0 ${C.ink}`,
          fontFamily: FONT_SANS,
        }}>
          <Box sx={{ p: 2, borderBottom: `1px solid ${C.ink}`, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar src={PROFILE.photo} sx={{ width: 40, height: 40, bgcolor: C.tomato, fontFamily: FONT_DISPLAY, fontWeight: 800 }}>M</Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 18, color: C.ink, lineHeight: 1.1 }}>{t.botTitle}</Typography>
              <Typography sx={{ ...monoLabel, color: C.tomato, mt: 0.25 }}>● {t.botSubtitle}</Typography>
            </Box>
            <IconButton onClick={() => { setOpen(false); onCall(); }} size="small" sx={{ color: C.ink, border: `1px solid ${C.ink}`, borderRadius: 0, '&:hover': { bgcolor: C.lime } }}>
              <PhoneInTalkIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => setOpen(false)} size="small" sx={{ color: C.ink, border: `1px solid ${C.ink}`, borderRadius: 0, '&:hover': { bgcolor: C.tomato, color: '#fff' } }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.25, bgcolor: C.cream }}>
            <Box sx={{ p: 1.5, bgcolor: C.paper, border: `1px solid ${C.hair}`, fontSize: 13.5, lineHeight: 1.5, color: C.ink2, maxWidth: '85%' }}>
              {t.botHello}
            </Box>
            {messages.length === 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {t.ideas.map((idea) => (
                  <Box key={idea} component="button" onClick={() => submit(idea)} sx={{
                    px: 1.5, py: 0.75, fontSize: 12, fontFamily: FONT_SANS, cursor: 'pointer',
                    bgcolor: C.paper, border: `1px solid ${C.hair}`, color: C.ink2,
                    '&:hover': { bgcolor: C.lime, borderColor: C.ink, color: C.ink },
                  }}>{idea}</Box>
                ))}
              </Box>
            )}
            {messages.map((m, i) => (
              <Box key={i} sx={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%',
                px: 1.5, py: 1, fontSize: 13.5, lineHeight: 1.5,
                ...(m.role === 'user'
                  ? { bgcolor: C.ink, color: '#fff', fontFamily: FONT_SANS }
                  : { bgcolor: C.paper, border: `1px solid ${C.hair}`, color: C.ink2 }),
              }}>{m.content}</Box>
            ))}
            {loading && <CircularProgress size={16} sx={{ color: C.tomato, ml: 1 }} />}
            {failed && <Box sx={{ p: 1.5, fontSize: 13, bgcolor: '#FEE', color: '#B00', border: `1px solid #FCC` }}>{t.botError}</Box>}
            <div ref={endRef} />
          </Box>

          <Box component="form" onSubmit={(e) => { e.preventDefault(); submit(); }} sx={{ p: 1.5, display: 'flex', gap: 1, borderTop: `1px solid ${C.ink}`, bgcolor: C.paper }}>
            <InputBase
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.botPlaceholder}
              sx={{
                flex: 1,
                fontSize: 14,
                fontFamily: FONT_SANS,
                px: 1.5, py: 1,
                border: `1px solid ${C.hair}`,
                color: C.ink,
                '& input': { color: `${C.ink} !important`, WebkitTextFillColor: `${C.ink} !important` },
                '& input::placeholder': { color: `${C.muted} !important`, opacity: 0.7 },
              }}
            />
            <IconButton type="submit" disabled={!text.trim() || loading} sx={{ bgcolor: C.ink, color: '#fff', borderRadius: 0, '&:hover': { bgcolor: C.tomato }, '&.Mui-disabled': { bgcolor: C.hair, color: C.muted } }}>
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      </Zoom>

      <Box sx={{ position: 'fixed', right: { xs: 16, sm: 32 }, bottom: { xs: 16, sm: 32 }, zIndex: 1300 }}>
        <Fab onClick={() => setOpen((o) => !o)} sx={{
          width: 60, height: 60, bgcolor: C.ink, color: '#fff', borderRadius: '50%',
          boxShadow: `4px 4px 0 ${C.tomato}`,
          transition: 'all .25s ease',
          '&:hover': { bgcolor: C.tomato, boxShadow: `4px 4px 0 ${C.ink}`, transform: 'translate(-2px, -2px)' },
        }}>
          {open ? <CloseIcon /> : <ChatBubbleIcon />}
        </Fab>
      </Box>
    </>
  );
}

/* ═════════════════════════ VOICE CALL ═════════════════════════ */
const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

function CallView({ t, assistant, onClose }) {
  const { messages, addMessage } = assistant;

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(true);

  const active = useRef(false);
  const sessionRef = useRef(null);
  const streamRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const processorRef = useRef(null);
  const silentGainRef = useRef(null);
  const mutedRef = useRef(false);
  const speakerRef = useRef(true);
  const playbackTimeRef = useRef(0);
  const playbackSourcesRef = useRef(new Set());
  const inputTranscriptRef = useRef('');
  const outputTranscriptRef = useRef('');
  const attemptRef = useRef(0);
  const inCall = status !== 'idle';

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    speakerRef.current = speaker;
  }, [speaker]);

  useEffect(() => {
    if (!inCall) return undefined;
    const id = setInterval(() => setSeconds((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, [inCall]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev1 = html.style.overflow;
    const prev2 = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prev1;
      body.style.overflow = prev2;
    };
  }, []);

  function hangUp() {
    attemptRef.current += 1;
    active.current = false;

    try { sessionRef.current?.close(); } catch {}
    sessionRef.current = null;

    try { processorRef.current?.disconnect(); } catch {}
    try { sourceRef.current?.disconnect(); } catch {}
    try { silentGainRef.current?.disconnect(); } catch {}

    processorRef.current = null;
    sourceRef.current = null;
    silentGainRef.current = null;

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    playbackSourcesRef.current.forEach((source) => {
      try { source.stop(); } catch {}
      try { source.disconnect(); } catch {}
    });
    playbackSourcesRef.current.clear();

    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    playbackTimeRef.current = 0;
    inputTranscriptRef.current = '';
    outputTranscriptRef.current = '';
    setMuted(false);
    setSpeaker(true);
    setStatus('idle');
  }

  useEffect(() => () => hangUp(), []);

  function flushTranscripts() {
    const userText = inputTranscriptRef.current.trim();
    const aiText = outputTranscriptRef.current.trim();

    if (userText) addMessage('user', userText);
    if (aiText) addMessage('assistant', aiText);

    inputTranscriptRef.current = '';
    outputTranscriptRef.current = '';
  }

  function playAudio(base64, mimeType = '') {
    const ctx = audioContextRef.current;
    if (!ctx || !speakerRef.current || !base64) return;

    try {
      const binary = atob(base64);
      const length = Math.floor(binary.length / 2);
      const pcm = new Int16Array(length);

      for (let i = 0; i < length; i++) {
        const low = binary.charCodeAt(i * 2);
        const high = binary.charCodeAt(i * 2 + 1);
        let value = (high << 8) | low;
        if (value >= 32768) value -= 65536;
        pcm[i] = value;
      }

      const rateMatch = mimeType.match(/rate=(\d+)/);
      const sampleRate = rateMatch ? Number(rateMatch[1]) : 24000;

      const buffer = ctx.createBuffer(1, pcm.length, sampleRate);
      const channel = buffer.getChannelData(0);

      for (let i = 0; i < pcm.length; i++) {
        channel[i] = pcm[i] / 32768;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);

      const startAt = Math.max(ctx.currentTime + 0.02, playbackTimeRef.current);
      source.start(startAt);
      playbackTimeRef.current = startAt + buffer.duration;

      playbackSourcesRef.current.add(source);
      source.onended = () => {
        playbackSourcesRef.current.delete(source);
        source.disconnect();
      };
    } catch (err) {
      console.error('Gemini audio playback error:', err);
    }
  }

  function handleLiveMessage(message) {
    const content = message.serverContent;
    if (!content) return;

    if (content.interrupted) {
      playbackSourcesRef.current.forEach((source) => {
        try { source.stop(); } catch {}
      });
      playbackSourcesRef.current.clear();
      playbackTimeRef.current = audioContextRef.current?.currentTime || 0;
      setStatus('listening');
    }

    const inputText = content.inputTranscription?.text;
    if (inputText) {
      inputTranscriptRef.current += inputText;
      setStatus('thinking');
    }

    const outputText = content.outputTranscription?.text;
    if (outputText) {
      outputTranscriptRef.current += outputText;
    }

    const parts = content.modelTurn?.parts || [];
    for (const part of parts) {
      const audio = part.inlineData;
      if (audio?.data) {
        setStatus('speaking');
        playAudio(audio.data, audio.mimeType || '');
      }
    }

    if (content.turnComplete) {
      flushTranscripts();
      setStatus('listening');
    }
  }

  async function startCall() {
    if (active.current || status === 'thinking') return;

    const attempt = ++attemptRef.current;
    setError('');
    setSeconds(0);
    setStatus('thinking');

    let stream;
    let ctx;

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      if (attempt !== attemptRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;

      ctx = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = ctx;
      await ctx.resume();

      const response = await fetch(`${PROFILE.apiBase}/api/voice/token`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('token_error');

      const { token, model } = await response.json();
      if (!token || !model) throw new Error('token_error');

      if (attempt !== attemptRef.current) return;

      const ai = new GoogleGenAI({
        apiKey: token,
        httpOptions: { apiVersion: 'v1alpha' },
      });

      const session = await ai.live.connect({
        model,
        config: {
          responseModalities: ['AUDIO'],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          sessionResumption: {},
        },
        callbacks: {
          onmessage: (message) => {
            if (active.current) handleLiveMessage(message);
          },
          onerror: (event) => {
            console.error('Gemini Live error:', event);
            if (active.current) {
              setError('The audio connection encountered an error.');
            }
          },
          onclose: (event) => {
            console.log('Gemini Live closed:', event);
          },
        },
      });

      if (attempt !== attemptRef.current) {
        session.close();
        return;
      }

      sessionRef.current = session;

      const micSource = ctx.createMediaStreamSource(stream);
      const processor = ctx.createScriptProcessor(4096, 1, 1);
      const silentGain = ctx.createGain();
      silentGain.gain.value = 0;

      processor.onaudioprocess = (event) => {
        if (!active.current || mutedRef.current || !sessionRef.current) return;

        const input = event.inputBuffer.getChannelData(0);
        const ratio = ctx.sampleRate / 16000;
        const outputLength = Math.floor(input.length / ratio);
        if (!outputLength) return;

        const pcm = new Int16Array(outputLength);

        for (let i = 0; i < outputLength; i++) {
          const sample = Math.max(-1, Math.min(1, input[Math.floor(i * ratio)]));
          pcm[i] = sample < 0 ? sample * 32768 : sample * 32767;
        }

        const bytes = new Uint8Array(pcm.buffer);
        let binary = '';
        for (let i = 0; i < bytes.length; i += 8192) {
          binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
        }

        try {
          sessionRef.current.sendRealtimeInput({
            audio: {
              data: btoa(binary),
              mimeType: 'audio/pcm;rate=16000',
            },
          });
        } catch (err) {
          console.error('Gemini microphone send error:', err);
        }
      };

      sourceRef.current = micSource;
      processorRef.current = processor;
      silentGainRef.current = silentGain;

      micSource.connect(processor);
      processor.connect(silentGain);
      silentGain.connect(ctx.destination);

      active.current = true;
      setStatus('listening');

      session.sendRealtimeInput({
        text: 'Start our conversation. Welcome the visitor in English and introduce yourself as the AI assistant for Mory Tounkara’s portfolio.',
      });

    } catch (err) {
      console.error('Gemini Live startup error:', err);

      if (attempt === attemptRef.current) {
        hangUp();
        setError(
          err?.name === 'NotAllowedError'
            ? 'Please allow microphone access.'
            : 'Could not start the call. Check the backend and Gemini connection.'
        );
      }
    }
  }

  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  const lastAi = [...messages].reverse().find((m) => m.role === 'assistant');
  const live = status === 'listening' || status === 'speaking';
  const statusLabel = inCall
    ? (t[status] || 'Connecting…')
    : t.idle;
  const statusColor = status === 'speaking'
    ? C.tomato
    : status === 'listening'
      ? C.iosGreen
      : C.muted;


  return createPortal(
    <Box
      role="dialog" aria-label={t.botTitle}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      sx={{
        position: 'fixed', inset: 0, zIndex: 2147483647,
        display: 'grid', placeItems: 'center',
        p: { xs: 1.5, sm: 3 },
        bgcolor: 'rgba(11,11,15,.6)',
        backdropFilter: 'blur(20px)',
        fontFamily: FONT_SANS,
        animation: `${pop} .35s cubic-bezier(.2,.9,.3,1)`,
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 680,
          maxHeight: { xs: '94dvh', sm: '88dvh' },
          bgcolor: C.cream,
          borderRadius: 0,
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          border: `2px solid ${C.ink}`,
          boxShadow: `12px 12px 0 ${C.ink}, 24px 24px 80px -20px rgba(0,0,0,.5)`,
        }}
      >
        <Box sx={{
          p: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `2px solid ${C.ink}`,
          bgcolor: C.paper,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              width: 10, height: 10, borderRadius: '50%',
              bgcolor: live ? statusColor : C.hair,
              boxShadow: live ? `0 0 12px ${statusColor}` : 'none',
              animation: live ? `${iosPulse} 1.5s ease-in-out infinite` : 'none',
              ...calm,
            }} />
            <Typography sx={{ fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              {inCall ? `REC · ${fmt(seconds)}` : t.voice}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={onClose} size="small" sx={{ border: `1px solid ${C.ink}`, borderRadius: 0, color: C.ink, '&:hover': { bgcolor: C.tomato, color: '#fff' } }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 0 }}>
          <Box sx={{ position: 'relative', mb: 3 }}>
            {live && [0, 1, 2].map((i) => (
              <Box key={i} aria-hidden sx={{
                position: 'absolute',
                inset: -10 - i * 10,
                borderRadius: '50%',
                border: `2px solid ${statusColor}`,
                opacity: 0.5 - i * 0.15,
                animation: `${iosRipple} 2.4s ease-out ${i * 0.7}s infinite`,
                ...calm,
              }} />
            ))}
            <Box sx={{
              width: { xs: 140, sm: 170 }, height: { xs: 140, sm: 170 }, borderRadius: '50%',
              background: GRAD_TOMATO,
              display: 'grid', placeItems: 'center',
              color: '#fff', fontSize: 64, fontFamily: FONT_DISPLAY, fontWeight: 800,
              border: `4px solid ${C.paper}`,
              boxShadow: `0 0 0 2px ${C.ink}, 8px 8px 0 ${C.ink}`,
              animation: live ? `${iosPulse} 2s ease-in-out infinite` : 'none',
              ...calm,
            }}>
              M
            </Box>
          </Box>

          <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 32, color: C.ink, letterSpacing: '-0.02em', lineHeight: 1.1, textAlign: 'center' }}>
            Mory AI
          </Typography>

          <Box sx={{
            display: 'inline-flex', alignItems: 'center', gap: 1,
            px: 2, py: 0.75, mt: 1.5,
            border: `1.5px solid ${live ? statusColor : C.hair}`,
            bgcolor: live ? `${statusColor}15` : 'transparent',
            ...(live && { boxShadow: `2px 2px 0 ${statusColor}` }),
          }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: live ? statusColor : C.muted, animation: live ? `${iosPulse} 1.5s ease-in-out infinite` : 'none', ...calm }} />
            <Typography sx={{ fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, color: live ? statusColor : C.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {statusLabel}
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Wave active={live} color={live ? statusColor : C.hair} n={21} h={32} />
          </Box>

          {(lastUser || lastAi) && (
            <Box sx={{ width: '100%', mt: 3, p: 2, bgcolor: C.paper, border: `1.5px solid ${C.ink}`, maxHeight: 130, overflowY: 'auto' }}>
              {lastUser && (
                <Box sx={{ mb: 1.5 }}>
                  <Typography sx={{ ...monoLabel, color: C.tomato, mb: 0.5 }}>— {t.you}</Typography>
                  <Typography sx={{ fontFamily: FONT_SANS, fontSize: 13.5, color: C.ink2, lineHeight: 1.5 }}>{lastUser.content}</Typography>
                </Box>
              )}
              {lastAi && (
                <Box>
                  <Typography sx={{ ...monoLabel, color: C.cobalt, mb: 0.5 }}>— {t.assistant}</Typography>
                  <Typography sx={{ fontFamily: FONT_SANS, fontSize: 13.5, color: C.ink, lineHeight: 1.5 }}>{lastAi.content}</Typography>
                </Box>
              )}
            </Box>
          )}

          {error && (
            <Box sx={{ mt: 2, px: 2, py: 1, bgcolor: '#FEE', border: `1.5px solid #C00`, width: '100%' }}>
              <Typography sx={{ fontFamily: FONT_SANS, fontSize: 12.5, color: '#B00' }}>{error}</Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ p: 2.5, borderTop: `2px solid ${C.ink}`, bgcolor: C.paper, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Box component="button" onClick={() => setMuted((m) => !m)} disabled={!inCall}
                sx={{
                  width: 46, height: 46, borderRadius: '50%',
                  border: `1.5px solid ${C.ink}`,
                  bgcolor: muted ? C.tomato : C.paper,
                  color: muted ? '#fff' : C.ink,
                  cursor: inCall ? 'pointer' : 'not-allowed',
                  opacity: inCall ? 1 : 0.4,
                  display: 'grid', placeItems: 'center',
                  '&:hover': inCall ? { bgcolor: muted ? '#D6392A' : C.cream } : {},
                }}>
                {muted ? <MicOffIcon sx={{ fontSize: 18 }} /> : <MicIcon sx={{ fontSize: 18 }} />}
              </Box>
              <Typography sx={{ ...monoLabel, fontSize: 9 }}>{t.muted}</Typography>
            </Box>

            <Box component="button" onClick={inCall ? hangUp : startCall}
              sx={{
                width: 68, height: 68, borderRadius: '50%',
                border: `2px solid ${C.ink}`,
                bgcolor: inCall ? C.iosRed : C.iosGreen,
                color: '#fff', cursor: 'pointer',
                display: 'grid', placeItems: 'center',
                boxShadow: `4px 4px 0 ${C.ink}`,
                transition: 'all .2s ease',
                animation: `${iosPulse} 2.2s ease-in-out infinite`,
                '&:hover': { transform: 'translate(-2px, -2px)', boxShadow: `6px 6px 0 ${C.ink}` },
                '&:active': { transform: 'translate(2px, 2px)', boxShadow: `2px 2px 0 ${C.ink}` },
                ...calm,
              }}>
              {inCall ? <CallEndIcon sx={{ fontSize: 28 }} /> : <CallIcon sx={{ fontSize: 28 }} />}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Box component="button" onClick={() => setSpeaker((s) => !s)} disabled={!inCall}
                sx={{
                  width: 46, height: 46, borderRadius: '50%',
                  border: `1.5px solid ${C.ink}`,
                  bgcolor: !speaker ? C.tomato : C.paper,
                  color: !speaker ? '#fff' : C.ink,
                  cursor: inCall ? 'pointer' : 'not-allowed',
                  opacity: inCall ? 1 : 0.4,
                  display: 'grid', placeItems: 'center',
                  '&:hover': inCall ? { bgcolor: !speaker ? '#D6392A' : C.cream } : {},
                }}>
                {speaker ? <VolumeUpIcon sx={{ fontSize: 18 }} /> : <VolumeOffIcon sx={{ fontSize: 18 }} />}
              </Box>
              <Typography sx={{ ...monoLabel, fontSize: 9 }}>{t.speaker}</Typography>
            </Box>
          </Box>

          <Typography sx={{ fontFamily: FONT_MONO, fontSize: 10.5, fontWeight: 700, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {inCall ? t.end : t.start}
          </Typography>
        </Box>
      </Box>
    </Box>,
    document.body
  );
}

/* ═════════════════════════ PAGE ═════════════════════════ */
export default function Contact() {
  const [calling, setCalling] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [copied, setCopied] = useState('');
  const t = T;
  const assistant = useAssistant();

  useEffect(() => {
    if (document.getElementById('mory-fonts')) return;
    const l = document.createElement('link');
    l.id = 'mory-fonts';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap';
    document.head.appendChild(l);
  }, []);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${PROFILE.apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('contact_error');
      const result = await res.json();
      if (!result.saved) throw new Error('contact_error');
      setForm({ name: '', email: '', message: '' });
      setStatus(result.email_sent ? 'sent' : 'saved');
    } catch { setStatus('error'); }
  };

  const copy = async (val, key) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopied(key);
      setTimeout(() => setCopied(''), 1600);
    } catch { /* ignore */ }
  };

  const socials = [
    { key: 'github', label: 'GitHub', icon: <GitHubIcon />, url: PROFILE.github, color: C.ink },
    { key: 'linkedin', label: 'LinkedIn', icon: <LinkedInIcon />, url: PROFILE.linkedin, color: C.cobalt },
    { key: 'tiktok', label: 'TikTok', icon: <TikTokIcon />, url: PROFILE.tiktok, color: C.ink },
    { key: 'facebook', label: 'Facebook', icon: <FacebookIcon />, url: PROFILE.facebook, color: '#1877F2' },
  ].filter((s) => s.url);

  return (
    <Box sx={{
      position: 'relative',
      minHeight: '100vh',
      bgcolor: C.cream,
      color: C.ink,
      fontFamily: FONT_SANS,
      overflow: 'hidden',
    }}>
      {/* ═════ TOP TICKER ═════ */}
      <Box sx={{
        bgcolor: C.ink,
        color: C.lime,
        py: 1.25,
        overflow: 'hidden',
        borderBottom: `2px solid ${C.ink}`,
      }}>
        <Box sx={{ display: 'flex', gap: 3, whiteSpace: 'nowrap', animation: `${marquee} 30s linear infinite`, ...calm }}>
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((txt, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography sx={{ fontFamily: FONT_MONO, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em' }}>{txt}</Typography>
              <Asterisk size={14} color={C.lime} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* ═════ EDITORIAL HERO ═════ */}
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 6 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Asterisk size={18} color={C.tomato} />
            <Typography sx={{ ...monoLabel, color: C.ink }}>{t.kicker} — 06</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.6, bgcolor: C.lime, border: `1.5px solid ${C.ink}` }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: C.ink }} />
              <Typography sx={{ fontFamily: FONT_MONO, fontSize: 10, fontWeight: 700, color: C.ink, letterSpacing: '0.1em' }}>{t.avail}</Typography>
            </Box>
          </Box>
        </Box>

        <Typography component="h1" sx={{
          fontFamily: FONT_DISPLAY, fontWeight: 400,
          fontSize: 'clamp(64px, 15vw, 200px)',
          lineHeight: 0.85, letterSpacing: '-0.05em',
          color: C.ink,
          ...enter(0),
        }}>
          {t.h1}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, flexWrap: 'wrap', mt: 1 }}>
          <Typography component="h1" sx={{
            fontFamily: FONT_DISPLAY, fontWeight: 400, fontStyle: 'italic',
            fontSize: 'clamp(64px, 15vw, 200px)',
            lineHeight: 0.85, letterSpacing: '-0.05em',
            color: C.tomato,
            ...enter(1),
          }}>
            {t.h1b}
          </Typography>
          <Box sx={{ pb: 3, ...enter(2) }}>
            <Squiggle size={80} color={C.tomato} />
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mt: 6, alignItems: 'end' }}>
          <Typography sx={{ fontFamily: FONT_SANS, fontSize: { xs: 16, md: 19 }, lineHeight: 1.55, color: C.ink2, maxWidth: 520, ...enter(3) }}>
            {t.intro}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: { xs: 'flex-start', md: 'flex-end' }, ...enter(4) }}>
            <Box component="button" onClick={() => setCalling(true)} sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1.5,
              px: 3, py: 2,
              bgcolor: C.ink, color: '#fff',
              border: `2px solid ${C.ink}`,
              fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600,
              cursor: 'pointer',
              transition: 'all .2s ease',
              '&:hover': { bgcolor: C.tomato, borderColor: C.tomato, transform: 'translate(-2px, -2px)', boxShadow: `4px 4px 0 ${C.ink}` },
            }}>
              <PhoneInTalkIcon sx={{ fontSize: 18 }} />
              {t.aiCta}
              <NorthEastIcon sx={{ fontSize: 16 }} />
            </Box>
            <Box component="a" href={`mailto:${PROFILE.email}`} sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1.5,
              px: 3, py: 2,
              bgcolor: C.lime, color: C.ink,
              border: `2px solid ${C.ink}`,
              fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600,
              textDecoration: 'none',
              transition: 'all .2s ease',
              '&:hover': { transform: 'translate(-2px, -2px)', boxShadow: `4px 4px 0 ${C.ink}` },
            }}>
              <EmailIcon sx={{ fontSize: 18 }} />
              {t.write}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ═════ THICK DIVIDER ═════ */}
      <Box sx={{ height: 3, bgcolor: C.ink }} />

      {/* ═════ BENTO GRID ═════ */}
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, md: 10 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: { xs: 2, md: 3 } }}>

          {/* AI CARD */}
          <Reveal delay={0} sx={{ gridColumn: { xs: 'span 12', md: 'span 8' } }}>
            <Box sx={{
              position: 'relative',
              p: { xs: 3, md: 5 },
              bgcolor: C.ink, color: '#fff',
              border: `2px solid ${C.ink}`,
              minHeight: { xs: 540, md: 650 },
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}>
              <Box aria-hidden sx={{
                position: 'absolute', inset: 0,
                backgroundImage: `radial-gradient(circle at 80% 20%, ${C.tomato}40, transparent 40%), radial-gradient(circle at 20% 80%, ${C.cobalt}30, transparent 40%)`,
                pointerEvents: 'none',
              }} />

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: C.lime }} />
                  <Typography sx={{ ...monoLabel, color: C.lime }}>{t.aiBadge}</Typography>
                </Box>

                <Typography sx={{
                  fontFamily: FONT_DISPLAY, fontWeight: 400, fontStyle: 'italic',
                  fontSize: { xs: 54, md: 82 }, lineHeight: 0.92, letterSpacing: '-0.03em',
                  color: '#fff',
                }}>
                  {t.aiTitle}
                </Typography>

                <Typography sx={{ fontFamily: FONT_SANS, fontSize: { xs: 16, md: 18 }, color: 'rgba(255,255,255,.82)', lineHeight: 1.75, mt: 3, maxWidth: 520 }}>
                  {t.aiDesc}
                </Typography>

                <Box component="button" onClick={() => setCalling(true)} sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 1.5,
                  mt: 5, px: 3.5, py: 2.2,
                  bgcolor: C.lime, color: C.ink,
                  border: `2px solid ${C.lime}`,
                  fontFamily: FONT_SANS, fontSize: 16, fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all .2s ease',
                  '&:hover': { bgcolor: '#fff', borderColor: '#fff', transform: 'translate(-2px, -2px)', boxShadow: `4px 4px 0 ${C.lime}` },
                }}>
                  <PhoneInTalkIcon sx={{ fontSize: 18 }} />
                  {t.aiCta}
                  <NorthEastIcon sx={{ fontSize: 16 }} />
                </Box>
              </Box>

              <Box sx={{
                position: 'absolute',
                right: { xs: -60, md: 20 },
                bottom: { xs: -100, md: -60 },
                transform: 'scale(0.8)',
                opacity: { xs: 0.4, md: 1 },
                pointerEvents: 'none',
              }}>
                <MiniPhone t={t} />
              </Box>
            </Box>
          </Reveal>

          {/* FORM */}
          <Reveal delay={100} sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
            <Box component="form" onSubmit={submit} sx={{
              p: { xs: 3, md: 5 },
              bgcolor: C.paper,
              border: `2px solid ${C.ink}`,
              minHeight: { xs: 420, md: 520 },
              display: 'flex', flexDirection: 'column',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Asterisk size={16} color={C.tomato} />
                <Typography sx={{ ...monoLabel, color: C.ink }}>{t.formTitle}</Typography>
              </Box>

              <Typography sx={{ fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontSize: { xs: 36, md: 44 }, lineHeight: 1, letterSpacing: '-0.02em', color: C.ink, mb: 4 }}>
                A message, a reply.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                <TextField
                  label={t.name}
                  value={form.name}
                  onChange={update('name')}
                  required
                  fullWidth
                  variant="standard"
                  sx={fieldStyle}
                  autoComplete="name"
                />
                <TextField
                  label={t.email}
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  required
                  fullWidth
                  variant="standard"
                  sx={fieldStyle}
                  autoComplete="email"
                />
                <TextField
                  label={t.message}
                  value={form.message}
                  onChange={update('message')}
                  required
                  fullWidth
                  variant="standard"
                  multiline
                  minRows={3}
                  sx={fieldStyle}
                />

                <Box sx={{ mt: 'auto', pt: 2 }}>
                  <Box component="button" type="submit" disabled={status === 'sending'} sx={{
                    width: '100%',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between',
                    px: 3, py: 2,
                    bgcolor: status === 'sending' ? C.hair : C.ink,
                    color: '#fff',
                    border: `2px solid ${C.ink}`,
                    fontFamily: FONT_SANS, fontSize: 15, fontWeight: 700,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'all .2s ease',
                    '&:hover:not(:disabled)': { bgcolor: C.tomato, borderColor: C.tomato },
                  }}>
                    {status === 'sending' ? t.sending : t.send}
                    <NorthEastIcon sx={{ fontSize: 20 }} />
                  </Box>
                  {status === 'sent' && (
                    <Typography sx={{ mt: 1.5, fontFamily: FONT_MONO, fontSize: 12, color: C.iosGreen, fontWeight: 700 }}>
                      ✓ {t.sent}
                    </Typography>
                  )}
                  {status === 'error' && (
                    <Typography sx={{ mt: 1.5, fontFamily: FONT_MONO, fontSize: 12, color: C.iosRed, fontWeight: 700 }}>
                      ! {t.error}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Reveal>

          {/* EMAIL CHANNEL */}
          <Reveal delay={0} sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
            <Box sx={{
              p: 3, height: '100%',
              bgcolor: C.paper, border: `2px solid ${C.ink}`,
              display: 'flex', flexDirection: 'column',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: C.cobalt }} />
                <Typography sx={{ ...monoLabel, color: C.ink }}>{t.email}</Typography>
              </Box>
              <Typography sx={{ fontFamily: FONT_SANS, fontSize: 14, color: C.ink2, mb: 3, wordBreak: 'break-all' }}>
                {PROFILE.email}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                <Box component="button" onClick={() => copy(PROFILE.email, 'email')} sx={{
                  flex: 1, py: 1, bgcolor: 'transparent',
                  border: `1.5px solid ${C.ink}`,
                  fontFamily: FONT_MONO, fontSize: 10.5, fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: 'pointer', color: C.ink,
                  transition: 'all .15s ease',
                  '&:hover': { bgcolor: C.ink, color: C.lime },
                }}>
                  {copied === 'email' ? '✓ ' + t.copied : t.copy}
                </Box>
                <Box component="a" href={`mailto:${PROFILE.email}`} sx={{
                  flex: 1, py: 1, bgcolor: C.cobalt, color: '#fff',
                  border: `1.5px solid ${C.ink}`,
                  fontFamily: FONT_MONO, fontSize: 10.5, fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  textDecoration: 'none', textAlign: 'center',
                  transition: 'all .15s ease',
                  '&:hover': { bgcolor: C.ink },
                }}>
                  {t.write}
                </Box>
              </Box>
            </Box>
          </Reveal>

          {/* PHONE CHANNEL */}
          <Reveal delay={80} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
            <Box sx={{
              p: 3, height: '100%',
              bgcolor: C.lime, border: `2px solid ${C.ink}`,
              display: 'flex', flexDirection: 'column',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: C.ink }} />
                <Typography sx={{ ...monoLabel, color: C.ink }}>{t.phone}</Typography>
              </Box>
              <Typography sx={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: C.ink, mb: 3, fontStyle: 'italic' }}>
                {PROFILE.phone}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                <Box component="button" onClick={() => copy(PROFILE.phone, 'phone')} sx={{
                  flex: 1, py: 1, bgcolor: 'transparent',
                  border: `1.5px solid ${C.ink}`,
                  fontFamily: FONT_MONO, fontSize: 10.5, fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: 'pointer', color: C.ink,
                  '&:hover': { bgcolor: C.ink, color: C.lime },
                }}>
                  {copied === 'phone' ? '✓ ' + t.copied : t.copy}
                </Box>
                <Box component="a" href={`tel:${PROFILE.phoneRaw}`} sx={{
                  flex: 1, py: 1, bgcolor: C.ink, color: C.lime,
                  border: `1.5px solid ${C.ink}`,
                  fontFamily: FONT_MONO, fontSize: 10.5, fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  textDecoration: 'none', textAlign: 'center',
                  '&:hover': { bgcolor: C.tomato, color: '#fff' },
                }}>
                  {t.call}
                </Box>
              </Box>
            </Box>
          </Reveal>

          {/* WHATSAPP CHANNEL */}
          <Reveal delay={160} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
            <Box sx={{
              p: 3, height: '100%',
              bgcolor: '#25D366', border: `2px solid ${C.ink}`,
              display: 'flex', flexDirection: 'column',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <WhatsAppIcon sx={{ fontSize: 16, color: C.ink }} />
                <Typography sx={{ ...monoLabel, color: C.ink }}>{t.whatsapp}</Typography>
              </Box>
              <Typography sx={{ fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontSize: 26, color: C.ink, lineHeight: 1.1, mb: 3 }}>
                The fastest.
              </Typography>
              <Box component="a" href={PROFILE.whatsapp} target="_blank" rel="noreferrer" sx={{
                mt: 'auto', py: 1.5,
                bgcolor: C.ink, color: '#fff',
                border: `1.5px solid ${C.ink}`,
                fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                textDecoration: 'none', textAlign: 'center',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
                transition: 'all .2s ease',
                '&:hover': { bgcolor: '#fff', color: C.ink },
              }}>
                {t.waCta}
                <NorthEastIcon sx={{ fontSize: 14 }} />
              </Box>
            </Box>
          </Reveal>

          {/* SOCIALS */}
          {socials.length > 0 && (
            <Reveal delay={0} sx={{ gridColumn: 'span 12' }}>
              <Box sx={{
                p: 3, bgcolor: C.paper, border: `2px solid ${C.ink}`,
                display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 3,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Asterisk size={14} color={C.mustard} />
                  <Typography sx={{ ...monoLabel, color: C.ink }}>{t.socials}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {socials.map((s) => (
                    <Box key={s.key} component="a" href={s.url} target="_blank" rel="noreferrer" sx={{
                      display: 'inline-flex', alignItems: 'center', gap: 1,
                      px: 2, py: 1,
                      bgcolor: 'transparent',
                      border: `1.5px solid ${C.ink}`,
                      color: C.ink,
                      fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all .15s ease',
                      '&:hover': { bgcolor: s.color, color: '#fff', borderColor: s.color },
                    }}>
                      {s.icon}
                      {s.label}
                      <NorthEastIcon sx={{ fontSize: 12 }} />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>
          )}
        </Box>
      </Box>

      {/* ═════ BOTTOM TICKER ═════ */}
      <Box sx={{ bgcolor: C.tomato, color: C.cream, py: 1.25, overflow: 'hidden', borderTop: `2px solid ${C.ink}` }}>
        <Box sx={{ display: 'flex', gap: 3, whiteSpace: 'nowrap', animation: `${marquee} 25s linear infinite reverse`, ...calm }}>
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((txt, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography sx={{ fontFamily: FONT_MONO, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em' }}>{txt}</Typography>
              <Asterisk size={14} color={C.cream} />
            </Box>
          ))}
        </Box>
      </Box>

      {!calling && <ChatbotFab t={t} assistant={assistant} onCall={() => setCalling(true)} />}
      {calling && <CallView t={t} assistant={assistant} onClose={() => setCalling(false)} />}
      <Snackbar
        open={['sent', 'saved', 'error'].includes(status)}
        autoHideDuration={4500}
        onClose={() => setStatus('idle')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 2, mr: 2 }}
      >
        <Alert
          onClose={() => setStatus('idle')}
          severity={status === 'sent' ? 'success' : status === 'saved' ? 'warning' : 'error'}
          variant="filled"
          elevation={8}
          sx={{
            minWidth: { xs: 'calc(100vw - 32px)', sm: 340 },
            borderRadius: '14px',
            fontFamily: FONT_SANS,
            fontWeight: 600,
            boxShadow: '0 12px 40px rgba(0,0,0,.18)',
            '& .MuiAlert-icon': { alignItems: 'center' },
          }}
        >
          {status === 'sent'
            ? 'Message sent successfully!'
            : status === 'saved'
              ? 'Message saved, but email was not sent.'
              : 'Sending failed. Check your connection and try again.'}
        </Alert>
      </Snackbar>

    </Box>
  );
}
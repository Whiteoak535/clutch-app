import { useState } from "react";

// ─── Nebius-inspired: White + Neon Yellow-Green + Navy + Gold ────────────────
const C = {
  // Backgrounds
  bg: "#FFFFFF",
  bgSoft: "#F9FAFB",
  bgMuted: "#F3F4F6",

  // Navy (primary text & dark elements)
  navy: "#0A1F3C",
  navyMid: "#1A3355",
  navyLight: "#2D4A6F",

  // Neon yellow-green (primary accent — from Nebius)
  neon: "#C8E62E",
  neonBright: "#D4F034",
  neonSoft: "rgba(200,230,46,0.12)",
  neonPale: "rgba(200,230,46,0.06)",

  // Gold (line accents, subtle warmth)
  gold: "#C9A84C",
  goldLight: "#E8D48B",
  goldLine: "rgba(201,168,76,0.25)",
  goldSoft: "rgba(201,168,76,0.08)",

  // Text
  text: "#0A1F3C",
  textMid: "#4A5568",
  textDim: "#9CA3AF",
  textLight: "#CBD5E1",

  // Category accents
  blue: "#3B82F6",
  blueLight: "#EFF6FF",
  green: "#22C55E",
  greenLight: "#F0FDF4",
  amber: "#D97706",
  amberLight: "#FFFBEB",
  rose: "#E11D48",
  roseLight: "#FFF1F2",
  teal: "#0D9488",
  tealLight: "#F0FDFA",
};

const Icons = {
  journal: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  brain: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><path d="M9 22h6"/></svg>,
  shield: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  star: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  target: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  flame: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  plus: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  chevron: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
  sparkle: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg>,
  ritual: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};

// ─── Data ────────────────────────────────────────────────────────────────────
const SEED_ENTRIES = [
  { id: "s1", date: "2026-02-24", category: "technique", rating: 4, title: "Sprint form breakthrough", body: "Coach pointed out my arm swing was crossing midline. Focused on driving elbows straight back — immediately felt smoother and shaved 0.2s off my 100m split.", tags: ["sprint", "form"] },
  { id: "s2", date: "2026-02-22", category: "mindset", rating: 5, title: "Visualization before race", body: "Spent 10 minutes visualizing the entire 400m before practice. When I actually ran it, the first 200m felt almost automatic.", tags: ["visualization", "race-prep"] },
  { id: "s3", date: "2026-02-20", category: "recovery", rating: 3, title: "Learning to rest without guilt", body: "Took a full rest day. Hard to not feel lazy, but my legs felt completely different the next day. Rest IS training.", tags: ["rest", "recovery"] },
];

const SEED_SETBACKS = [
  { id: "sb1", date: "2026-02-15", event: "Hamstring strain during practice", lesson: "I was skipping warm-ups to save time. 10 minutes of prep could have saved me 2 weeks of recovery.", controlTomorrow: "Full dynamic warm-up every session, no exceptions.", status: "recovering" },
];

const SEED_ROLE_MODELS = [
  { id: "rm1", name: "Kobe Bryant", sport: "Basketball", quote: "Everything negative — pressure, challenges — is all an opportunity for me to rise.", whyInspires: "His Mamba Mentality — obsessive focus on improving every detail.", color: C.navy },
  { id: "rm2", name: "Simone Biles", sport: "Gymnastics", quote: "I'm not the next Usain Bolt or Michael Phelps. I'm the first Simone Biles.", whyInspires: "She proved that prioritizing mental health IS strength.", color: C.rose },
];

const MINDSET_MODULES = [
  { id: "m1", title: "The Power of Self-Talk", category: "Mental Game", duration: "5 min", description: "Transform your inner critic into your inner coach. Learn the difference between instructional and motivational self-talk.", prompt: "Write down 3 negative things you've said to yourself during competition. Now rewrite each one as something a great coach would say to you instead.", completed: false },
  { id: "m2", title: "Visualization 101", category: "Performance", duration: "8 min", description: "Elite athletes don't just practice physically — they rehearse mentally. Learn to create vivid, multi-sensory mental movies of your best performance.", prompt: "Close your eyes for 2 minutes. Visualize your next competition from start to finish — sights, sounds, physical sensations, emotions. Write what you experienced.", completed: false },
  { id: "m3", title: "Pressure is a Privilege", category: "Competition", duration: "6 min", description: "Billie Jean King said it best. Reframe pressure situations as proof you've earned the right to compete at this level.", prompt: "Describe a moment when you felt intense pressure. Now reframe it: what does it say about how far you've come?", completed: false },
  { id: "m4", title: "The Process Over the Prize", category: "Goal Setting", duration: "7 min", description: "Outcome goals motivate, but process goals transform. Learn to fall in love with the daily work.", prompt: "List your top 3 outcome goals. For each one, write 2 daily process goals that will get you there.", completed: false },
  { id: "m5", title: "Bouncing Back", category: "Resilience", duration: "6 min", description: "Every champion has a comeback story. The difference isn't avoiding failure — it's how quickly and constructively you respond.", prompt: "Think of your biggest setback. What did it teach you that success never could?", completed: false },
];

const PRE_GAME_DEFAULTS = [
  { id: "pg1", text: "5 minutes of deep breathing (4-7-8 pattern)", done: false },
  { id: "pg2", text: "Visualize 3 key moments of peak performance", done: false },
  { id: "pg3", text: "Repeat personal affirmation 3 times", done: false },
  { id: "pg4", text: "Dynamic warm-up routine", done: false },
  { id: "pg5", text: "Set one process goal for today", done: false },
];

const POST_GAME_PROMPTS = ["What went well today?", "What's one thing I want to improve?", "Rate my mental focus (1-5)", "Did I stick to my pre-game ritual?", "One word to describe today's performance:"];

const genId = () => Math.random().toString(36).slice(2, 9);
const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const CATEGORIES = {
  technique: { label: "Technique", color: C.blue, bg: C.blueLight },
  mindset: { label: "Mindset", color: C.navy, bg: C.neonSoft },
  nutrition: { label: "Nutrition", color: C.teal, bg: C.tealLight },
  recovery: { label: "Recovery", color: C.amber, bg: C.amberLight },
  competition: { label: "Competition", color: C.rose, bg: C.roseLight },
};

// ─── Style System ────────────────────────────────────────────────────────────
const sans = { fontFamily: "'DM Sans', system-ui, sans-serif" };
const display = { fontFamily: "'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif" };

const S = {
  app: { ...sans, background: C.bg, color: C.text, minHeight: "100vh", maxWidth: 480, margin: "0 auto", position: "relative" },

  // Header
  header: { padding: "24px 22px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logoText: { fontSize: 26, fontWeight: 800, letterSpacing: "-0.6px", color: C.navy, ...display },
  logoDot: { display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: C.neon, marginLeft: 1, marginBottom: 2 },
  streak: { display: "flex", alignItems: "center", gap: 5, background: C.neonSoft, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 700, color: C.navyMid, ...sans },
  tagline: { padding: "4px 22px 16px", fontSize: 13, color: C.textDim, letterSpacing: "0.2px" },

  // Nav — gold underline on active
  nav: { display: "flex", gap: 1, padding: "0 14px 0", overflowX: "auto", marginBottom: 0 },
  navBtn: (a) => ({
    display: "flex", alignItems: "center", gap: 5, padding: "8px 12px 10px", borderRadius: 0,
    border: "none", borderBottom: a ? `2px solid ${C.gold}` : "2px solid transparent",
    background: "transparent", color: a ? C.navy : C.textDim,
    fontSize: 12, fontWeight: a ? 700 : 500, cursor: "pointer", whiteSpace: "nowrap",
    transition: "all 0.2s", ...sans,
  }),
  navDivider: { height: 1, background: C.goldLine, margin: "0 22px 6px" },

  content: { padding: "14px 22px 100px" },

  // Cards — white with subtle gold border hint
  card: {
    background: C.bg, border: `1px solid #E5E7EB`,
    borderRadius: 12, padding: 18, marginBottom: 10,
    boxShadow: "0 1px 2px rgba(10,31,60,0.03), 0 2px 8px rgba(10,31,60,0.02)",
  },
  cardAccent: {
    background: C.bg, border: `1px solid ${C.goldLine}`,
    borderRadius: 12, padding: 18, marginBottom: 10,
    boxShadow: "0 1px 2px rgba(201,168,76,0.06), 0 4px 12px rgba(201,168,76,0.04)",
  },

  tag: (color, bg) => ({ display: "inline-block", padding: "2px 9px", borderRadius: 5, fontSize: 10, fontWeight: 700, color, background: bg, letterSpacing: "0.6px", textTransform: "uppercase", ...sans }),
  input: { width: "100%", background: C.bgSoft, border: "1px solid #E5E7EB", borderRadius: 8, padding: "10px 14px", color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box", ...sans },
  textarea: { width: "100%", background: C.bgSoft, border: "1px solid #E5E7EB", borderRadius: 8, padding: "10px 14px", color: C.text, fontSize: 14, outline: "none", minHeight: 80, resize: "vertical", boxSizing: "border-box", ...sans },

  // Buttons — navy primary, neon secondary
  btnNavy: (sm) => ({ padding: sm ? "6px 14px" : "10px 20px", borderRadius: 8, border: "none", fontWeight: 700, fontSize: sm ? 12 : 14, cursor: "pointer", background: C.navy, color: "#fff", ...sans }),
  btnNeon: (sm) => ({ padding: sm ? "6px 14px" : "10px 20px", borderRadius: 8, border: "none", fontWeight: 700, fontSize: sm ? 12 : 14, cursor: "pointer", background: C.neon, color: C.navy, ...sans }),
  btnGhost: { padding: "6px 14px", borderRadius: 8, border: "none", fontWeight: 600, fontSize: 12, cursor: "pointer", background: C.bgMuted, color: C.textMid, ...sans },

  sectionTitle: { fontSize: 17, fontWeight: 800, marginBottom: 14, color: C.navy, display: "flex", alignItems: "center", gap: 8, ...display },
  label: { fontSize: 11, color: C.textDim, marginBottom: 8, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", ...sans },

  dot: (f) => ({ width: 10, height: 10, borderRadius: "50%", background: f ? C.gold : "#E5E7EB", cursor: "pointer", transition: "all 0.2s" }),

  modal: { position: "fixed", inset: 0, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 },
  modalContent: { background: C.bg, border: `1px solid ${C.goldLine}`, borderRadius: "18px 18px 0 0", padding: "24px 22px 32px", width: "100%", maxWidth: 480, maxHeight: "85vh", overflowY: "auto", boxShadow: "0 -8px 40px rgba(10,31,60,0.08)" },
};

// ─── Shared Components ───────────────────────────────────────────────────────
function RatingDots({ value, onChange, size = 10 }) {
  return <div style={{ display: "flex", gap: 4 }}>{[1,2,3,4,5].map(i => <div key={i} onClick={() => onChange?.(i)} style={{ ...S.dot(i <= value), width: size, height: size, cursor: onChange ? "pointer" : "default" }} />)}</div>;
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div style={S.modal} onClick={onClose}>
      <div style={S.modalContent} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: C.navy, ...display }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textDim, fontSize: 18, cursor: "pointer" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// Gold decorative line
function GoldDivider({ style = {} }) {
  return <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.goldLight}, transparent)`, margin: "16px 0", ...style }} />;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* PLAYBOOK                                                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */
function PlaybookTab({ entries, setEntries }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", category: "technique", rating: 3, tags: "" });
  const [aiSummary, setAiSummary] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const addEntry = () => {
    if (!form.title.trim()) return;
    setEntries([{ id: genId(), date: new Date().toISOString().split("T")[0], ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) }, ...entries]);
    setForm({ title: "", body: "", category: "technique", rating: 3, tags: "" });
    setShowAdd(false);
  };

  const generateSummary = async () => {
    setLoadingAI(true);
    const txt = entries.slice(0, 5).map(e => `[${e.category}] ${e.title}: ${e.body}`).join("\n");
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: `You are a sports performance coach. Based on these journal entries, provide a brief with: 1) Key themes, 2) Strength spotted, 3) Growth area, 4) One suggestion. Under 150 words, plain text.\n\n${txt}` }] }),
      });
      const d = await r.json();
      setAiSummary(d.content?.map(i => i.text || "").join("\n") || "Unable to generate.");
    } catch { setAiSummary("Could not generate summary. Try again."); }
    setLoadingAI(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={S.sectionTitle}>{Icons.journal}<span>The Playbook</span></div>
        <button onClick={() => setShowAdd(true)} style={{ ...S.btnNeon(true), display: "flex", alignItems: "center", gap: 5 }}>{Icons.plus} Log Entry</button>
      </div>

      {/* AI Brief */}
      <div onClick={entries.length >= 2 ? generateSummary : undefined} style={{ ...S.cardAccent, cursor: entries.length >= 2 ? "pointer" : "default", opacity: entries.length < 2 ? 0.5 : 1, marginBottom: 14, borderLeft: `3px solid ${C.gold}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: aiSummary ? 10 : 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.neonSoft, display: "flex", alignItems: "center", justifyContent: "center", color: C.navyMid }}>{Icons.sparkle}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>{loadingAI ? "Analyzing..." : "Weekly Performance Brief"}</div>
            {!aiSummary && <div style={{ fontSize: 12, color: C.textDim, marginTop: 1 }}>{entries.length < 2 ? "Add at least 2 entries to unlock" : "Tap to generate AI coaching insights"}</div>}
          </div>
        </div>
        {aiSummary && <><GoldDivider style={{ margin: "10px 0" }} /><div style={{ fontSize: 13, lineHeight: 1.7, color: C.textMid, whiteSpace: "pre-wrap" }}>{aiSummary}</div></>}
      </div>

      {entries.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: C.textDim }}><div style={{ fontSize: 28, marginBottom: 8, opacity: 0.35 }}>📓</div><div style={{ fontWeight: 600 }}>Your playbook is empty</div></div>
      ) : entries.map(entry => {
        const cat = CATEGORIES[entry.category] || CATEGORIES.technique;
        return (
          <div key={entry.id} style={S.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
              <span style={S.tag(cat.color, cat.bg)}>{cat.label}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <RatingDots value={entry.rating} size={7} />
                <span style={{ fontSize: 11, color: C.textLight }}>{fmtDate(entry.date)}</span>
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, lineHeight: 1.3, color: C.navy, ...display }}>{entry.title}</div>
            <div style={{ fontSize: 13.5, color: C.textMid, lineHeight: 1.6 }}>{entry.body}</div>
            {entry.tags?.length > 0 && <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>{entry.tags.map(t => <span key={t} style={{ fontSize: 11, color: C.textDim, background: C.bgMuted, padding: "2px 8px", borderRadius: 4 }}>#{t}</span>)}</div>}
          </div>
        );
      })}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Log Training Insight">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input style={S.input} placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <textarea style={S.textarea} placeholder="What did you learn?" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} />
          <div>
            <div style={S.label}>CATEGORY</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {Object.entries(CATEGORIES).map(([k, v]) => <button key={k} onClick={() => setForm({ ...form, category: k })} style={{ ...S.tag(form.category === k ? "#fff" : v.color, form.category === k ? v.color : v.bg), cursor: "pointer", border: "none", padding: "6px 12px", fontSize: 11 }}>{v.label}</button>)}
            </div>
          </div>
          <div><div style={S.label}>RATING</div><RatingDots value={form.rating} onChange={v => setForm({ ...form, rating: v })} size={18} /></div>
          <input style={S.input} placeholder="Tags (comma-separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
          <button onClick={addEntry} style={S.btnNavy()}>Save to Playbook</button>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* MINDSET                                                                    */
/* ═══════════════════════════════════════════════════════════════════════════ */
function MindsetTab({ modules, setModules }) {
  const [active, setActive] = useState(null);
  const [reflection, setReflection] = useState("");
  const done = modules.filter(m => m.completed).length;
  const complete = (id) => { setModules(modules.map(m => m.id === id ? { ...m, completed: true, reflection } : m)); setReflection(""); setActive(null); };

  return (
    <div>
      <div style={S.sectionTitle}>{Icons.brain}<span>Mindset Training</span></div>

      <div style={{ ...S.cardAccent, marginBottom: 14, borderLeft: `3px solid ${C.gold}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={S.label}>MODULES COMPLETED</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: C.navy, ...display }}>{done}<span style={{ fontSize: 16, color: C.textDim, fontWeight: 500 }}>/{modules.length}</span></div>
          </div>
          <div style={{ width: 56, height: 56, borderRadius: "50%", border: `3px solid #E5E7EB`, display: "flex", alignItems: "center", justifyContent: "center", background: `conic-gradient(${C.neon} ${(done / modules.length) * 360}deg, #F3F4F6 0)` }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: C.navy }}>{Math.round((done / modules.length) * 100)}%</div>
          </div>
        </div>
      </div>

      {modules.map(mod => (
        <div key={mod.id} onClick={() => !mod.completed && setActive(mod)} style={{ ...S.card, cursor: mod.completed ? "default" : "pointer", opacity: mod.completed ? 0.5 : 1, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: mod.completed ? C.greenLight : C.neonSoft, display: "flex", alignItems: "center", justifyContent: "center", color: mod.completed ? C.green : C.navy, flexShrink: 0 }}>{mod.completed ? Icons.check : Icons.brain}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>{mod.title}</div>
            <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{mod.category} · {mod.duration}</div>
          </div>
          {!mod.completed && <span style={{ color: C.textLight }}>{Icons.chevron}</span>}
        </div>
      ))}

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title || ""}>
        {active && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 12, color: C.navyLight, fontWeight: 700 }}>{active.category} · {active.duration}</div>
            <div style={{ fontSize: 14, lineHeight: 1.65, color: C.textMid }}>{active.description}</div>
            <div style={{ background: C.neonPale, border: `1px solid ${C.neonSoft}`, borderRadius: 10, padding: 16 }}>
              <div style={{ ...S.label, color: C.navyMid, marginBottom: 6 }}>REFLECTION PROMPT</div>
              <div style={{ fontSize: 13, lineHeight: 1.65, color: C.text }}>{active.prompt}</div>
            </div>
            <textarea style={S.textarea} placeholder="Write your reflection..." value={reflection} onChange={e => setReflection(e.target.value)} />
            <button onClick={() => complete(active.id)} style={S.btnNavy()}>Complete Module</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* RESILIENCE                                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
function ResilienceTab({ setbacks, setSetbacks }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ event: "", lesson: "", controlTomorrow: "", status: "active" });
  const sC = { active: C.rose, recovering: C.amber, overcome: C.green };
  const sBg = { active: C.roseLight, recovering: C.amberLight, overcome: C.greenLight };
  const add = () => { if (!form.event.trim()) return; setSetbacks([{ id: genId(), date: new Date().toISOString().split("T")[0], ...form }, ...setbacks]); setForm({ event: "", lesson: "", controlTomorrow: "", status: "active" }); setShowAdd(false); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={S.sectionTitle}>{Icons.shield}<span>Resilience Tracker</span></div>
        <button onClick={() => setShowAdd(true)} style={{ ...S.btnNeon(true), display: "flex", alignItems: "center", gap: 5 }}>{Icons.plus} Log Setback</button>
      </div>

      <div style={{ ...S.cardAccent, marginBottom: 14, textAlign: "center", borderLeft: `3px solid ${C.gold}` }}>
        <div style={{ ...S.label, color: C.gold, letterSpacing: 2 }}>SETBACKS ARE DATA, NOT DEFEAT</div>
        <div style={{ fontSize: 30, fontWeight: 800, marginTop: 6, color: C.navy, ...display }}>{setbacks.filter(s => s.status === "overcome").length}<span style={{ fontSize: 16, color: C.textDim, fontWeight: 500 }}>/{setbacks.length}</span></div>
        <div style={{ fontSize: 12, color: C.textDim, marginTop: 2 }}>challenges overcome</div>
      </div>

      {setbacks.map(sb => (
        <div key={sb.id} style={{ ...S.card, borderLeft: `3px solid ${sC[sb.status]}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={S.tag(sC[sb.status], sBg[sb.status])}>{sb.status}</span>
            <span style={{ fontSize: 11, color: C.textLight }}>{fmtDate(sb.date)}</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: C.navy }}>{sb.event}</div>
          {sb.lesson && <div style={{ fontSize: 13, color: C.textMid, marginBottom: 5 }}><span style={{ color: C.amber, fontWeight: 700 }}>Lesson:</span> {sb.lesson}</div>}
          {sb.controlTomorrow && <div style={{ fontSize: 13, color: C.textMid }}><span style={{ color: C.teal, fontWeight: 700 }}>I can control:</span> {sb.controlTomorrow}</div>}
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {["active", "recovering", "overcome"].map(st => (
              <button key={st} onClick={() => setSetbacks(setbacks.map(s => s.id === sb.id ? { ...s, status: st } : s))} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 5, border: "none", background: sb.status === st ? sC[st] : C.bgMuted, color: sb.status === st ? "#fff" : C.textDim, cursor: "pointer", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3px", ...sans }}>{st}</button>
            ))}
          </div>
        </div>
      ))}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Log a Setback">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input style={S.input} placeholder="What happened?" value={form.event} onChange={e => setForm({ ...form, event: e.target.value })} />
          <textarea style={S.textarea} placeholder="What did this teach me?" value={form.lesson} onChange={e => setForm({ ...form, lesson: e.target.value })} />
          <textarea style={S.textarea} placeholder="What can I control tomorrow?" value={form.controlTomorrow} onChange={e => setForm({ ...form, controlTomorrow: e.target.value })} />
          <button onClick={add} style={S.btnNavy()}>Log Setback</button>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ROLE MODELS                                                                */
/* ═══════════════════════════════════════════════════════════════════════════ */
function RoleModelsTab({ models, setModels }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", sport: "", quote: "", whyInspires: "", color: C.navy });
  const addModel = () => { if (!form.name.trim()) return; setModels([...models, { id: genId(), ...form }]); setForm({ name: "", sport: "", quote: "", whyInspires: "", color: C.navy }); setShowAdd(false); };
  const today = models[Math.floor(Date.now() / 86400000) % Math.max(models.length, 1)];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={S.sectionTitle}>{Icons.star}<span>Role Model Wall</span></div>
        <button onClick={() => setShowAdd(true)} style={{ ...S.btnNeon(true), display: "flex", alignItems: "center", gap: 5 }}>{Icons.plus} Add</button>
      </div>

      {today && (
        <div style={{ ...S.cardAccent, marginBottom: 14, borderLeft: `3px solid ${C.gold}`, position: "relative", overflow: "hidden" }}>
          {/* Neon accent blob */}
          <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: C.neonPale, pointerEvents: "none" }} />
          <div style={{ ...S.label, color: C.gold, letterSpacing: 2, position: "relative" }}>TODAY'S INSPIRATION</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 3, color: C.navy, position: "relative", ...display }}>{today.name}</div>
          <div style={{ fontSize: 12, color: C.textDim, marginBottom: 10 }}>{today.sport}</div>
          <GoldDivider style={{ margin: "8px 0 10px" }} />
          <div style={{ fontSize: 14, fontStyle: "italic", lineHeight: 1.55, color: C.textMid, position: "relative" }}>"{today.quote}"</div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {models.map(rm => (
          <div key={rm.id} style={{ ...S.card, borderTop: `2px solid ${rm.color}`, textAlign: "center", padding: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${rm.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 18, fontWeight: 800, color: rm.color, ...display }}>{rm.name.charAt(0)}</div>
            <div style={{ fontWeight: 700, fontSize: 13, color: C.navy }}>{rm.name}</div>
            <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{rm.sport}</div>
            <div style={{ fontSize: 11, color: C.textMid, marginTop: 8, fontStyle: "italic", lineHeight: 1.45 }}>"{rm.quote?.substring(0, 55)}{rm.quote?.length > 55 ? "…" : ""}"</div>
          </div>
        ))}
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Role Model">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input style={S.input} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input style={S.input} placeholder="Sport / Field" value={form.sport} onChange={e => setForm({ ...form, sport: e.target.value })} />
          <input style={S.input} placeholder="Favorite quote" value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} />
          <textarea style={S.textarea} placeholder="Why do they inspire you?" value={form.whyInspires} onChange={e => setForm({ ...form, whyInspires: e.target.value })} />
          <div>
            <div style={S.label}>ACCENT COLOR</div>
            <div style={{ display: "flex", gap: 8 }}>{[C.navy, C.blue, C.rose, C.amber, C.teal, C.navyLight, "#7C3AED", "#0F766E"].map(c => <div key={c} onClick={() => setForm({ ...form, color: c })} style={{ width: 26, height: 26, borderRadius: 6, background: c, cursor: "pointer", border: form.color === c ? `2px solid ${C.navy}` : "2px solid transparent" }} />)}</div>
          </div>
          <button onClick={addModel} style={S.btnNavy()}>Add to Wall</button>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* GOALS                                                                      */
/* ═══════════════════════════════════════════════════════════════════════════ */
function GoalsTab({ goals, setGoals, streakDays }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", type: "process", target: "" });
  const addGoal = () => { if (!form.title.trim()) return; setGoals([...goals, { id: genId(), ...form, progress: 0 }]); setForm({ title: "", type: "process", target: "" }); setShowAdd(false); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={S.sectionTitle}>{Icons.target}<span>Goals & Streaks</span></div>
        <button onClick={() => setShowAdd(true)} style={{ ...S.btnNeon(true), display: "flex", alignItems: "center", gap: 5 }}>{Icons.plus} New Goal</button>
      </div>

      {/* Streak */}
      <div style={{ ...S.cardAccent, textAlign: "center", marginBottom: 14, borderLeft: `3px solid ${C.gold}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: C.neonPale, pointerEvents: "none" }} />
        <div style={{ color: C.gold, position: "relative" }}>{Icons.flame}</div>
        <div style={{ fontSize: 36, fontWeight: 800, marginTop: 4, color: C.navy, ...display, position: "relative" }}>{streakDays}</div>
        <div style={{ ...S.label, color: C.gold, marginTop: 2, marginBottom: 10 }}>DAY JOURNALING STREAK</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 4, position: "relative" }}>
          {["M","T","W","T","F","S","S"].map((d, i) => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: 7, background: i < streakDays % 7 ? C.neon : C.bgMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: i < streakDays % 7 ? C.navy : C.textLight }}>{d}</div>
          ))}
        </div>
      </div>

      {goals.map(g => (
        <div key={g.id} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>{g.title}</div>
              <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{g.type === "process" ? "↻ Process" : "◎ Outcome"}{g.target && ` · ${g.target}`}</div>
            </div>
            <span style={{ fontSize: 14, fontWeight: 800, color: C.navy }}>{g.progress}%</span>
          </div>
          <div style={{ width: "100%", height: 5, background: C.bgMuted, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ width: `${g.progress}%`, height: "100%", background: `linear-gradient(90deg, ${C.neon}, ${C.gold})`, borderRadius: 3, transition: "width 0.3s" }} />
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {[10, 25, 50].map(inc => <button key={inc} onClick={() => setGoals(goals.map(x => x.id === g.id ? { ...x, progress: Math.min(100, x.progress + inc) } : x))} style={S.btnGhost}>+{inc}%</button>)}
          </div>
        </div>
      ))}

      {goals.length === 0 && <div style={{ textAlign: "center", padding: 40, color: C.textDim }}><div style={{ fontWeight: 600 }}>No goals yet</div></div>}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Set a Goal">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input style={S.input} placeholder="Goal title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <div>
            <div style={S.label}>TYPE</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["process", "outcome"].map(t => <button key={t} onClick={() => setForm({ ...form, type: t })} style={{ flex: 1, padding: 10, borderRadius: 8, border: "none", background: form.type === t ? C.neonSoft : C.bgMuted, color: form.type === t ? C.navy : C.textDim, fontWeight: 700, fontSize: 13, cursor: "pointer", ...sans }}>{t === "process" ? "↻ Process" : "◎ Outcome"}</button>)}
            </div>
          </div>
          <input style={S.input} placeholder="Target (e.g. '30 days')" value={form.target} onChange={e => setForm({ ...form, target: e.target.value })} />
          <button onClick={addGoal} style={S.btnNavy()}>Set Goal</button>
        </div>
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* RITUALS                                                                    */
/* ═══════════════════════════════════════════════════════════════════════════ */
function RitualsTab() {
  const [preGame, setPreGame] = useState(PRE_GAME_DEFAULTS);
  const [postAnswers, setPostAnswers] = useState({});
  const [mode, setMode] = useState("pre");
  const allDone = preGame.every(i => i.done);

  return (
    <div>
      <div style={S.sectionTitle}>{Icons.ritual}<span>Game Day Rituals</span></div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["pre", "post"].map(m => <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: 10, borderRadius: 8, border: "none", background: mode === m ? C.neonSoft : C.bgMuted, color: mode === m ? C.navy : C.textDim, fontWeight: 700, fontSize: 13, cursor: "pointer", ...sans }}>{m === "pre" ? "Pre-Game" : "Post-Game"}</button>)}
      </div>

      {mode === "pre" ? (
        <>
          {allDone && <div style={{ ...S.cardAccent, textAlign: "center", marginBottom: 10, borderLeft: `3px solid ${C.green}`, background: C.greenLight }}><div style={{ fontWeight: 800, color: C.green, fontSize: 14 }}>You're locked in. Go dominate.</div></div>}
          {preGame.map(item => (
            <div key={item.id} onClick={() => setPreGame(preGame.map(x => x.id === item.id ? { ...x, done: !x.done } : x))} style={{ ...S.card, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", opacity: item.done ? 0.4 : 1 }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, border: item.done ? "none" : "1.5px solid #D1D5DB", background: item.done ? C.navy : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff" }}>{item.done && Icons.check}</div>
              <span style={{ fontSize: 14, textDecoration: item.done ? "line-through" : "none", color: item.done ? C.textDim : C.textMid }}>{item.text}</span>
            </div>
          ))}
        </>
      ) : (
        <>
          <div style={{ fontSize: 13, color: C.textDim, marginBottom: 14, fontStyle: "italic" }}>Reflect honestly — this is just for you.</div>
          {POST_GAME_PROMPTS.map((p, i) => (
            <div key={i} style={S.card}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: C.navyMid }}>{p}</div>
              <input style={S.input} placeholder="Your answer..." value={postAnswers[i] || ""} onChange={e => setPostAnswers({ ...postAnswers, [i]: e.target.value })} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* MAIN APP                                                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */
const TABS = [
  { id: "playbook", label: "Playbook", icon: Icons.journal },
  { id: "mindset", label: "Mindset", icon: Icons.brain },
  { id: "resilience", label: "Resilience", icon: Icons.shield },
  { id: "rolemodels", label: "Heroes", icon: Icons.star },
  { id: "goals", label: "Goals", icon: Icons.target },
  { id: "rituals", label: "Rituals", icon: Icons.ritual },
];

export default function ClutchApp() {
  const [tab, setTab] = useState("playbook");
  const [entries, setEntries] = useState(SEED_ENTRIES);
  const [modules, setModules] = useState(MINDSET_MODULES);
  const [setbacks, setSetbacks] = useState(SEED_SETBACKS);
  const [roleModels, setRoleModels] = useState(SEED_ROLE_MODELS);
  const [goals, setGoals] = useState([
    { id: "g1", title: "Visualization practice daily", type: "process", target: "30 days", progress: 40 },
    { id: "g2", title: "Break 11.0s in 100m", type: "outcome", target: "By April meet", progress: 65 },
  ]);
  const streakDays = entries.length > 0 ? Math.min(entries.length + 2, 12) : 0;

  return (
    <div style={S.app}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={S.header}>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={S.logoText}>Clutch</span>
          <span style={S.logoDot} />
        </div>
        <div style={S.streak}>{Icons.flame}<span>{streakDays} days</span></div>
      </div>
      <div style={S.tagline}>When it matters most, you deliver.</div>

      {/* Nav with gold underline */}
      <div style={S.nav}>
        {TABS.map(t => <button key={t.id} style={S.navBtn(tab === t.id)} onClick={() => setTab(t.id)}>{t.icon}<span>{t.label}</span></button>)}
      </div>
      <div style={S.navDivider} />

      {/* Content */}
      <div style={S.content}>
        {tab === "playbook" && <PlaybookTab entries={entries} setEntries={setEntries} />}
        {tab === "mindset" && <MindsetTab modules={modules} setModules={setModules} />}
        {tab === "resilience" && <ResilienceTab setbacks={setbacks} setSetbacks={setSetbacks} />}
        {tab === "rolemodels" && <RoleModelsTab models={roleModels} setModels={setRoleModels} />}
        {tab === "goals" && <GoalsTab goals={goals} setGoals={setGoals} streakDays={streakDays} />}
        {tab === "rituals" && <RitualsTab />}
      </div>
    </div>
  );
}

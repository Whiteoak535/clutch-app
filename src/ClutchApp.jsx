import React, { useState, useEffect, useRef } from 'react';

// ─── Sport Configs ───────────────────────────────────────────
const SPORTS = {
  lacrosse: {
    name: 'Girl Lacrosse',
    emoji: '🥍',
    color: '#7C3AED',
    colorLight: '#EDE9FE',
    colorMid: '#C4B5FD',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #C084FC 100%)',
    positions: ['Attack', 'Midfield', 'Defense', 'Goalie'],
    skills: [
      'Cradling', 'Passing', 'Catching', 'Shooting', 'Ground Balls',
      'Dodging', 'Cutting', 'Draw Controls', 'Checking', 'Footwork',
      'Field Vision', 'Transition Play', 'Free Position Shots', 'Communication'
    ],
    drills: [
      { name: 'Wall Ball', desc: 'Rapid passing & catching against a wall — builds stick skills and hand-eye coordination', duration: '10 min' },
      { name: 'Zig-Zag Dodges', desc: 'Cone drill with cradle-dodge combos — works on change of direction with the ball', duration: '8 min' },
      { name: 'Draw Circle Reps', desc: 'Repetitive draw control practice — essential for winning possession', duration: '10 min' },
      { name: '3v2 Fast Break', desc: 'Transition offense drill — practice quick ball movement and finishing', duration: '12 min' },
      { name: 'Defensive Slides', desc: 'Lateral footwork and body positioning — stay between attacker and goal', duration: '8 min' },
      { name: 'Ground Ball Scraps', desc: 'Competitive ground ball pickups — build toughness and quick reactions', duration: '6 min' },
    ],
    mindsetTips: [
      { title: 'Own the Draw', tip: 'The draw circle is where games are won. Visualize your clamp technique before every draw — see your hands, feel the timing, own the whistle.' },
      { title: 'Play for Your Sisters', tip: 'Lacrosse is a team sport built on trust. When you cut, trust someone will find you. When you have the ball, trust your teammates are moving.' },
      { title: 'Embrace Contact', tip: "Checking and body positioning are part of the game. Don't shy away — channel your energy into smart, aggressive play." },
      { title: 'Talk on D', tip: 'Communication IS defense. Call out cutters, slides, and ball position. The loudest defense is usually the best defense.' },
      { title: 'Reset, Don\'t Rush', tip: 'When a play breaks down, reset. Patience on offense creates better shots than forcing through traffic.' },
    ],
    roleModels: [
      { name: 'Taylor Cummings', achievement: '3x Tewaaraton Award Winner', quote: 'The work you put in when no one is watching is what separates you.', lesson: 'Consistency in practice builds greatness in games.' },
      { name: 'Kayla Treanor', achievement: 'NCAA Record Holder & Pro Star', quote: 'Play with joy. The moment you stop having fun is the moment you stop getting better.', lesson: 'Passion fuels performance more than pressure ever will.' },
      { name: 'Alex Kehoe', achievement: 'US National Team Goalie', quote: 'Every save starts with believing you can make it before the shot is even taken.', lesson: 'Confidence is a skill you train, not something you\'re born with.' },
      { name: 'Charlotte North', achievement: 'Tewaaraton Award Winner & BC Legend', quote: 'I just want to be the best teammate I can be every single day.', lesson: 'Individual excellence grows from team-first mentality.' },
    ],
    journalPrompts: [
      'What was your best stick skill moment today?',
      'How did you communicate with teammates on defense?',
      'What did you do when a play didn\'t go as planned?',
      'Rate your draw control performance today (1-10). What can improve?',
      'Describe a moment where you trusted a teammate and it paid off.',
      'What\'s one dodge move you want to master this week?',
    ]
  },
  swimming: {
    name: 'Swimming',
    emoji: '🏊‍♀️',
    color: '#0891B2',
    colorLight: '#ECFEFF',
    colorMid: '#67E8F9',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 50%, #22D3EE 100%)',
    positions: ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly', 'IM'],
    skills: [
      'Starts & Dives', 'Flip Turns', 'Open Turns', 'Underwater Dolphin Kicks',
      'Stroke Technique', 'Breathing Pattern', 'Pacing', 'Kick Efficiency',
      'Pull Strength', 'Streamline Position', 'Race Strategy', 'Split Management'
    ],
    drills: [
      { name: 'Catch-Up Drill', desc: 'One arm stays extended until the other completes a full stroke — isolates catch and pull mechanics', duration: '200m' },
      { name: 'Vertical Kicking', desc: 'Kick in deep water staying vertical — builds core and kick power without wall assistance', duration: '4x30 sec' },
      { name: 'Underwater Streamline', desc: 'Push off wall in tight streamline with dolphin kicks — maximize distance off every wall', duration: '8x25m' },
      { name: 'Descend Set', desc: 'Swim each repeat faster than the last — trains pacing awareness and negative splitting', duration: '4x100m' },
      { name: 'Single Arm Butterfly', desc: 'One arm butterfly with the other at side — focuses on timing and body undulation', duration: '4x50m' },
      { name: 'Sprint-Recovery', desc: '25m all-out sprint + 75m easy — builds race speed and teaches pace differentiation', duration: '6x100m' },
    ],
    mindsetTips: [
      { title: 'Trust the Taper', tip: 'When training volume drops before a big meet, trust the process. Your body is absorbing all the work you\'ve done. Rest is part of the plan.' },
      { title: 'Race Your Own Lane', tip: 'Peripheral vision is the enemy mid-race. Focus on your stroke count, your turns, your walls. Your lane is the only lane that matters.' },
      { title: 'Pain is Temporary, PRs are Forever', tip: 'The last 25 meters will hurt. That\'s where the magic happens. Train your brain to push through the wall, not just to it.' },
      { title: 'Walls Win Races', tip: 'The difference between 1st and 3rd is often turns and finishes, not mid-pool speed. Attack every wall like it\'s the finish.' },
      { title: 'Love the Process', tip: 'Some days the water feels heavy. That\'s okay. Show up, do the work, and trust that the times will follow.' },
    ],
    roleModels: [
      { name: 'Katie Ledecky', achievement: '7x Olympic Gold Medalist', quote: 'Set your goals high, and don\'t stop until you get there.', lesson: 'Relentless consistency and work ethic can redefine what\'s possible.' },
      { name: 'Simone Manuel', achievement: 'First Black Woman to Win Individual Olympic Swimming Gold', quote: 'I hope I can be an inspiration to people who don\'t look like the typical swimmer.', lesson: 'Breaking barriers starts with believing you belong.' },
      { name: 'Missy Franklin', achievement: '5x Olympic Gold Medalist', quote: 'I swim because I love it. That\'s the simplest and truest thing I can say.', lesson: 'Joy is the most sustainable fuel for long-term excellence.' },
      { name: 'Summer McIntosh', achievement: 'Youngest World Record Holder in Modern Era', quote: 'I\'m just trying to get better every single day.', lesson: 'Age is not a limit — daily improvement is all that matters.' },
    ],
    journalPrompts: [
      'How did your turns and streamlines feel today?',
      'What was your stroke count per length? Can you reduce it?',
      'Rate your effort on the main set (1-10). Did you push through the hard part?',
      'What did your coach say today that stuck with you?',
      'Describe how the water felt — heavy, smooth, fast?',
      'What\'s one technique correction you\'re focusing on this week?',
    ]
  }
};

// ─── Utilities ───────────────────────────────────────────────
const getDate = () => new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ─── Components ──────────────────────────────────────────────

function WaveBG({ color }) {
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '40vh', zIndex: 0, opacity: 0.12, pointerEvents: 'none' }}>
      <svg viewBox="0 0 1440 320" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
        <path fill={color} d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,154.7C672,149,768,171,864,186.7C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
        <path fill={color} opacity="0.5" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,160C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
      </svg>
    </div>
  );
}

function SportSelector({ currentSport, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      {Object.entries(SPORTS).map(([key, sport]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          style={{
            flex: 1,
            padding: '10px 12px',
            borderRadius: 12,
            border: currentSport === key ? `2px solid ${sport.color}` : '2px solid #E5E7EB',
            background: currentSport === key ? sport.colorLight : '#FFF',
            color: currentSport === key ? sport.color : '#6B7280',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          {sport.emoji} {sport.name}
        </button>
      ))}
    </div>
  );
}

function NavBar({ activeTab, onTabChange, sport }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'journal', label: 'Journal', icon: '📝' },
    { id: 'drills', label: 'Drills', icon: '💪' },
    { id: 'mindset', label: 'Mindset', icon: '🧠' },
    { id: 'heroes', label: 'Heroes', icon: '⭐' },
  ];
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(0,0,0,0.06)', padding: '6px 0 env(safe-area-inset-bottom, 8px) 0',
      display: 'flex', justifyContent: 'space-around',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
            color: activeTab === tab.id ? sport.color : '#9CA3AF',
            transition: 'all 0.2s ease',
          }}
        >
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.02em',
            fontFamily: "'Outfit', sans-serif",
          }}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ─── Home Tab ────────────────────────────────────────────────
function HomeTab({ sport, sportKey, entries, onNavigate }) {
  const streak = calculateStreak(entries);
  const totalEntries = entries.length;
  const weekEntries = entries.filter(e => {
    const d = new Date(e.date);
    const now = new Date();
    const diff = (now - d) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  return (
    <div style={{ padding: '20px 20px 100px' }}>
      {/* Header Card */}
      <div style={{
        background: sport.gradient, borderRadius: 20, padding: '28px 24px',
        color: '#FFF', marginBottom: 20, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 100, opacity: 0.15 }}>{sport.emoji}</div>
        <p style={{ fontSize: 14, opacity: 0.85, fontFamily: "'Outfit', sans-serif", margin: 0 }}>{getDate()}</p>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: '8px 0 4px', fontFamily: "'Outfit', sans-serif", lineHeight: 1.2 }}>
          Ready to be clutch? {sport.emoji}
        </h1>
        <p style={{ fontSize: 14, opacity: 0.9, margin: 0, fontFamily: "'Outfit', sans-serif" }}>
          Every rep, every set, every practice — it all adds up.
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Streak', value: `${streak}🔥`, sub: 'days' },
          { label: 'This Week', value: weekEntries, sub: 'entries' },
          { label: 'Total', value: totalEntries, sub: 'logged' },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1, background: '#FFF', borderRadius: 16, padding: '16px 12px',
            textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: sport.color, fontFamily: "'Outfit', sans-serif" }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1F2937', marginBottom: 12, fontFamily: "'Outfit', sans-serif" }}>Quick Actions</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { label: 'Log Today\'s Training', icon: '📝', tab: 'journal', desc: 'Record what you worked on' },
          { label: 'Get a Drill', icon: '💪', tab: 'drills', desc: 'Find your next skill builder' },
          { label: 'Mindset Check-in', icon: '🧠', tab: 'mindset', desc: 'Strengthen your mental game' },
          { label: 'Role Model Inspiration', icon: '⭐', tab: 'heroes', desc: 'Learn from the best' },
        ].map((action, i) => (
          <button
            key={i}
            onClick={() => onNavigate(action.tab)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14, background: '#FFF',
              borderRadius: 14, padding: '14px 16px', border: '1px solid #F3F4F6',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            <span style={{ fontSize: 28, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: sport.colorLight, borderRadius: 12 }}>{action.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1F2937', fontFamily: "'Outfit', sans-serif" }}>{action.label}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', fontFamily: "'Outfit', sans-serif" }}>{action.desc}</div>
            </div>
            <span style={{ marginLeft: 'auto', color: '#D1D5DB', fontSize: 18 }}>›</span>
          </button>
        ))}
      </div>

      {/* Daily Quote */}
      <div style={{
        marginTop: 20, background: sport.colorLight, borderRadius: 16,
        padding: '18px 20px', borderLeft: `4px solid ${sport.color}`,
      }}>
        <p style={{ fontSize: 13, fontStyle: 'italic', color: '#4B5563', margin: 0, lineHeight: 1.6, fontFamily: "'Outfit', sans-serif" }}>
          "{getRandomItem(sport.mindsetTips).tip}"
        </p>
      </div>
    </div>
  );
}

// ─── Journal Tab ─────────────────────────────────────────────
function JournalTab({ sport, sportKey, entries, setEntries }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ focus: '', rating: 7, skills: [], notes: '', prompt: '' });

  const handleSubmit = () => {
    if (!form.notes.trim()) return;
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      sport: sportKey,
      ...form,
    };
    setEntries(prev => [newEntry, ...prev]);
    setForm({ focus: '', rating: 7, skills: [], notes: '', prompt: '' });
    setShowForm(false);
  };

  const sportEntries = entries.filter(e => e.sport === sportKey);

  if (showForm) {
    const prompt = getRandomItem(sport.journalPrompts);
    return (
      <div style={{ padding: '20px 20px 100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>←</button>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1F2937', margin: 0, fontFamily: "'Outfit', sans-serif" }}>New Entry</h2>
        </div>

        {/* Prompt */}
        <div style={{ background: sport.colorLight, borderRadius: 14, padding: '14px 16px', marginBottom: 16, borderLeft: `3px solid ${sport.color}` }}>
          <p style={{ fontSize: 12, color: sport.color, fontWeight: 700, margin: '0 0 4px', fontFamily: "'Outfit', sans-serif" }}>TODAY'S PROMPT</p>
          <p style={{ fontSize: 13, color: '#4B5563', margin: 0, fontFamily: "'Outfit', sans-serif" }}>{prompt}</p>
        </div>

        {/* Focus Area */}
        <label style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', marginBottom: 6, display: 'block', fontFamily: "'Outfit', sans-serif" }}>FOCUS AREA</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {sport.positions.map(pos => (
            <button
              key={pos}
              onClick={() => setForm({ ...form, focus: pos })}
              style={{
                padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                border: form.focus === pos ? `2px solid ${sport.color}` : '2px solid #E5E7EB',
                background: form.focus === pos ? sport.colorLight : '#FFF',
                color: form.focus === pos ? sport.color : '#6B7280',
                cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
              }}
            >{pos}</button>
          ))}
        </div>

        {/* Skills Worked On */}
        <label style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', marginBottom: 6, display: 'block', fontFamily: "'Outfit', sans-serif" }}>SKILLS WORKED ON</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {sport.skills.map(skill => (
            <button
              key={skill}
              onClick={() => {
                const skills = form.skills.includes(skill) ? form.skills.filter(s => s !== skill) : [...form.skills, skill];
                setForm({ ...form, skills });
              }}
              style={{
                padding: '5px 12px', borderRadius: 16, fontSize: 11, fontWeight: 600,
                border: form.skills.includes(skill) ? `2px solid ${sport.color}` : '1px solid #E5E7EB',
                background: form.skills.includes(skill) ? sport.colorLight : '#FAFAFA',
                color: form.skills.includes(skill) ? sport.color : '#9CA3AF',
                cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
              }}
            >{skill}</button>
          ))}
        </div>

        {/* Effort Rating */}
        <label style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', marginBottom: 8, display: 'block', fontFamily: "'Outfit', sans-serif" }}>
          EFFORT LEVEL: <span style={{ color: sport.color, fontSize: 16 }}>{form.rating}/10</span>
        </label>
        <input
          type="range" min="1" max="10" value={form.rating}
          onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
          style={{ width: '100%', marginBottom: 16, accentColor: sport.color }}
        />

        {/* Notes */}
        <label style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', marginBottom: 6, display: 'block', fontFamily: "'Outfit', sans-serif" }}>NOTES & REFLECTIONS</label>
        <textarea
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="What happened today? What did you learn? How did it feel?"
          style={{
            width: '100%', minHeight: 120, borderRadius: 14, border: '2px solid #E5E7EB',
            padding: 14, fontSize: 14, resize: 'vertical', fontFamily: "'Outfit', sans-serif",
            outline: 'none', boxSizing: 'border-box',
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: '100%', padding: '14px', borderRadius: 14, border: 'none',
            background: sport.gradient, color: '#FFF', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', marginTop: 16, fontFamily: "'Outfit', sans-serif",
          }}
        >Save Entry ✓</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 20px 100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1F2937', margin: 0, fontFamily: "'Outfit', sans-serif" }}>
          {sport.emoji} Training Journal
        </h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: sport.gradient, color: '#FFF', border: 'none', borderRadius: 12,
            padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            fontFamily: "'Outfit', sans-serif",
          }}
        >+ New</button>
      </div>

      {sportEntries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9CA3AF' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{sport.emoji}</div>
          <p style={{ fontSize: 15, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>No entries yet!</p>
          <p style={{ fontSize: 13, fontFamily: "'Outfit', sans-serif" }}>Tap "+ New" to log your first training session.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sportEntries.map(entry => (
            <div key={entry.id} style={{
              background: '#FFF', borderRadius: 14, padding: '14px 16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: `3px solid ${sport.color}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
                  {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: sport.color, background: sport.colorLight, padding: '2px 10px', borderRadius: 10, fontFamily: "'Outfit', sans-serif" }}>
                  {entry.rating}/10
                </span>
              </div>
              {entry.focus && <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 4, fontFamily: "'Outfit', sans-serif" }}>{entry.focus}</div>}
              <p style={{ fontSize: 13, color: '#6B7280', margin: '4px 0 0', lineHeight: 1.5, fontFamily: "'Outfit', sans-serif" }}>{entry.notes}</p>
              {entry.skills.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                  {entry.skills.map(s => (
                    <span key={s} style={{
                      fontSize: 10, background: sport.colorLight, color: sport.color,
                      padding: '2px 8px', borderRadius: 8, fontWeight: 600, fontFamily: "'Outfit', sans-serif",
                    }}>{s}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Drills Tab ──────────────────────────────────────────────
function DrillsTab({ sport }) {
  const [activeDrill, setActiveDrill] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [timerRunning]);

  const formatTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  return (
    <div style={{ padding: '20px 20px 100px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1F2937', margin: '0 0 6px', fontFamily: "'Outfit', sans-serif" }}>
        {sport.emoji} Skill Drills
      </h2>
      <p style={{ fontSize: 13, color: '#9CA3AF', margin: '0 0 20px', fontFamily: "'Outfit', sans-serif" }}>
        Targeted drills to level up your game
      </p>

      {/* Timer */}
      <div style={{
        background: '#FFF', borderRadius: 16, padding: '20px', marginBottom: 20, textAlign: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', marginBottom: 4, letterSpacing: '0.05em', fontFamily: "'Outfit', sans-serif" }}>DRILL TIMER</div>
        <div style={{ fontSize: 42, fontWeight: 800, color: sport.color, fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em' }}>
          {formatTime(seconds)}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10 }}>
          <button
            onClick={() => setTimerRunning(!timerRunning)}
            style={{
              padding: '8px 24px', borderRadius: 10, border: 'none',
              background: timerRunning ? '#EF4444' : sport.gradient,
              color: '#FFF', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
            }}
          >{timerRunning ? 'Pause' : 'Start'}</button>
          <button
            onClick={() => { setTimerRunning(false); setSeconds(0); }}
            style={{
              padding: '8px 18px', borderRadius: 10, border: '2px solid #E5E7EB',
              background: '#FFF', color: '#6B7280', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
            }}
          >Reset</button>
        </div>
      </div>

      {/* Drill Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sport.drills.map((drill, i) => (
          <button
            key={i}
            onClick={() => setActiveDrill(activeDrill === i ? null : i)}
            style={{
              background: '#FFF', borderRadius: 14, padding: '16px',
              border: activeDrill === i ? `2px solid ${sport.color}` : '1px solid #F3F4F6',
              cursor: 'pointer', textAlign: 'left',
              boxShadow: activeDrill === i ? `0 4px 16px ${sport.color}20` : '0 1px 4px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', fontFamily: "'Outfit', sans-serif" }}>{drill.name}</div>
              <span style={{
                fontSize: 11, fontWeight: 700, color: sport.color, background: sport.colorLight,
                padding: '3px 10px', borderRadius: 8, fontFamily: "'Outfit', sans-serif",
              }}>{drill.duration}</span>
            </div>
            {activeDrill === i && (
              <p style={{ fontSize: 13, color: '#6B7280', margin: '10px 0 0', lineHeight: 1.6, fontFamily: "'Outfit', sans-serif" }}>
                {drill.desc}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Mindset Tab ─────────────────────────────────────────────
function MindsetTab({ sport }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div style={{ padding: '20px 20px 100px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1F2937', margin: '0 0 6px', fontFamily: "'Outfit', sans-serif" }}>
        🧠 Mental Game
      </h2>
      <p style={{ fontSize: 13, color: '#9CA3AF', margin: '0 0 20px', fontFamily: "'Outfit', sans-serif" }}>
        Champions are built between the ears
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sport.mindsetTips.map((tip, i) => (
          <div
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            style={{
              background: '#FFF', borderRadius: 16, padding: '18px 20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)', cursor: 'pointer',
              borderLeft: expanded === i ? `4px solid ${sport.color}` : '4px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', margin: 0, fontFamily: "'Outfit', sans-serif" }}>{tip.title}</h3>
              <span style={{ color: '#D1D5DB', fontSize: 16, transition: 'transform 0.2s', transform: expanded === i ? 'rotate(90deg)' : 'none' }}>›</span>
            </div>
            {expanded === i && (
              <p style={{ fontSize: 13, color: '#6B7280', margin: '12px 0 0', lineHeight: 1.7, fontFamily: "'Outfit', sans-serif" }}>
                {tip.tip}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Breathing Exercise */}
      <div style={{
        marginTop: 24, background: sport.gradient, borderRadius: 18, padding: '24px 20px',
        color: '#FFF', textAlign: 'center',
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 8px', fontFamily: "'Outfit', sans-serif" }}>Pre-Game Breathing</h3>
        <p style={{ fontSize: 13, opacity: 0.9, margin: '0 0 4px', fontFamily: "'Outfit', sans-serif" }}>
          Box Breathing: Inhale 4s → Hold 4s → Exhale 4s → Hold 4s
        </p>
        <p style={{ fontSize: 12, opacity: 0.75, margin: 0, fontFamily: "'Outfit', sans-serif" }}>
          Do 4 rounds before your next game or race to center your focus.
        </p>
      </div>
    </div>
  );
}

// ─── Heroes Tab ──────────────────────────────────────────────
function HeroesTab({ sport }) {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ padding: '20px 20px 100px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1F2937', margin: '0 0 6px', fontFamily: "'Outfit', sans-serif" }}>
        ⭐ Role Models
      </h2>
      <p style={{ fontSize: 13, color: '#9CA3AF', margin: '0 0 20px', fontFamily: "'Outfit', sans-serif" }}>
        Learn from those who paved the way
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sport.roleModels.map((hero, i) => (
          <div
            key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            style={{
              background: '#FFF', borderRadius: 16, padding: '18px 20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: selected === i ? `2px solid ${sport.color}` : '2px solid transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: sport.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, color: '#FFF', fontWeight: 800, flexShrink: 0,
                fontFamily: "'Outfit', sans-serif",
              }}>{hero.name.split(' ').map(n => n[0]).join('')}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', fontFamily: "'Outfit', sans-serif" }}>{hero.name}</div>
                <div style={{ fontSize: 11, color: sport.color, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>{hero.achievement}</div>
              </div>
              <span style={{ color: '#D1D5DB', fontSize: 16, transition: 'transform 0.2s', transform: selected === i ? 'rotate(90deg)' : 'none' }}>›</span>
            </div>

            {selected === i && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #F3F4F6' }}>
                <div style={{
                  background: sport.colorLight, borderRadius: 12, padding: '14px 16px', marginBottom: 10,
                }}>
                  <p style={{ fontSize: 13, fontStyle: 'italic', color: '#4B5563', margin: 0, lineHeight: 1.6, fontFamily: "'Outfit', sans-serif" }}>
                    "{hero.quote}"
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>💡</span>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: 0, lineHeight: 1.6, fontFamily: "'Outfit', sans-serif" }}>
                    <strong style={{ color: '#374151' }}>Lesson:</strong> {hero.lesson}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Helper: Streak Calculator ───────────────────────────────
function calculateStreak(entries) {
  if (entries.length === 0) return 0;
  const dates = [...new Set(entries.map(e => new Date(e.date).toDateString()))].sort((a, b) => new Date(b) - new Date(a));
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < dates.length; i++) {
    const check = new Date(today);
    check.setDate(check.getDate() - i);
    if (dates.includes(check.toDateString())) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

// ─── Main App ────────────────────────────────────────────────
export default function ClutchApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [sportKey, setSportKey] = useState('lacrosse');
  const [entries, setEntries] = useState(() => {
    // In-memory storage only (no localStorage in Claude artifacts)
    return [];
  });

  const sport = SPORTS[sportKey];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F9FAFB',
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      maxWidth: 480,
      margin: '0 auto',
      position: 'relative',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <WaveBG color={sport.color} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Sport Selector (shown on all tabs) */}
        <div style={{ padding: '16px 20px 0' }}>
          <SportSelector currentSport={sportKey} onSelect={setSportKey} />
        </div>

        {activeTab === 'home' && <HomeTab sport={sport} sportKey={sportKey} entries={entries} onNavigate={setActiveTab} />}
        {activeTab === 'journal' && <JournalTab sport={sport} sportKey={sportKey} entries={entries} setEntries={setEntries} />}
        {activeTab === 'drills' && <DrillsTab sport={sport} />}
        {activeTab === 'mindset' && <MindsetTab sport={sport} />}
        {activeTab === 'heroes' && <HeroesTab sport={sport} />}
      </div>
      <NavBar activeTab={activeTab} onTabChange={setActiveTab} sport={sport} />
    </div>
  );
}

// chrome.jsx — header, footer, sticky quote bar, chat, lightbox

const NAV_ITEMS = [
  { key: 'home',      label: 'Home' },
  { key: 'services',  label: 'Services' },
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'about',     label: 'About' },
  { key: 'testimonials', label: 'Reviews' },
  { key: 'financing', label: 'Financing' },
  { key: 'contact',   label: 'Contact' },
];

function ArrowRight({ size = 14 }){
  return (
    <svg className="arrow" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

function Logo({ inFooter = false }){
  return (
    <a href="#/home" className="brand" onClick={(e) => { e.preventDefault(); window.location.hash = '#/home'; }}>
      <div className="name">
        <b>SoFlo Bathroom Remodel</b>
      </div>
    </a>
  );
}

function Header({ route, onNav }){
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => { setMobileOpen(false); }, [route]);

  return (
    <header className="site-header">
      <div className="wrap row">
        <Logo />
        <nav className="nav desktop">
          {NAV_ITEMS.map(item => (
            <a key={item.key}
               href={'#/' + item.key}
               className={route === item.key ? 'active' : ''}
               onClick={(e) => { e.preventDefault(); onNav(item.key); }}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-cta">
          <a className="header-phone" href="tel:+13478243784">
            <span className="dot"></span>
            <span className="full">(347) 824-3784</span>
          </a>
          <a className="btn primary" href="#/contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }}>
            Free Consult <ArrowRight />
          </a>
          <button
            className="mobile-only btn ghost"
            style={{ padding: '10px 14px' }}
            onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="wrap" style={{ paddingBottom: 18 }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {NAV_ITEMS.map(item => (
              <a key={item.key}
                 href={'#/' + item.key}
                 onClick={(e) => { e.preventDefault(); onNav(item.key); }}
                 style={{
                   padding: '12px 14px',
                   textDecoration: 'none',
                   color: route === item.key ? 'var(--terracotta)' : 'var(--ink-soft)',
                   borderRadius: 8,
                   fontWeight: 500
                 }}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer({ onNav }){
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Logo inFooter />
            <p className="body" style={{ color: 'rgba(245,239,230,.78)', marginTop: 18, maxWidth: '36ch' }}>
              South Florida's specialist in heirloom-grade bathroom renovation. A small Fort Lauderdale family business since 2010.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {['IG','FB','HZ','YT'].map(s => (
                <a key={s} href="#" style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: '1px solid rgba(245,239,230,.2)',
                  display: 'grid', placeItems: 'center',
                  fontSize: 11, fontWeight: 600, textDecoration: 'none'
                }}>{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4>Sitemap</h4>
            <ul>
              {NAV_ITEMS.map(i => (
                <li key={i.key}>
                  <a href={'#/' + i.key} onClick={(e) => { e.preventDefault(); onNav(i.key); }}>{i.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="#/services">Master Bath Remodel</a></li>
              <li><a href="#/services">Spa & Wet Rooms</a></li>
              <li><a href="#/services">Powder & Guest Baths</a></li>
              <li><a href="#/services">Walk-In Showers</a></li>
              <li><a href="#/services">Custom Vanities</a></li>
            </ul>
          </div>
          <div>
            <h4>Visit / Call</h4>
            <ul>
              <li><a href="tel:+13478243784">(347) 824-3784</a></li>
              <li><a href="mailto:hello@soflobath.co">hello@soflobath.co</a></li>
              <li style={{ color: 'rgba(245,239,230,.65)', fontSize: 14 }}>1525 SE 17th St<br/>Fort Lauderdale, FL 33316</li>
              <li style={{ color: 'rgba(245,239,230,.65)', fontSize: 14, marginTop: 6 }}>Mon–Fri 9–6 · Sat by appt.</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 SoFlo Bathroom Remodel · FL License #CGC-1525043 · Insured & Bonded</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none', opacity: .8 }}>Privacy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none', opacity: .8 }}>Terms</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none', opacity: .8 }}>Warranty</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================ */
/* Sticky quote bar — appears after the user scrolls past hero  */
/* ============================================================ */

function StickyQuoteBar({ onNav }){
  const [visible, setVisible] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (dismissed) return;
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div className={'quote-bar' + (visible ? ' visible' : '')}>
      <div className="text">
        <strong>Ready to remodel?</strong>
        <span className="sep"></span>
        <span className="sub">Free in-home consultation — no obligation.</span>
      </div>
      <a className="btn primary" href="#/contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }}>
        Get a quote <ArrowRight />
      </a>
      <button className="x" onClick={() => setDismissed(true)} aria-label="Dismiss">×</button>
    </div>
  );
}

/* ============================================================ */
/* Live chat                                                     */
/* ============================================================ */

function ChatWidget(){
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { from: 'bot', text: "Hi there 👋 Thanks for stopping by SoFlo Bathroom Remodel — anything I can help with today?" },
  ]);
  const [input, setInput] = React.useState('');
  const bodyRef = React.useRef(null);

  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

  const send = (text) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { from: 'me', text }]);
    setInput('');
    setTimeout(() => {
      const reply = text.toLowerCase().includes('cost') || text.toLowerCase().includes('price') || text.toLowerCase().includes('estimate') || text.toLowerCase().includes('quote')
        ? "We give written estimates after a free in-home walkthrough — every bathroom's different, and we'd rather quote you accurately than guess. Want me to set up a visit?"
        : text.toLowerCase().includes('timeline') || text.toLowerCase().includes('long')
          ? "Typical timelines: 3 weeks for a powder room, 6–9 weeks for a full primary bath, 10+ weeks if we're moving plumbing walls. We'll nail it down once we see the space."
          : text.toLowerCase().includes('consult') || text.toLowerCase().includes('visit')
            ? "Great — drop your number on the contact page or call (347) 824-3784 and we'll book the walkthrough this week."
            : "Thanks for reaching out. We'll get back to you within an hour during business hours. Anything else I can answer in the meantime?";
      setMessages(m => [...m, { from: 'bot', text: reply }]);
    }, 900);
  };

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen(o => !o)} aria-label="Chat with us">
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        )}
        {!open && <span className="badge">1</span>}
      </button>
      {open && (
        <div className="chat-panel">
          <div className="head">
            <div className="avatar" style={{ background: 'var(--terracotta)', display: 'grid', placeItems: 'center', color: '#fff', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18 }}>M</div>
            <div className="who">
              <b>SoFlo Bathroom Remodel</b>
              <span>Online · replies in ~3 min</span>
            </div>
          </div>
          <div className="body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={'chat-msg ' + m.from}>{m.text}</div>
            ))}
          </div>
          <div className="chat-quick">
            <button onClick={() => send("Can you visit my home?")}>Schedule a visit</button>
            <button onClick={() => send("How long does a bathroom take?")}>Timeline?</button>
            <button onClick={() => send("What services do you offer?")}>Services</button>
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder="Type a message…" />
            <button onClick={() => send(input)} aria-label="Send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================ */
/* Lightbox — global, controlled via window.openLightbox(...)   */
/* ============================================================ */

function Lightbox(){
  const [state, setState] = React.useState({ open: false, items: [], index: 0 });

  React.useEffect(() => {
    window.openLightbox = (items, index = 0) => setState({ open: true, items, index });
    const onKey = (e) => {
      if (!state.open) return;
      if (e.key === 'Escape') setState(s => ({ ...s, open: false }));
      if (e.key === 'ArrowRight') setState(s => ({ ...s, index: (s.index + 1) % s.items.length }));
      if (e.key === 'ArrowLeft') setState(s => ({ ...s, index: (s.index - 1 + s.items.length) % s.items.length }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.open, state.items.length]);

  const item = state.items[state.index];

  return (
    <div className={'lightbox' + (state.open ? ' open' : '')} onClick={() => setState(s => ({ ...s, open: false }))}>
      {state.open && item && (
        <>
          <div className="lb-counter">{String(state.index + 1).padStart(2,'0')} / {String(state.items.length).padStart(2,'0')}</div>
          <button className="lb-close" onClick={() => setState(s => ({ ...s, open: false }))}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
          </button>
          <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); setState(s => ({ ...s, index: (s.index - 1 + s.items.length) % s.items.length })); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); setState(s => ({ ...s, index: (s.index + 1) % s.items.length })); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <img src={item.src} alt={item.caption || ''} onClick={(e) => e.stopPropagation()} />
          {item.caption && <div className="lb-caption">{item.caption}</div>}
        </>
      )}
    </div>
  );
}

Object.assign(window, { Header, Footer, StickyQuoteBar, ChatWidget, Lightbox, ArrowRight, NAV_ITEMS, Logo });

// widgets.jsx — interactive cost estimator, project timeline visualizer,
//                gallery cards, before/after, marquee, etc.

/* ============================================================ */
/* Cost Estimator                                                */
/* ============================================================ */
function CostEstimator(){
  const [size, setSize] = React.useState(180);       // sq ft
  const [tier, setTier] = React.useState('signature'); // refresh | signature | bespoke
  const [layout, setLayout] = React.useState(false);  // walls
  const [appliances, setAppliances] = React.useState(true);
  const [stone, setStone] = React.useState('quartz'); // laminate | quartz | marble
  const [cabinets, setCabinets] = React.useState('semi'); // stock | semi | custom

  const tiers = {
    refresh:   { name: 'Refresh',   base: 220, label: 'Cabinet faces, counters, paint' },
    signature: { name: 'Signature', base: 380, label: 'Full remodel, same footprint' },
    bespoke:   { name: 'Bespoke',   base: 580, label: 'Re-architected, premium finishes' },
  };
  const stoneMult = { laminate: 1, quartz: 1.18, marble: 1.34 };
  const cabMult   = { stock: 1, semi: 1.16, custom: 1.42 };

  const base = tiers[tier].base * size;
  const adj  = base * stoneMult[stone] * cabMult[cabinets];
  const total = adj + (layout ? 24000 : 0) + (appliances ? 18500 : 0);
  const low = Math.round(total * 0.92 / 1000) * 1000;
  const high = Math.round(total * 1.12 / 1000) * 1000;

  const fmt = (n) => '$' + n.toLocaleString('en-US');

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div style={{ padding: '40px 44px', borderRight: '1px solid var(--hairline)' }} className="estimator-controls">
        <div className="eyebrow">Cost Estimator</div>
        <h3 className="h-2" style={{ marginTop: 12, marginBottom: 28 }}>Get a real number.</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase' }}>Bathroom size</label>
              <span style={{ fontFamily: 'var(--f-display)', fontSize: 22, color: 'var(--terracotta)' }}>{size} <span style={{ fontSize: 13, color: 'var(--muted)' }}>sq ft</span></span>
            </div>
            <input type="range" min="80" max="600" step="10" value={size} onChange={(e) => setSize(+e.target.value)} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--muted)' }}>
              <span>Galley</span><span>Standard</span><span>Great room</span>
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10, display: 'block' }}>Scope</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {Object.entries(tiers).map(([k, v]) => (
                <button key={k}
                  onClick={() => setTier(k)}
                  style={{
                    padding: '14px 8px',
                    border: '1px solid ' + (tier === k ? 'var(--ink)' : 'var(--hairline)'),
                    background: tier === k ? 'var(--ink)' : 'var(--surface)',
                    color: tier === k ? 'var(--surface)' : 'var(--ink)',
                    borderRadius: 10,
                    cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start',
                    fontFamily: 'var(--f-sans)',
                  }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{v.name}</span>
                  <span style={{ fontSize: 11, opacity: .7, textAlign: 'left' }}>{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Countertops</label>
              <select value={stone} onChange={(e) => setStone(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--hairline)', borderRadius: 10, background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit', fontSize: 14 }}>
                <option value="laminate">Quartz laminate</option>
                <option value="quartz">Engineered quartz</option>
                <option value="marble">Natural marble</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Cabinetry</label>
              <select value={cabinets} onChange={(e) => setCabinets(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--hairline)', borderRadius: 10, background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit', fontSize: 14 }}>
                <option value="stock">Stock door style</option>
                <option value="semi">Semi-custom</option>
                <option value="custom">Bench-built custom</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid var(--hairline)', borderRadius: 10, cursor: 'pointer' }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>Moving walls / reconfiguring layout</span>
              <input type="checkbox" checked={layout} onChange={(e) => setLayout(e.target.checked)} />
            </label>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid var(--hairline)', borderRadius: 10, cursor: 'pointer' }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>Premium appliance package</span>
              <input type="checkbox" checked={appliances} onChange={(e) => setAppliances(e.target.checked)} />
            </label>
          </div>
        </div>
      </div>
      <div style={{ padding: '40px 44px', background: 'var(--ocean)', color: 'var(--surface)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="estimator-out">
        <div>
          <div className="eyebrow" style={{ color: 'var(--terracotta)' }}>Estimated investment</div>
          <div style={{ marginTop: 18, fontFamily: 'var(--f-display)', fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1, fontWeight: 400 }}>
            {fmt(low)}<span style={{ color: 'rgba(245,239,230,.6)' }}> – </span>{fmt(high)}
          </div>
          <p style={{ marginTop: 20, color: 'rgba(245,239,230,.78)', maxWidth: '36ch', fontSize: 14, lineHeight: 1.6 }}>
            Ballpark for a {tiers[tier].name.toLowerCase()} remodel at {size} sq ft with {stone === 'marble' ? 'natural marble' : stone === 'quartz' ? 'engineered quartz' : 'quartz laminate'} counters and {cabinets === 'custom' ? 'bench-built' : cabinets === 'semi' ? 'semi-custom' : 'stock-door'} cabinetry. Final pricing is fixed at design hand-off.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 32 }}>
          <a href="#/contact" className="btn primary" onClick={(e) => { e.preventDefault(); window.location.hash = '#/contact'; }}>
            Lock this in — book a consult <ArrowRight />
          </a>
          <div style={{ fontSize: 12, color: 'rgba(245,239,230,.5)', display: 'flex', gap: 16 }}>
            <span>✓ Fixed-price contract</span>
            <span>✓ No change-order surprises</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Project Timeline Visualizer                                   */
/* ============================================================ */
function TimelineVisualizer(){
  const [active, setActive] = React.useState(2);
  const phases = [
    { week: 'Week 0',   name: 'Discovery',  desc: 'In-home consult, scope alignment, lifestyle interview. We measure, photograph, and listen.', deliverable: 'Project brief + design fee proposal' },
    { week: 'Week 1–3', name: 'Design',     desc: 'Layout studies, 3D renderings, material palette, fixture spec. Iterate until you love it.', deliverable: 'Approved drawings + final material schedule' },
    { week: 'Week 3–4', name: 'Permits',    desc: 'Engineering, City of Fort Lauderdale permits, contractor licensing, HOA approvals.', deliverable: 'Pulled permits + fixed-price contract' },
    { week: 'Week 4–6', name: 'Demo',       desc: 'Protected pathways, controlled demolition, structural prep. We respect your home.', deliverable: 'Stripped, prepped jobsite' },
    { week: 'Week 5–8', name: 'Rough-in',   desc: 'Electrical, plumbing, HVAC, framing. Inspections at every milestone.', deliverable: 'Passed rough inspections' },
    { week: 'Week 7–9', name: 'Finish',     desc: 'Cabinetry, stone, tile, paint, lighting. The reveal-ready work.', deliverable: 'Punchlist walkthrough' },
    { week: 'Week 10',  name: 'Reveal',     desc: 'Final cleaning, appliance commissioning, owner orientation. The keys are yours.', deliverable: 'Lifetime workmanship warranty' },
  ];

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '32px 36px 16px', borderBottom: '1px solid var(--hairline)' }}>
        <div className="eyebrow">Project Timeline</div>
        <h3 className="h-2" style={{ marginTop: 8 }}>Ten weeks, every step accountable.</h3>
      </div>
      <div style={{ padding: '36px 36px 24px', position: 'relative' }}>
        {/* Track */}
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: `repeat(${phases.length}, 1fr)`, gap: 0 }}>
          <div style={{ position: 'absolute', left: '6%', right: '6%', top: 14, height: 2, background: 'var(--hairline)' }}></div>
          <div style={{ position: 'absolute', left: '6%', top: 14, height: 2, background: 'var(--terracotta)', width: `calc(${(active/(phases.length-1)) * 88}% )`, transition: 'width .4s' }}></div>

          {phases.map((p, i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{
                background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                position: 'relative', zIndex: 1,
              }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: i <= active ? 'var(--terracotta)' : 'var(--surface)',
                border: '2px solid ' + (i <= active ? 'var(--terracotta)' : 'var(--hairline)'),
                display: 'grid', placeItems: 'center',
                color: i <= active ? '#fff' : 'var(--muted)',
                fontSize: 12, fontWeight: 700,
                transition: 'all .2s',
              }}>
                {i + 1}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>{p.week}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: i === active ? 'var(--ink)' : 'var(--ink-soft)', textAlign: 'center', fontFamily: 'var(--f-display)', fontSize: 16 }}>
                {p.name}
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div style={{ marginTop: 40, padding: '28px 32px', background: 'var(--bg)', borderRadius: 16, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--terracotta)' }}>
              Phase {active + 1} · {phases[active].week}
            </div>
            <h4 className="h-3" style={{ marginTop: 6 }}>{phases[active].name}</h4>
            <p className="body" style={{ marginTop: 12, maxWidth: '50ch' }}>{phases[active].desc}</p>
          </div>
          <div style={{ borderLeft: '1px solid var(--hairline)', paddingLeft: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>You'll Receive</div>
            <div style={{ marginTop: 8, fontSize: 15, fontWeight: 500 }}>{phases[active].deliverable}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Before / After slider                                         */
/* ============================================================ */
function BeforeAfter({ before, after, captionA = 'After', captionB = 'Before' }){
  const [pos, setPos] = React.useState(56);
  const ref = React.useRef(null);
  const dragging = React.useRef(false);

  const update = (clientX) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  };

  React.useEffect(() => {
    const onMove = (e) => { if (dragging.current) update(e.touches ? e.touches[0].clientX : e.clientX); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <div ref={ref}
      style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 14, overflow: 'hidden', userSelect: 'none', cursor: 'ew-resize' }}
      onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; update(e.touches[0].clientX); }}>
      <img src={after} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
      <div style={{ position: 'absolute', inset: 0, width: pos + '%', overflow: 'hidden' }}>
        <img src={before} alt="" style={{ position: 'absolute', inset: 0, width: ref.current ? ref.current.getBoundingClientRect().width : '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
      </div>
      <div style={{ position: 'absolute', top: 14, left: 14, padding: '4px 12px', background: 'rgba(0,0,0,.6)', color: '#fff', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', borderRadius: 999 }}>{captionB}</div>
      <div style={{ position: 'absolute', top: 14, right: 14, padding: '4px 12px', background: 'var(--terracotta)', color: '#fff', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', borderRadius: 999 }}>{captionA}</div>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: pos + '%', width: 2, background: '#fff', boxShadow: '0 0 0 1px rgba(0,0,0,.15)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 44, height: 44, borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 6px 16px rgba(0,0,0,.25)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2"><polyline points="15 18 9 12 15 6"/><polyline points="9 18 15 12 9 6" transform="translate(6 0)"/></svg>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Signature Details — interactive cycler                        */
/* ============================================================ */
function SignatureDetails(){
  const items = [
    { k: 'steam',    label: 'Steam showers',         img: 'images/photo-08.jpg',
      body: 'Tile-lined steam generators with aromatic injectors, chromotherapy lighting, and a teak bench. The cool-down feels like Friday.' },
    { k: 'stone',    label: 'Book-matched stone',    img: 'images/photo-21.jpg',
      body: 'We hand-pick the slab with you in Hialeah, then book-match the veining floor-to-ceiling. Once placed, it never goes back.' },
    { k: 'heat',     label: 'Heated floors',         img: 'images/photo-17.jpg',
      body: 'Hydronic or electric radiant under honed marble. Programmed to warm 20 minutes before your alarm.' },
    { k: 'soak',     label: 'Soaking tubs',          img: 'images/photo-15.jpg',
      body: 'Freestanding monoliths in carved stone, copper, or hand-glazed porcelain — with floor-mount fillers and integrated chair backs.' },
    { k: 'brass',    label: 'Unlacquered brass',     img: 'images/photo-12.jpg',
      body: "Living finishes that develop a patina you'll love. Sourced from Waterworks, House of Rohl, and a tiny atelier in Long Island City." },
    { k: 'mirror',   label: 'Back-lit mirrors',      img: 'images/photo-11.jpg',
      body: 'Dimmable, anti-fog, and motion-aware. 2700K morning warm, 4000K shaving. They turn on when you walk in.' },
  ];
  const [i, setI] = React.useState(0);
  const it = items[i];

  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">Signature details</div>
            <h2 className="h-1" style={{ marginTop: 14 }}>Six things we always sweat.</h2>
          </div>
          <div className="right">
            <p className="body">Hover any detail to see how we approach it. The little things are what separate a five-star bathroom from a really nice one.</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 56, alignItems: 'stretch' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--hairline)' }}>
            {items.map((m, idx) => (
              <li key={m.k}
                onMouseEnter={() => setI(idx)}
                onClick={() => setI(idx)}
                style={{
                  borderBottom: '1px solid var(--hairline)',
                  padding: '22px 4px',
                  display: 'grid',
                  gridTemplateColumns: '56px 1fr 24px',
                  alignItems: 'center',
                  gap: 16,
                  cursor: 'pointer',
                  transition: 'padding .25s ease, background .25s ease',
                  background: i === idx ? 'linear-gradient(90deg, color-mix(in srgb, var(--terracotta) 8%, transparent), transparent)' : 'transparent',
                  paddingLeft: i === idx ? 20 : 4,
                }}>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 14, color: i === idx ? 'var(--terracotta)' : 'var(--muted)', letterSpacing: '.1em', fontWeight: 600 }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 500, color: i === idx ? 'var(--ink)' : 'var(--ink-soft)', letterSpacing: '-.01em' }}>
                  {m.label}
                </div>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={i === idx ? 'var(--terracotta)' : 'var(--muted)'} strokeWidth="1.6" strokeLinecap="round" style={{ transition: 'transform .25s', transform: i === idx ? 'translateX(2px)' : 'translateX(-4px)', opacity: i === idx ? 1 : .4 }}>
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </li>
            ))}
          </ul>
          <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', minHeight: 480 }}>
            {items.map((m, idx) => (
              <div key={m.k} style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${m.img})`, backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: i === idx ? 1 : 0,
                transform: i === idx ? 'scale(1.02)' : 'scale(1.08)',
                transition: 'opacity .5s ease, transform 1.2s ease',
              }}></div>
            ))}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.72) 100%)' }}></div>
            <div style={{ position: 'absolute', left: 28, right: 28, bottom: 28, color: '#fff' }}>
              <div className="eyebrow" style={{ color: 'var(--terracotta)' }}>Detail · {String(i + 1).padStart(2, '0')} of {String(items.length).padStart(2, '0')}</div>
              <h3 className="h-2" style={{ color: '#fff', marginTop: 8 }}>{it.label}</h3>
              <p style={{ marginTop: 12, color: 'rgba(255,255,255,.88)', fontSize: 15, maxWidth: '46ch', lineHeight: 1.55 }}>{it.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CostEstimator, TimelineVisualizer, BeforeAfter, SignatureDetails });

// pages-rest.jsx — services, portfolio, process, about, testimonials, financing, contact, blog

/* ============================================================ */
/*  SERVICES                                                      */
/* ============================================================ */
function ServicesPage({ onNav }){
  return (
    <main className="page">
      <section style={{ paddingTop: 80, paddingBottom: 64 }}>
        <div className="wrap">
          <div className="eyebrow">Services</div>
          <h1 className="h-display" style={{ marginTop: 18, maxWidth: '18ch' }}>Every kind of bathroom, beautifully done.</h1>
          <p className="lead" style={{ marginTop: 28 }}>
            We're bathroom specialists — primary suites, spa wet rooms, powder rooms, walk-in showers, custom vanities, and accessibility-forward design. One trade, done at the highest level.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          {SERVICES.map((s, i) => (
            <div key={s.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 64,
              alignItems: 'center',
              padding: '64px 0',
              borderTop: i === 0 ? 'none' : '1px solid var(--hairline)',
            }}>
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                <div className="ph" style={{ backgroundImage: `url(${s.img})`, aspectRatio: '4/3' }}>
                  <div className="corner">{s.icon}</div>
                </div>
              </div>
              <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                <div className="eyebrow">Service {s.icon}</div>
                <h2 className="h-1" style={{ marginTop: 12 }}>{s.name}</h2>
                <p className="lead" style={{ marginTop: 20 }}>{s.desc}</p>
                <ul style={{ marginTop: 28, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {s.points.map(p => (
                    <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--ink-soft)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="2.4" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 3 }}><polyline points="20 6 9 17 4 12"/></svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 32 }}>
                  <a className="link-arrow" href="#/contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }}>
                    Discuss this project <ArrowRight />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--ocean)', color: 'var(--surface)' }}>
        <div className="wrap-narrow" style={{ textAlign: 'center' }}>
          <h2 className="h-1" style={{ color: 'var(--surface)' }}>Not sure which service fits?</h2>
          <p className="lead" style={{ color: 'rgba(245,239,230,.78)', margin: '20px auto 36px' }}>
            Tell us about your space and we'll point you in the right direction. A quick call usually does it.
          </p>
          <a className="btn primary" href="#/contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }}>
            Schedule a free visit <ArrowRight />
          </a>
        </div>
      </section>
    </main>
  );
}

/* ============================================================ */
/*  PORTFOLIO                                                     */
/* ============================================================ */
function PortfolioPage(){
  const [filter, setFilter] = React.useState('all');
  const filters = ['all', 'Master Bath', 'Powder', 'Wet Room', 'Spa', 'Guest'];

  const visible = PORTFOLIO_ITEMS.filter(p => filter === 'all' || p.type.toLowerCase().includes(filter.toLowerCase()) || (filter === 'Spa' && p.type.toLowerCase().includes('spa')));

  const openLB = (i) => {
    window.openLightbox(visible.map(p => ({
      src: p.img,
      caption: `${p.title} · ${p.type} · ${p.year}`,
    })), i);
  };

  return (
    <main className="page">
      <section style={{ paddingTop: 80, paddingBottom: 48 }}>
        <div className="wrap">
          <div className="eyebrow">Portfolio</div>
          <h1 className="h-display" style={{ marginTop: 18, maxWidth: '16ch' }}>A selection of recent work.</h1>
          <p className="lead" style={{ marginTop: 28 }}>
            Fourteen hundred bathrooms in, here are a few we're especially proud of. Click any image to see more.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: 32 }}>
        <div className="wrap">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingBottom: 24, borderBottom: '1px solid var(--hairline)' }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '10px 18px',
                background: filter === f ? 'var(--ink)' : 'transparent',
                color: filter === f ? 'var(--surface)' : 'var(--ink-soft)',
                border: '1px solid ' + (filter === f ? 'var(--ink)' : 'var(--hairline)'),
                borderRadius: 999,
                fontFamily: 'var(--f-sans)',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}>
                {f === 'all' ? 'All work' : f}
              </button>
            ))}
            <div style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--muted)', alignSelf: 'center' }}>
              Showing {visible.length} of {PORTFOLIO_ITEMS.length}
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {visible.map((p, i) => (
              <button key={p.id} onClick={() => openLB(i)} style={{ background: 'transparent', border: 0, padding: 0, textAlign: 'left', cursor: 'pointer', display: 'block' }}>
                <div className="ph" style={{ backgroundImage: `url(${p.img})`, aspectRatio: i === 4 ? '1' : '4/5' }}>
                  <div className="corner">{p.type}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, alignItems: 'baseline' }}>
                  <h3 className="h-3" style={{ fontSize: 20 }}>{p.title}</h3>
                  <span style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '.1em' }}>{p.year}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>{p.type} · {p.size}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================ */
/*  PROCESS                                                       */
/* ============================================================ */
function ProcessPage({ onNav }){
  return (
    <main className="page">
      <section style={{ paddingTop: 80, paddingBottom: 64 }}>
        <div className="wrap">
          <div className="eyebrow">Our process</div>
          <h1 className="h-display" style={{ marginTop: 18, maxWidth: '18ch' }}>How we work.</h1>
          <p className="lead" style={{ marginTop: 28 }}>
            Listen first, draw twice, build once. A simple, transparent process from the first visit to the final walkthrough.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <TimelineVisualizer />
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">How we work</div>
              <h2 className="h-1" style={{ marginTop: 14 }}>Six principles we hold to.</h2>
            </div>
            <div className="right">
              <p className="body">These show up on every contract we send — and every job we run.</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { n: '01', t: 'Listen first.',        d: 'Every project starts with a sit-down conversation. We design for how you actually use the room — not how we imagine bathrooms work.' },
              { n: '02', t: 'Walk the space.',      d: "We don't quote sight unseen. A real proposal needs a real walkthrough — every bathroom has its own story." },
              { n: '03', t: 'Draw twice.',          d: 'You see the bathroom in drawings before a single stud moves. Revisions are part of the process.' },
              { n: '04', t: 'Build in-house.',      d: "Cabinetmakers, stone fabricators, tile setters — all on payroll. No finger-pointing between trades." },
              { n: '05', t: 'Communicate daily.',   d: 'Daily PM update during build weeks. You always know what happened yesterday and what happens tomorrow.' },
              { n: '06', t: 'Guarantee for life.',  d: "Lifetime workmanship warranty. If we built it and it fails, we fix it. For as long as you own the home." },
            ].map(p => (
              <div key={p.n} style={{ padding: 28, border: '1px solid var(--hairline)', borderRadius: 14, background: 'var(--bg)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--terracotta)', letterSpacing: '.12em' }}>{p.n}</div>
                  <h3 className="h-3">{p.t}</h3>
                </div>
                <p className="body" style={{ marginTop: 12, fontSize: 15 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div className="ph" style={{ backgroundImage: `url(${PHOTOS[0]})`, aspectRatio: '4/5' }}></div>
            <div>
              <div className="eyebrow">Living through the build</div>
              <h2 className="h-1" style={{ marginTop: 14 }}>We make remodeling bearable.</h2>
              <p className="lead" style={{ marginTop: 20 }}>
                We've designed the working-site experience so carefully that most clients choose to stay in the home during the build.
              </p>
              <ul style={{ marginTop: 32, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Zip-wall containment with HEPA-filtered negative pressure',
                  'Daily protected pathways from front door to bedrooms',
                  'Temporary bath plan & relocated fixtures arranged before demo starts',
                  'Single phone number — your PM, not a phone tree',
                  'End-of-day clean every workday, deep clean every Friday',
                  'Owner-approved access windows (7am – 5pm by default)',
                ].map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15, color: 'var(--ink-soft)' }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--terracotta)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--ocean)', color: 'var(--surface)' }}>
        <div className="wrap-narrow" style={{ textAlign: 'center' }}>
          <h2 className="h-1" style={{ color: 'var(--surface)' }}>Ready to get started?</h2>
          <p className="lead" style={{ color: 'rgba(245,239,230,.78)', margin: '20px auto 36px' }}>
            The free in-home visit is the first step. Book one whenever you're ready.
          </p>
          <a className="btn primary" href="#/contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }}>Schedule a visit <ArrowRight /></a>
        </div>
      </section>
    </main>
  );
}

/* ============================================================ */
/*  ABOUT                                                         */
/* ============================================================ */
function AboutPage({ onNav }){
  return (
    <main className="page">
      <section style={{ paddingTop: 80, paddingBottom: 64 }}>
        <div className="wrap">
          <div className="eyebrow">About us</div>
          <h1 className="h-display" style={{ marginTop: 18, maxWidth: '16ch' }}>A Fort Lauderdale family business.</h1>
          <p className="lead" style={{ marginTop: 28, maxWidth: '60ch' }}>
            SoFlo Bathroom Remodel has been remodeling bathrooms in Fort Lauderdale since 2010. We're a small, owner-run shop — you'll work with the same crew from the first walk-through to the final punch list.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <div className="stat"><div className="num">Since</div><div className="lbl">2010</div></div>
            <div className="stat"><div className="num">Licensed</div><div className="lbl">& fully insured</div></div>
            <div className="stat"><div className="num">Free</div><div className="lbl">in-home consultations</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 96 }}>
            <div className="ph tall" style={{ backgroundImage: `url(${PHOTOS[25]})`, aspectRatio: '4/5' }}></div>
          </div>
          <div>
            <div className="eyebrow">How we work</div>
            <h2 className="h-1" style={{ marginTop: 12 }}>One team, start to finish.</h2>
            <p className="body" style={{ marginTop: 24, fontSize: 17 }}>
              We're a small Fort Lauderdale remodeling company focused on bathrooms. No franchise, no sales team, no rotating subs. The person you meet at your kitchen table is the same person managing your project.
            </p>
            <p className="body" style={{ marginTop: 16, fontSize: 17 }}>
              We don't quote sight unseen. Every bathroom is different, so we come to your home, walk the space, listen to what you actually want, and follow up with a real written proposal a few days later.
            </p>
            <p className="body" style={{ marginTop: 16, fontSize: 17 }}>
              We're licensed and fully insured in the State of Florida, and we stand behind our workmanship in writing.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)', display: 'none' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">The team</div>
              <h2 className="h-1" style={{ marginTop: 14 }}>The people who'll actually show up.</h2>
            </div>
            <div className="right">
              <p className="body">No sales team. The person at your dining table is the person who'll run your project.</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'Design', role: 'Layout, materials, and drawings' },
              { name: 'Build',  role: 'In-house carpentry, tile, and finish work' },
              { name: 'Project Management', role: 'One point of contact, daily on-site' },
            ].map(p => (
              <div key={p.name} style={{ padding: 32, background: 'var(--bg)', border: '1px solid var(--hairline)', borderRadius: 12 }}>
                <h3 className="h-3">{p.name}</h3>
                <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 8 }}>{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap-narrow" style={{ textAlign: 'center' }}>
          <div className="eyebrow">Get in touch</div>
          <h2 className="h-1" style={{ marginTop: 18 }}>Ready to talk about your bathroom?</h2>
          <p className="lead" style={{ margin: '24px auto 36px' }}>
            Free in-home consultation — we'll come out, take a look, and follow up with a written proposal. No pressure, no obligation.
          </p>
          <a className="btn primary" href="#/contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }}>Schedule a visit <ArrowRight /></a>
        </div>
      </section>
    </main>
  );
}

/* ============================================================ */
/*  TESTIMONIALS                                                  */
/* ============================================================ */
function TestimonialsPage({ onNav }){
  return (
    <main className="page">
      <section style={{ paddingTop: 80, paddingBottom: 48 }}>
        <div className="wrap">
          <div className="eyebrow">Reviews</div>
          <h1 className="h-display" style={{ marginTop: 18, maxWidth: '16ch' }}>What our clients say.</h1>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div style={{ display: 'flex', gap: 48, alignItems: 'baseline', flexWrap: 'wrap', paddingBottom: 32, borderBottom: '1px solid var(--hairline)', marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 56, lineHeight: 1, color: 'var(--terracotta)', fontWeight: 600 }}>5<span style={{ fontSize: 28, color: 'var(--muted)' }}>/5</span></div>
              <div className="kicker" style={{ marginTop: 6 }}>Highly rated by our clients</div>
            </div>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              {['Google','Houzz','Yelp','Angi','BBB'].map(p => (
                <div key={p} style={{ fontFamily: 'var(--f-display)', fontSize: 18, color: 'var(--ink-soft)', fontWeight: 600 }}>{p}</div>
              ))}
            </div>
          </div>

          <div style={{ columnCount: 2, columnGap: 32 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ breakInside: 'avoid', marginBottom: 32, padding: 28, background: 'var(--surface)', border: '1px solid var(--hairline)', borderRadius: 14 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: 'var(--terracotta)', fontSize: 16 }}>★</span>)}
                </div>
                <p className="body" style={{ fontSize: 16, color: 'var(--ink)', lineHeight: 1.6 }}>"{t.text}"</p>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--hairline)' }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{t.project}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--ocean)', color: 'var(--surface)' }}>
        <div className="wrap-narrow" style={{ textAlign: 'center' }}>
          <h2 className="h-1" style={{ color: 'var(--surface)' }}>Your name belongs on this list.</h2>
          <p className="lead" style={{ color: 'rgba(245,239,230,.78)', margin: '20px auto 36px' }}>
            Start with a free in-home visit. We'll come out, take a look, and follow up with a real proposal.
          </p>
          <a className="btn primary" href="#/contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }}>Schedule a visit <ArrowRight /></a>
        </div>
      </section>
    </main>
  );
}

/* ============================================================ */
/*  FINANCING — no calculator, no rate numbers                    */
/* ============================================================ */
function FinancingPage({ onNav }){
  return (
    <main className="page">
      <section style={{ paddingTop: 80, paddingBottom: 64 }}>
        <div className="wrap">
          <div className="eyebrow">Financing</div>
          <h1 className="h-display" style={{ marginTop: 18, maxWidth: '16ch' }}>Pay for it, your way.</h1>
          <p className="lead" style={{ marginTop: 28 }}>
            We work with several lending partners specifically suited to home improvement, including promotional same-as-cash options on qualifying projects. Approvals are usually quick, and pre-qualification is a soft credit pull that won't impact your score.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { t: 'Promotional financing', d: 'Same-as-cash options on qualifying remodels. Ask about current promotions when we visit.', cta: 'Most popular' },
              { t: 'Home equity line',      d: "We'll connect you with our preferred regional lender. They typically move faster than the big banks.", cta: 'Lowest rate' },
              { t: 'Fixed home-improvement loan', d: 'Standard fixed-rate loans through our financing partner. Multiple term lengths available.', cta: 'Longest term' },
            ].map(o => (
              <div key={o.t} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 className="h-3">{o.t}</h3>
                <p className="body" style={{ fontSize: 14, marginTop: 10, flex: 1 }}>{o.d}</p>
                <div className="kicker" style={{ marginTop: 18, color: 'var(--terracotta)' }}>{o.cta}</div>
              </div>
            ))}
          </div>
          <p className="small" style={{ marginTop: 24, maxWidth: '64ch' }}>
            We don't earn a commission on financing — we connect you directly with our partners with no markup. Specific rates and terms come from the lender after pre-qualification.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--sand)' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div className="eyebrow">How it works</div>
            <h2 className="h-1" style={{ marginTop: 14 }}>Three steps.</h2>
          </div>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { n: '1', t: 'We meet at your home',   d: 'Free in-home visit. We scope the project so we can put a real number on paper.' },
              { n: '2', t: 'You apply with our partner', d: 'Quick online application. Pre-qualification is a soft pull and takes a few minutes.' },
              { n: '3', t: 'Pick the option that fits', d: "You choose the terms; we'll never push one option over another. Then we get to work." },
            ].map(s => (
              <li key={s.n} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 18, alignItems: 'flex-start', padding: '18px 22px', background: 'var(--surface)', border: '1px solid var(--hairline)', borderRadius: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--terracotta)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 700 }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{s.t}</div>
                  <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 4 }}>{s.d}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">FAQ</div>
              <h2 className="h-1" style={{ marginTop: 14 }}>Common financing questions.</h2>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { q: "Does applying impact my credit?", a: "Pre-qualification is a soft pull and doesn't affect your score. Only when you formally accept terms will the lender run a hard pull." },
              { q: "Can I combine financing with my own cash?", a: "Most clients do. We can structure the loan to cover any portion — design fees, materials, labor, or the full scope." },
              { q: "How fast is the process?", a: "Most home-improvement loans fund within a few days of approval. HELOCs take a bit longer to close, but our preferred lender moves faster than the big banks." },
              { q: "Will SoFlo Bathroom Remodel earn a commission?", a: "No. We're paid for the work, not the lending. We connect you directly with our partners with no markup." },
              { q: "What credit score do I need?", a: "It depends on the option and the lender. Pre-qualification will give you a real answer in minutes." },
            ].map((f, i) => (
              <details key={i} style={{ borderTop: '1px solid var(--hairline)', padding: '24px 0', cursor: 'pointer' }}>
                <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 17, fontWeight: 500, fontFamily: 'var(--f-display)', listStyle: 'none' }}>
                  {f.q}
                  <span style={{ color: 'var(--terracotta)', fontSize: 22 }}>+</span>
                </summary>
                <p className="body" style={{ marginTop: 14, maxWidth: '64ch' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--ocean)', color: 'var(--surface)' }}>
        <div className="wrap-narrow" style={{ textAlign: 'center' }}>
          <h2 className="h-1" style={{ color: 'var(--surface)' }}>Want to talk financing?</h2>
          <p className="lead" style={{ color: 'rgba(245,239,230,.78)', margin: '20px auto 36px' }}>
            We'll cover it during your free in-home visit. No pressure, no obligation.
          </p>
          <a className="btn primary" href="#/contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }}>Schedule a visit <ArrowRight /></a>
        </div>
      </section>
    </main>
  );
}

/* ============================================================ */
/*  CONTACT                                                       */
/* ============================================================ */
function ContactPage(){
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', address: '', scope: 'Master bath remodel', timeline: '3–6 months', message: '' });

  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <main className="page">
      <section style={{ paddingTop: 80, paddingBottom: 48 }}>
        <div className="wrap">
          <div className="eyebrow">Contact</div>
          <h1 className="h-display" style={{ marginTop: 18, maxWidth: '16ch' }}>Tell us about your bathroom.</h1>
          <p className="lead" style={{ marginTop: 28 }}>
            Fill out the form below or call us at <a href="tel:+13478243784" style={{ color: 'var(--terracotta)', textDecoration: 'none', borderBottom: '1px solid' }}>(347) 824-3784</a>. We respond within one business hour during shop hours.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64 }}>
          <div className="card" style={{ padding: 40 }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--terracotta)', margin: '0 auto', display: 'grid', placeItems: 'center', color: '#fff' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2 className="h-2" style={{ marginTop: 24 }}>Thank you, {form.name || 'there'}.</h2>
                <p className="body" style={{ marginTop: 12, maxWidth: '40ch', margin: '12px auto' }}>
                  We've got your details. We'll be in touch within one business day — usually faster.
                </p>
                <div style={{ marginTop: 32 }}>
                  <a className="link-arrow" href="#/portfolio" onClick={(e) => { e.preventDefault(); window.location.hash = '#/portfolio'; }}>While you wait, browse our work <ArrowRight /></a>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="eyebrow">Free in-home visit</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="field"><label>Name</label><input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} /></div>
                  <div className="field"><label>Email</label><input type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="field"><label>Phone</label><input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} /></div>
                  <div className="field"><label>Project address</label><input value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} placeholder="Fort Lauderdale, FL" /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="field">
                    <label>Project type</label>
                    <select value={form.scope} onChange={(e) => setForm({...form, scope: e.target.value})}>
                      <option>Master bath remodel</option><option>Powder / guest bath</option><option>Spa / wet room</option>
                      <option>Walk-in shower conversion</option><option>Custom vanity</option><option>Aging-in-place</option><option>Multiple baths</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Timeline</label>
                    <select value={form.timeline} onChange={(e) => setForm({...form, timeline: e.target.value})}>
                      <option>Ready now</option><option>1–3 months</option><option>3–6 months</option><option>6–12 months</option><option>Just exploring</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label>Anything we should know?</label>
                  <textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} placeholder="Tell us about the space, your style, what's on your mind…" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)', maxWidth: '32ch' }}>
                    By submitting, you agree to be contacted by SoFlo Bathroom Remodel We'll never share your details.
                  </div>
                  <button type="submit" className="btn primary">Send · Schedule a visit <ArrowRight /></button>
                </div>
              </form>
            )}
          </div>
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <div className="eyebrow">Visit us</div>
              <div style={{ marginTop: 14, fontFamily: 'var(--f-display)', fontSize: 20, lineHeight: 1.3, fontWeight: 600 }}>1525 SE 17th St<br/>Fort Lauderdale, FL 33316</div>
              <div className="body" style={{ marginTop: 12, fontSize: 14 }}>Showroom & design studio</div>
            </div>
            <div>
              <div className="eyebrow">Shop & cabinet works</div>
              <div style={{ marginTop: 14, fontFamily: 'var(--f-display)', fontSize: 20, lineHeight: 1.3, fontWeight: 600 }}>Fort Lauderdale, FL</div>
              <div className="body" style={{ marginTop: 12, fontSize: 14 }}>Serving Broward, Miami-Dade & Palm Beach</div>
            </div>
            <div>
              <div className="eyebrow">Direct lines</div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <a href="tel:+13478243784" style={{ color: 'var(--ink)', textDecoration: 'none', fontFamily: 'var(--f-display)', fontSize: 20, fontWeight: 600 }}>(347) 824-3784</a>
                <a href="mailto:hello@soflobath.co" style={{ color: 'var(--terracotta)', textDecoration: 'none', fontSize: 14 }}>hello@soflobath.co</a>
              </div>
            </div>
            <div>
              <div className="eyebrow">Service area</div>
              <div className="body" style={{ marginTop: 14, fontSize: 14 }}>
                Broward County · Miami-Dade · Palm Beach.<br/>
                Serving all of South Florida.
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ============================================================ */
/*  BLOG                                                          */
/* ============================================================ */
function BlogPage(){
  const featured = JOURNAL_POSTS[0];
  const rest = JOURNAL_POSTS.slice(1);

  return (
    <main className="page">
      <section style={{ paddingTop: 80, paddingBottom: 64 }}>
        <div className="wrap">
          <div className="eyebrow">Blog</div>
          <h1 className="h-display" style={{ marginTop: 18, maxWidth: '16ch' }}>Notes from the shop.</h1>
          <p className="lead" style={{ marginTop: 28 }}>
            Design notes, material guides, and lessons learned from years of bathroom work.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <a href="#" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center', textDecoration: 'none', color: 'inherit', padding: '32px 0', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
            <div className="ph" style={{ backgroundImage: `url(${featured.img})`, aspectRatio: '16/10' }}>
              <div className="corner">Featured</div>
            </div>
            <div>
              <div className="kicker">{featured.cat} · {featured.date} · {featured.read} read</div>
              <h2 className="h-1" style={{ marginTop: 16 }}>{featured.title}</h2>
              <p className="lead" style={{ marginTop: 20 }}>{featured.dek}</p>
              <div style={{ marginTop: 28 }}>
                <span className="link-arrow">Read article <ArrowRight /></span>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {rest.map(p => (
              <a key={p.id} href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="ph" style={{ backgroundImage: `url(${p.img})`, aspectRatio: '4/3' }}></div>
                <div className="kicker" style={{ marginTop: 18 }}>{p.cat} · {p.date} · {p.read} read</div>
                <h3 className="h-3" style={{ marginTop: 8 }}>{p.title}</h3>
                <p className="body" style={{ fontSize: 14, marginTop: 8 }}>{p.dek}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap-narrow" style={{ textAlign: 'center' }}>
          <div className="eyebrow">Newsletter</div>
          <h2 className="h-1" style={{ marginTop: 14 }}>One thoughtful email a month.</h2>
          <p className="lead" style={{ margin: '20px auto 32px' }}>Design notes, material guides, and the occasional shop story. No spam, ever.</p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: 8, maxWidth: 480, margin: '0 auto' }}>
            <input type="email" placeholder="your@email.com" style={{ flex: 1, padding: '14px 18px', border: '1px solid var(--hairline)', borderRadius: 999, background: 'var(--bg)', fontFamily: 'inherit', fontSize: 14 }} />
            <button type="submit" className="btn primary">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { ServicesPage, PortfolioPage, ProcessPage, AboutPage, TestimonialsPage, FinancingPage, ContactPage, BlogPage });

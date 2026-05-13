// pages-home.jsx — bathroom-focused
const PHOTOS = Array.from({ length: 29 }, (_, i) => 'images/photo-' + String(i).padStart(2, '0') + '.jpg');

const PORTFOLIO_ITEMS = [
  { id: 'p01', img: PHOTOS[1],  title: 'Marble Primary Suite',     type: 'Master Bath',   year: '2025', size: '420 sf' },
  { id: 'p02', img: PHOTOS[15], title: 'Coastal Spa Bath',         type: 'Spa Bath',      year: '2025', size: '510 sf' },
  { id: 'p03', img: PHOTOS[2],  title: 'Steam Wet Room',           type: 'Wet Room',      year: '2024', size: '380 sf' },
  { id: 'p04', img: PHOTOS[16], title: 'Walnut Vanity Bath',       type: 'Master Bath',   year: '2024', size: '240 sf' },
  { id: 'p05', img: PHOTOS[3],  title: 'Onyx Primary Bath',        type: 'Primary Bath',  year: '2025', size: '510 sf' },
  { id: 'p06', img: PHOTOS[12], title: 'Brass Powder Room',        type: 'Powder Room',   year: '2024', size: '60 sf'  },
  { id: 'p07', img: PHOTOS[8],  title: 'Indigo Guest Bath',        type: 'Guest Bath',    year: '2025', size: '120 sf' },
  { id: 'p08', img: PHOTOS[17], title: 'Wood Soaking Spa',         type: 'Spa Bath',      year: '2024', size: '320 sf' },
  { id: 'p09', img: PHOTOS[19], title: 'Calacatta Master',         type: 'Master Bath',   year: '2024', size: '410 sf' },
  { id: 'p10', img: PHOTOS[5],  title: 'Open Wet Room',            type: 'Wet Room',      year: '2025', size: '290 sf' },
  { id: 'p11', img: PHOTOS[10], title: 'Estate Primary Suite',     type: 'Primary Suite', year: '2025', size: '640 sf' },
  { id: 'p12', img: PHOTOS[24], title: 'Steam Shower Addition',    type: 'Spa Addition',  year: '2024', size: '290 sf' },
];

const SERVICES = [
  { id: 'master',  name: 'Master Bath Remodel',   icon: '01', desc: "From layout reconfigurations to full gut renovations. We design master baths that feel like a private spa — every morning.",          points: ['Layout & spatial design', 'Custom vanities', 'Stone & tile selection', 'Lighting & ventilation'], img: PHOTOS[16] },
  { id: 'spa',     name: 'Spa & Wet Rooms',       icon: '02', desc: "Steam showers, curbless wet rooms, soaking tubs, heated stone. Built to feel like a five-star resort and run for thirty years.",       points: ['Steam & rain showers',   'Curbless wet rooms', 'Soaking & freestanding tubs', 'Heated floors & towel rails'], img: PHOTOS[27] },
  { id: 'powder',  name: 'Powder & Guest Baths',  icon: '03', desc: "Small rooms, big moments. Powder rooms are where we get to take real swings — bold stone, jewel-like fixtures, hand-painted finishes.", points: ['Statement stone & paneling','Designer fixtures',  'Custom millwork',          'Specialty wallcoverings'], img: PHOTOS[18] },
  { id: 'walk-in', name: 'Walk-In Showers',       icon: '04', desc: "Tub-to-shower conversions and curbless walk-ins, engineered for proper drainage and built with bookmatched slab walls when you want them.", points: ['Tub-to-shower conversions','Curbless installs',   'Linear & hidden drains',   'Bookmatched slab walls'], img: PHOTOS[14] },
  { id: 'aging',   name: 'Aging-In-Place',        icon: '05', desc: "Accessibility done beautifully. Zero-threshold showers, hidden grab bars, and seated benches that look like they belong in a magazine.",   points: ['Zero-threshold showers',  'Concealed grab bars', 'Comfort-height fixtures',  'Slip-resistant honed stone'], img: PHOTOS[0]  },
  { id: 'vanity',  name: 'Custom Vanities',       icon: '06', desc: "Custom-built vanities tailored to your space. Soft-close everywhere, dovetailed drawers, finishes that survive South Florida humidity.", points: ['Hand-selected veneers', 'Inset & overlay doors','Integrated stone tops',  'Lifetime workmanship warranty'], img: PHOTOS[11] },
];

const TESTIMONIALS = [
  { name: 'E. R.',   text: "We interviewed five firms. SoFlo was the only one who came back with a layout idea we hadn't thought of — relocating the tub to the window wall completely changed how the room feels at 7am. They were on time and the marble work is exceptional.", project: 'Marble Primary Suite' },
  { name: 'A. M.',        text: "Three contractors had walked the job before SoFlo. Their team spent two hours measuring and asking about how we actually use the space before giving us a number. The wet room finished a week early.", project: 'Steam Wet Room' },
  { name: 'J. & W. B.', text: "Living through a full primary-suite reno with two kids under five sounded impossible. Their project manager communicated every single day. We came home to a finished bathroom and the dust was already gone.", project: 'Coastal Spa Bath' },
  { name: 'S. V.',          text: "I'm picky. I sent them three Pinterest boards and a sketch on a napkin. They translated it better than my architect did. The book-matched onyx shower wall is a piece of art.", project: 'Onyx Primary Bath' },
  { name: 'P. O.',       text: "Their financing partner saved us months versus going through our bank. We got into walnut vanities and unlacquered brass we thought we couldn't afford.", project: 'Walnut Vanity Bath' },
  { name: 'R. & S. K.',    text: "You can feel the standard. Nothing was 'good enough' — every grout line, every drawer pull, sweated. It shows.", project: 'Estate Primary Suite' },
];

const JOURNAL_POSTS = [];

/* ============================================================ */
/*  HOME                                                          */
/* ============================================================ */
function HomePage({ onNav, heroLayout }){
  const heroImg = PHOTOS[16];

  return (
    <main className="page">
      {/* HERO */}
      {heroLayout === 'split' && (
        <section style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="eyebrow">Fort Lauderdale · Serving Broward, Miami-Dade & Palm Beach</div>
              <h1 className="h-display" style={{ marginTop: 18 }}>
                Bathroom remodeling, done right the first time.
              </h1>
              <p className="lead" style={{ marginTop: 28 }}>
                A Fort Lauderdale family business since 2010. We do every kind of bathroom remodel — primary suites, spa wet rooms, powder rooms, walk-in showers, and accessibility-forward renovations.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
                <a className="btn primary" href="#/contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }}>
                  Schedule a free visit <ArrowRight />
                </a>
                <a className="btn ghost" href="#/portfolio" onClick={(e) => { e.preventDefault(); onNav('portfolio'); }}>
                  See our work
                </a>
              </div>
              <div style={{ display: 'flex', gap: 40, marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--hairline)' }}>
                <div className="stat"><div className="num">Since</div><div className="lbl">2010</div></div>
                <div className="stat"><div className="num">Licensed</div><div className="lbl">& fully insured</div></div>
                <div className="stat"><div className="num">Free</div><div className="lbl">in-home consultations</div></div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div className="ph tall" style={{ backgroundImage: `url(${heroImg})`, aspectRatio: '4/5' }}></div>
            </div>
          </div>
        </section>
      )}

      {heroLayout === 'fullbleed' && (
        <section style={{ paddingTop: 0 }}>
          <div style={{ position: 'relative', minHeight: '78vh', backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(31,26,20,0) 30%, rgba(31,26,20,.8) 100%)' }}></div>
            <div className="wrap" style={{ position: 'relative', padding: '120px 32px 80px', color: '#fff' }}>
              <div className="eyebrow" style={{ color: 'var(--terracotta)' }}>Fort Lauderdale Bathroom Remodeling</div>
              <h1 className="h-display" style={{ color: '#fff', marginTop: 18, maxWidth: '18ch' }}>
                Bathroom remodeling, done right the first time.
              </h1>
              <p className="lead" style={{ color: 'rgba(255,255,255,.88)', marginTop: 28, maxWidth: '52ch' }}>
                A Fort Lauderdale family business since 2010. Every kind of bathroom remodel, from powder room to spa suite.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
                <a className="btn primary" href="#/contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }}>Schedule a free visit <ArrowRight /></a>
                <a className="btn light" href="#/portfolio" onClick={(e) => { e.preventDefault(); onNav('portfolio'); }}>See our work</a>
              </div>
            </div>
          </div>
        </section>
      )}

      {heroLayout === 'editorial' && (
        <section style={{ paddingTop: 96, paddingBottom: 64 }}>
          <div className="wrap">
            <h1 className="h-display" style={{ textAlign: 'center', maxWidth: '20ch', margin: '0 auto' }}>
              Fort Lauderdale's bathroom remodeling specialist since 2010.
            </h1>
            <p className="lead" style={{ textAlign: 'center', margin: '32px auto 48px', maxWidth: '54ch' }}>
              Every kind of bathroom remodel — primary suites, spa wet rooms, powder rooms, walk-in showers, custom vanities, and accessibility-forward design.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 16, alignItems: 'stretch' }}>
              <div className="ph" style={{ backgroundImage: `url(${PHOTOS[16]})`, aspectRatio: '3/4', alignSelf: 'flex-end' }}></div>
              <div className="ph" style={{ backgroundImage: `url(${PHOTOS[18]})`, aspectRatio: '16/10' }}></div>
              <div className="ph" style={{ backgroundImage: `url(${PHOTOS[1]})`, aspectRatio: '3/4', alignSelf: 'flex-start' }}></div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 48, justifyContent: 'center' }}>
              <a className="btn primary" href="#/contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }}>Schedule a free visit <ArrowRight /></a>
              <a className="btn ghost" href="#/portfolio" onClick={(e) => { e.preventDefault(); onNav('portfolio'); }}>See our work</a>
            </div>
          </div>
        </section>
      )}

      {/* Specialty marquee */}
      <div className="marquee">
        <div className="marquee-track">
          <span>Master Baths</span><span>Spa Wet Rooms</span><span>Powder Rooms</span><span>Walk-In Showers</span>
          <span>Soaking Tubs</span><span>Custom Vanities</span><span>Steam Showers</span><span>Aging-In-Place</span>
          <span>Master Baths</span><span>Spa Wet Rooms</span><span>Powder Rooms</span><span>Walk-In Showers</span>
          <span>Soaking Tubs</span><span>Custom Vanities</span><span>Steam Showers</span><span>Aging-In-Place</span>
        </div>
      </div>

      {/* Why us */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Why SoFlo</div>
              <h2 className="h-1" style={{ marginTop: 14 }}>One team, start to finish.</h2>
            </div>
            <div className="right">
              <p className="body">
                We don't subcontract the parts that matter. Our cabinetmakers, designers, tile setters, and project managers are in-house — so you get one team, one point of contact, and accountability from sketch to keys.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { num: '01', t: 'Family-owned since 2010', d: "Locally owned and operated out of Fort Lauderdale. You'll work with the owner from the first walk-through to the final punch list." },
              { num: '02', t: 'In-house craftsmen',     d: 'Cabinetmakers, tile setters, and stone fabricators on payroll — not on call. No finger-pointing between trades.' },
              { num: '03', t: 'Licensed & insured',     d: 'FL CGC license, full liability insurance, and a lifetime workmanship warranty on everything we build.' },
            ].map(c => (
              <div key={c.num} style={{ padding: 32, background: 'var(--surface)', border: '1px solid var(--hairline)', borderRadius: 14 }}>
                <div style={{ fontFamily: 'var(--f-sans)', fontSize: 13, fontWeight: 600, color: 'var(--terracotta)', letterSpacing: '.12em' }}>{c.num}</div>
                <h3 className="h-3" style={{ marginTop: 14 }}>{c.t}</h3>
                <p className="body" style={{ marginTop: 10, fontSize: 15 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Services</div>
              <h2 className="h-1" style={{ marginTop: 14 }}>Every kind of bathroom, beautifully done.</h2>
            </div>
            <div className="right">
              <a className="link-arrow" href="#/services" onClick={(e) => { e.preventDefault(); onNav('services'); }}>All services <ArrowRight /></a>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {SERVICES.slice(0, 6).map(s => (
              <a key={s.id} href="#/services" onClick={(e) => { e.preventDefault(); onNav('services'); }}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' }}>
                <div className="ph" style={{ backgroundImage: `url(${s.img})`, aspectRatio: '4/3' }}>
                  <div className="corner">{s.icon}</div>
                </div>
                <h3 className="h-3" style={{ marginTop: 16 }}>{s.name}</h3>
                <p className="body" style={{ fontSize: 14, marginTop: 6, color: 'var(--ink-soft)' }}>{s.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured project */}
      <section className="section">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="eyebrow">Featured project</div>
              <h2 className="h-1" style={{ marginTop: 14 }}>Marble Primary Suite</h2>
              <p className="lead" style={{ marginTop: 20 }}>
                A 1962 ranch primary bath reborn. We relocated the soaking tub to the window wall, added a curbless wet room with steam, and ran book-matched Calacatta floor to ceiling on the shower wall.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--hairline)' }}>
                <div><div className="kicker">Project type</div><div style={{ marginTop: 4 }}>Master Bath</div></div>
                <div><div className="kicker">Scope</div><div style={{ marginTop: 4 }}>Full remodel</div></div>
              </div>
              <a className="link-arrow" style={{ marginTop: 36, display: 'inline-flex' }} href="#/portfolio" onClick={(e) => { e.preventDefault(); onNav('portfolio'); }}>
                See the portfolio <ArrowRight />
              </a>
            </div>
            <div>
              <BeforeAfter before={PHOTOS[6]} after={PHOTOS[1]} captionA="After" captionB="Before" />
              <div style={{ marginTop: 12, fontSize: 12, color: 'var(--muted)', textAlign: 'center', letterSpacing: '.08em', textTransform: 'uppercase' }}>Drag to compare ← →</div>
            </div>
          </div>
        </div>
      </section>

      {/* How pricing works */}
      <section className="section" style={{ background: 'var(--sand)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="eyebrow">How pricing works</div>
              <h2 className="h-1" style={{ marginTop: 14 }}>We don't quote sight unseen.</h2>
              <p className="lead" style={{ marginTop: 20 }}>
                Every bathroom is different — and an honest quote takes more than a phone call. We come to your home, walk the space, ask what matters to you, and put together a real proposal you can actually trust.
              </p>
              <p className="body" style={{ marginTop: 16 }}>
                The visit is free and there's no obligation. Most last about an hour. We'll bring tape measures and ideas; you bring the coffee.
              </p>
              <div style={{ marginTop: 32 }}>
                <a className="btn primary" href="#/contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }}>
                  Schedule a free visit <ArrowRight />
                </a>
              </div>
            </div>
            <div>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { n: '1', t: 'Free in-home visit',    d: 'We walk the space together, take measurements, and listen.' },
                  { n: '2', t: 'Written proposal',      d: "We follow up within a few days with a detailed scope and price." },
                  { n: '3', t: 'Design + build',        d: 'Drawings, finalized materials, permits pulled, work begins.' },
                  { n: '4', t: 'Walkthrough & warranty',d: 'Punchlist together, keys back to you, lifetime workmanship warranty.' },
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
          </div>
        </div>
      </section>

      {/* Signature details — interactive */}
      <SignatureDetails />

      {/* Testimonial */}
      <section className="section" style={{ background: 'var(--ocean)', color: 'var(--surface)' }}>
        <div className="wrap">
          <div style={{ maxWidth: '60ch', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow" style={{ color: 'var(--terracotta)' }}>What our clients say</div>
            <p className="h-2" style={{ marginTop: 24, color: 'var(--surface)', lineHeight: 1.4 }}>
              "They spent two hours measuring and asking about how we actually use the space before giving us a number. The wet room finished a week early."
            </p>
            <div style={{ marginTop: 36 }}>
              <div style={{ fontWeight: 600 }}>A. M.</div>
              <div style={{ fontSize: 13, color: 'rgba(245,239,230,.6)', marginTop: 4 }}>Steam Wet Room</div>
            </div>
            <div style={{ marginTop: 48 }}>
              <a className="btn light" href="#/testimonials" onClick={(e) => { e.preventDefault(); onNav('testimonials'); }}>Read more reviews</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA closer */}
      <section className="section">
        <div className="wrap-narrow" style={{ textAlign: 'center' }}>
          <div className="eyebrow">Now booking 2026</div>
          <h2 className="h-display" style={{ marginTop: 18, maxWidth: '18ch', marginLeft: 'auto', marginRight: 'auto' }}>Ready to start your bathroom?</h2>
          <p className="lead" style={{ margin: '24px auto 0' }}>
            Free in-home consultation. No pressure, no obligation. We'll come out, take a look, and follow up with a real proposal.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn primary" href="#/contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }}>Schedule a visit <ArrowRight /></a>
            <a className="btn ghost" href="tel:+13478243784">(347) 824-3784</a>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { HomePage, PHOTOS, PORTFOLIO_ITEMS, SERVICES, TESTIMONIALS, JOURNAL_POSTS });

// app.jsx — router + tweaks + mount

const PALETTES = {
  coastal: {
    '--bg': '#F5EFE6',
    '--surface': '#FAF6EE',
    '--sand': '#EBE2D2',
    '--ink': '#1F1A14',
    '--ink-soft': '#4A4239',
    '--muted': '#8A7F70',
    '--hairline': '#E0D5C2',
    '--terracotta': '#C76A3F',
    '--terracotta-deep': '#9E4F2C',
    '--ocean': '#1F3A3D',
    '--ocean-2': '#2C5658',
  },
  dune: {
    '--bg': '#EFE7D8',
    '--surface': '#F6EFE1',
    '--sand': '#E3D7BF',
    '--ink': '#231C10',
    '--ink-soft': '#4A3E2C',
    '--muted': '#8D7E64',
    '--hairline': '#DDCEB1',
    '--terracotta': '#B65A37',
    '--terracotta-deep': '#823D22',
    '--ocean': '#2B2418',
    '--ocean-2': '#473C29',
  },
  marina: {
    '--bg': '#F2EFE8',
    '--surface': '#FBF8F1',
    '--sand': '#E2DDD0',
    '--ink': '#101820',
    '--ink-soft': '#2C3845',
    '--muted': '#7A8693',
    '--hairline': '#D6DAE0',
    '--terracotta': '#D17C4A',
    '--terracotta-deep': '#A45B2E',
    '--ocean': '#0E2A3D',
    '--ocean-2': '#1B4661',
  },
};

const TYPE_KITS = {
  sans:     { display: '"Inter", "Helvetica Neue", system-ui, sans-serif',         sans: '"Inter", "Helvetica Neue", system-ui, sans-serif' },
  fraunces: { display: '"Fraunces", "Cormorant Garamond", Georgia, serif',          sans: '"Inter", "Helvetica Neue", system-ui, sans-serif' },
  ibmplex:  { display: '"IBM Plex Serif", "Cormorant Garamond", Georgia, serif',    sans: '"IBM Plex Sans", "Inter", system-ui, sans-serif' },
};

function App(){
  // --- router ---
  const parseRoute = () => {
    const h = (window.location.hash || '#/home').replace(/^#\//, '');
    const key = h.split('/')[0] || 'home';
    return key;
  };
  const [route, setRoute] = React.useState(parseRoute());
  React.useEffect(() => {
    const onHash = () => { setRoute(parseRoute()); window.scrollTo({ top: 0, behavior: 'instant' }); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const onNav = (key) => { window.location.hash = '#/' + key; };

  // --- tweaks ---
  const TWEAK_DEFAULS = /*EDITMODE-BEGIN*/{
    "palette": "coastal",
    "type": "sans",
    "heroLayout": "split",
    "showChat": true,
    "showQuoteBar": true
  }/*EDITMODE-END*/;

  const [t, setTweak] = useTweaks(TWEAK_DEFAULS);

  // Apply palette + type to :root
  React.useEffect(() => {
    const root = document.documentElement;
    const p = PALETTES[t.palette] || PALETTES.coastal;
    Object.entries(p).forEach(([k, v]) => root.style.setProperty(k, v));
    const tk = TYPE_KITS[t.type] || TYPE_KITS.fraunces;
    root.style.setProperty('--f-display', tk.display);
    root.style.setProperty('--f-sans', tk.sans);
  }, [t.palette, t.type]);

  // page
  let page;
  switch (route) {
    case 'services':     page = <ServicesPage onNav={onNav} />; break;
    case 'portfolio':    page = <PortfolioPage onNav={onNav} />; break;
    case 'about':        page = <AboutPage onNav={onNav} />; break;
    case 'testimonials': page = <TestimonialsPage onNav={onNav} />; break;
    case 'financing':    page = <FinancingPage onNav={onNav} />; break;
    case 'contact':      page = <ContactPage onNav={onNav} />; break;
    default:             page = <HomePage onNav={onNav} heroLayout={t.heroLayout} />;
  }

  return (
    <React.Fragment>
      <Header route={route} onNav={onNav} />
      {page}
      <Footer onNav={onNav} />
      {t.showQuoteBar && <StickyQuoteBar onNav={onNav} />}
      {t.showChat && <ChatWidget />}
      <Lightbox />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakColor
            value={t.palette}
            onChange={(v) => setTweak('palette', v)}
            options={[
              { value: 'coastal', palette: ['#C76A3F','#1F3A3D','#F5EFE6'] },
              { value: 'dune',    palette: ['#B65A37','#2B2418','#EFE7D8'] },
              { value: 'marina',  palette: ['#D17C4A','#0E2A3D','#F2EFE8'] },
            ]}
            label="Color scheme"
          />
        </TweakSection>
        <TweakSection title="Type">
          <TweakRadio
            value={t.type}
            onChange={(v) => setTweak('type', v)}
            options={[
              { value: 'sans',     label: 'Sans' },
              { value: 'fraunces', label: 'Serif' },
              { value: 'ibmplex',  label: 'Plex' },
            ]}
            label="Type"
          />
        </TweakSection>
        <TweakSection title="Home hero">
          <TweakRadio
            value={t.heroLayout}
            onChange={(v) => setTweak('heroLayout', v)}
            options={[
              { value: 'split',     label: 'Split' },
              { value: 'fullbleed', label: 'Full' },
              { value: 'editorial', label: 'Editorial' },
            ]}
            label="Layout"
          />
        </TweakSection>
        <TweakSection title="Page widgets">
          <TweakToggle value={t.showChat}     onChange={(v) => setTweak('showChat', v)}     label="Chat bubble" />
          <TweakToggle value={t.showQuoteBar} onChange={(v) => setTweak('showQuoteBar', v)} label="Sticky quote bar" />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

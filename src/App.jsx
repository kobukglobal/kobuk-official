import { useState, useEffect, useRef } from "react";

const MINT = "2L5r5Gjtu8DkqJJVggbeCDT641oJB8aPJpjM9XNtJ4BD";
const LOGO = "/kobuk-logo.png";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView(0.08);
  return (
    <div ref={ref} className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 1s ease ${delay}s, transform 1s ease ${delay}s`,
      }}>
      {children}
    </div>
  );
}

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };
  return (
    <button onClick={handleCopy} className="copy-btn">
      <span className="copy-label">{label}</span>
      <span className="copy-text">{text}</span>
      <span className="copy-icon">{copied ? "✓ Copied" : "Copy"}</span>
    </button>
  );
}

function LinkButton({ href, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link-btn">
      <span className="link-label">{label}</span>
      <span className="link-arrow">→</span>
    </a>
  );
}

function HeroMint() {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MINT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };
  return (
    <button className="hero-mint" onClick={handleCopy}>
      <span className="hero-mint-label">Mint</span>
      <span className="hero-mint-addr">{MINT}</span>
      <span className="hero-mint-copy">{copied ? "✓ Copied" : "Copy"}</span>
    </button>
  );
}

const tokenInfo = [
  ["Token Name", "Geobukseon Coin"],
  ["Ticker", "KOBUK"],
  ["Blockchain", "Solana"],
  ["Token Standard", "SPL Token"],
  ["Total Supply", "1,000,000,000"],
  ["Supply Model", "Fixed Supply"],
  ["Mint Authority", "Revoked"],
  ["Freeze Authority", "Revoked"],
];

const allocation = [
  ["Community & Ecosystem", 40],
  ["Liquidity", 20],
  ["Marketing & Partnerships", 15],
  ["Founding Team", 15],
  ["Reserve", 10],
];

const phases = [
  { n: "01", t: "Foundation", d: "Brand identity · Core narrative · Whitepaper · Community channels" },
  { n: "02", t: "Launch", d: "Token issuance completed · Liquidity provisioning · Brand campaigns" },
  { n: "03", t: "Expansion", d: "International community · Content strategy · Partnerships" },
  { n: "04", t: "Brand Experience", d: "NFT & membership · Merchandise · K-culture collaborations" },
  { n: "05", t: "Long-term Ecosystem", d: "Community consolidation · Brand assets · Global K-crypto image" },
];

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#060a16", color: "#f0ece2", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Jost:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        button { appearance: none; -webkit-appearance: none; background: none; border: none; color: inherit; font: inherit; }
        html { scroll-behavior: smooth; }
        :root {
          --navy: #0a0f1e; --charcoal: #1a1d2b;
          --gold: #c4a265; --silver: #9a9eb0;
          --ivory: #f0ece2; --bg: #060a16;
        }
        body { overflow-x: hidden; font-family: 'DM Sans', sans-serif; }
        .sans { font-family: 'DM Sans', sans-serif; }
        .display { font-family: 'Jost', sans-serif; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px 48px; transition: all 0.5s ease;
        }
        .nav.scrolled { background: rgba(6,10,22,0.92); backdrop-filter: blur(16px); }
        .nav-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .nav-logo img { height: 28px; width: 28px; object-fit: contain; opacity: 0.85; }
        .nav-logo span {
          font-family: 'Jost', sans-serif;
          font-size: 12px; font-weight: 400; letter-spacing: 5px;
          text-transform: uppercase; color: var(--gold);
        }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a {
          color: var(--silver); text-decoration: none;
          font-family: 'Jost', sans-serif;
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          font-weight: 300; transition: color 0.3s;
        }
        .nav-links a:hover { color: var(--gold); }

        .hero {
          min-height: 100vh; display: flex; flex-direction: column;
          justify-content: center; align-items: center; text-align: center;
          padding: 140px 24px 80px; position: relative; overflow: hidden;
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 40%, rgba(196,162,101,0.035) 0%, transparent 55%);
          pointer-events: none;
        }
        .hero-logo {
          width: 96px; height: 96px; object-fit: contain;
          margin-bottom: 44px; opacity: 0.9;
          filter: drop-shadow(0 0 40px rgba(196,162,101,0.12));
        }
        .hero-title {
          font-family: 'Jost', sans-serif;
          font-size: clamp(40px, 7vw, 76px); font-weight: 400;
          letter-spacing: 0.18em; line-height: 1.2; color: var(--ivory);
          text-transform: uppercase;
        }
        .hero-title-sub {
          font-family: 'Jost', sans-serif;
          font-size: clamp(14px, 2vw, 17px); font-weight: 300;
          letter-spacing: 0.5em; line-height: 1.4;
          color: var(--gold); opacity: 0.7; margin-top: 16px; margin-bottom: 52px;
          text-transform: uppercase;
        }
        .hero-quote {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(16px, 2vw, 20px); font-weight: 300;
          font-style: italic; color: var(--silver); max-width: 460px;
          line-height: 2; margin-bottom: 56px;
        }
        .hero-tagline {
          font-family: 'Jost', sans-serif;
          font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase;
          color: var(--gold); opacity: 0.5; line-height: 2.8; font-weight: 300;
          margin-bottom: 56px;
        }
        .hero-mint {
          display: flex; align-items: center; gap: 12px;
          background: rgba(196,162,101,0.04);
          border: 1px solid rgba(196,162,101,0.12);
          border-radius: 4px; padding: 12px 20px;
          cursor: pointer; transition: all 0.3s;
          max-width: 520px; width: 100%;
          font-family: inherit; color: inherit;
          outline: none;
        }
        .hero-mint:hover {
          border-color: rgba(196,162,101,0.35);
          background: rgba(196,162,101,0.07);
        }
        .hero-mint:focus-visible {
          outline: 1px solid var(--gold);
          outline-offset: 2px;
        }
        .hero-mint-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--gold); opacity: 0.7; white-space: nowrap;
        }
        .hero-mint-addr {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; color: rgba(240,236,226,0.5);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          flex: 1; letter-spacing: 0.3px;
        }
        .hero-mint-copy {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
          color: var(--gold); opacity: 0.6; white-space: nowrap;
          background: rgba(196,162,101,0.08); border: 1px solid rgba(196,162,101,0.12);
          border-radius: 3px;
          cursor: pointer; padding: 4px 10px; transition: all 0.3s;
        }
        .hero-mint:hover .hero-mint-copy { opacity: 1; background: rgba(196,162,101,0.14); }

        .section { padding: 110px 24px; max-width: 760px; margin: 0 auto; }
        .sec-num {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 4px; color: var(--gold);
          font-weight: 400; margin-bottom: 20px;
        }
        .sec-title {
          font-family: 'Jost', sans-serif;
          font-size: clamp(24px, 3.2vw, 34px); font-weight: 400;
          letter-spacing: 0.06em; line-height: 1.4;
          margin-bottom: 12px; color: var(--ivory);
        }
        .sec-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--silver); margin-bottom: 32px; opacity: 0.6;
        }
        .gold-line { width: 28px; height: 1px; background: var(--gold); opacity: 0.3; margin-bottom: 28px; }
        .body {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; line-height: 2.1; color: rgba(240,236,226,0.65); font-weight: 300;
        }
        .body strong { color: var(--ivory); font-weight: 500; }
        .quote-side {
          font-family: 'Cormorant Garamond', Georgia, serif;
          border-left: 1px solid rgba(196,162,101,0.35);
          padding-left: 24px; margin: 32px 0;
          font-size: 18px; font-weight: 300; font-style: italic;
          line-height: 2; color: var(--ivory); opacity: 0.8;
        }
        .values { display: flex; flex-wrap: wrap; gap: 0; margin: 28px 0; }
        .val {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; color: rgba(240,236,226,0.45);
          padding: 10px 18px 10px 0; letter-spacing: 0.5px;
        }
        .val::before { content: '— '; color: var(--gold); opacity: 0.5; }
        .divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(196,162,101,0.1), transparent); }

        .token-card {
          background: rgba(196,162,101,0.03);
          border: 1px solid rgba(196,162,101,0.1);
          border-radius: 3px; padding: 32px; margin: 32px 0;
        }
        .token-card-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; letter-spacing: 3.5px; text-transform: uppercase;
          color: var(--gold); margin-bottom: 20px; opacity: 0.7;
        }
        .token-row {
          display: flex; justify-content: space-between; padding: 8px 0;
          border-bottom: 1px solid rgba(196,162,101,0.04);
          font-family: 'DM Sans', sans-serif; font-size: 13px;
        }
        .token-row:last-child { border-bottom: none; }
        .t-label { color: rgba(240,236,226,0.3); font-weight: 300; }
        .t-val { color: var(--ivory); font-weight: 400; letter-spacing: 0.5px; }
        .t-val.rev { color: var(--gold); font-weight: 500; }

        .links-grid { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
        .copy-btn {
          display: flex; align-items: center; gap: 12px;
          background: rgba(196,162,101,0.02);
          border: 1px solid rgba(196,162,101,0.08);
          border-radius: 3px; padding: 14px 18px;
          cursor: pointer; transition: all 0.3s; width: 100%; text-align: left;
        }
        .copy-btn:hover { border-color: rgba(196,162,101,0.2); background: rgba(196,162,101,0.05); }
        .copy-btn:focus-visible, .link-btn:focus-visible {
          outline: 1px solid var(--gold); outline-offset: 2px;
        }
        .copy-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--gold); opacity: 0.6; min-width: 48px;
        }
        .copy-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; color: rgba(240,236,226,0.4);
          flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .copy-icon {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
          color: var(--gold); opacity: 0.5; white-space: nowrap;
        }
        .link-btn {
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(196,162,101,0.02);
          border: 1px solid rgba(196,162,101,0.08);
          border-radius: 3px; padding: 14px 18px;
          cursor: pointer; transition: all 0.3s; text-decoration: none; width: 100%;
        }
        .link-btn:hover { border-color: rgba(196,162,101,0.2); background: rgba(196,162,101,0.05); }
        .link-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; color: rgba(240,236,226,0.55); font-weight: 300; letter-spacing: 0.5px;
        }
        .link-arrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; color: var(--gold); opacity: 0.4;
          transition: opacity 0.3s, transform 0.3s;
        }
        .link-btn:hover .link-arrow { opacity: 0.8; transform: translateX(4px); }

        .alloc-grid { margin: 24px 0; }
        .alloc-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 0; border-bottom: 1px solid rgba(196,162,101,0.05);
          font-family: 'DM Sans', sans-serif;
        }
        .alloc-name { font-size: 13px; color: rgba(240,236,226,0.55); font-weight: 300; }
        .alloc-pct { font-size: 13px; color: var(--ivory); font-weight: 500; letter-spacing: 1px; min-width: 40px; text-align: right; }
        .alloc-bar-wrap {
          flex: 1; max-width: 160px; height: 2px;
          background: rgba(196,162,101,0.05); margin: 0 20px; border-radius: 1px; overflow: hidden;
        }
        .alloc-bar { height: 100%; background: var(--gold); border-radius: 1px; }

        .phase { display: flex; gap: 20px; margin-bottom: 28px; align-items: flex-start; }
        .phase-num {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; color: var(--gold); letter-spacing: 2px;
          min-width: 28px; padding-top: 3px; font-weight: 500; opacity: 0.6;
        }
        .phase-title { font-family: 'Jost', sans-serif; font-size: 16px; font-weight: 400; color: var(--ivory); margin-bottom: 5px; letter-spacing: 1px; }
        .phase-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; color: rgba(240,236,226,0.38); line-height: 1.8; font-weight: 300;
        }

        .footer {
          border-top: 1px solid rgba(196,162,101,0.06);
          padding: 52px 24px; text-align: center;
        }
        .footer-logo { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 20px; }
        .footer-logo img { height: 18px; width: 18px; object-fit: contain; opacity: 0.5; }
        .footer-logo span {
          font-family: 'Jost', sans-serif;
          font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: var(--gold); opacity: 0.5;
        }
        .footer-links { display: flex; justify-content: center; gap: 24px; margin-bottom: 16px; }
        .footer-links a {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--silver); text-decoration: none; transition: color 0.3s; opacity: 0.5;
        }
        .footer-links a:hover { color: var(--gold); opacity: 1; }
        .footer-copy {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; color: rgba(240,236,226,0.12); letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .nav { padding: 16px 20px; }
          .nav-links { display: none; }
          .section { padding: 72px 20px; }
          .hero { padding: 120px 20px 72px; }
          .hero-logo { width: 72px; height: 72px; }
          .hero-mint { flex-wrap: wrap; gap: 8px; }
          .hero-mint-addr { font-size: 10px; }
          .hero-mint-addr, .copy-text { white-space: normal; word-break: break-all; }
          .alloc-bar-wrap { display: none; }
          .phase { flex-direction: column; gap: 4px; }
          .copy-btn { flex-wrap: wrap; gap: 8px; }
          .copy-text { font-size: 10px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrollY > 60 ? "scrolled" : ""}`}
        style={{ background: scrollY > 60 ? "rgba(6,10,22,0.92)" : "transparent" }}>
        <a href="#top" className="nav-logo">
          <img src={LOGO} alt="KOBUK" />
          <span>KOBUK</span>
        </a>
        <ul className="nav-links">
          <li><a href="#manifesto">Manifesto</a></li>
          <li><a href="#token">Token</a></li>
          <li><a href="#roadmap">Roadmap</a></li>
          <li><a href="https://x.com/kobukofficial" target="_blank" rel="noopener noreferrer">X</a></li>
          <li><a href="https://github.com/kobukofficial/kobuk-official" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <FadeIn delay={0.3}><img src={LOGO} alt="Geobukseon" className="hero-logo" /></FadeIn>
        <FadeIn delay={0.5}>
          <h1 className="hero-title">Geobukseon Coin</h1>
          <p className="hero-title-sub">A K-Crypto Brand</p>
        </FadeIn>
        <FadeIn delay={0.8}>
          <p className="hero-quote">
            "I still have twelve warships under my command."<br />
            <span style={{ fontSize: "13px", opacity: 0.45 }}>— Admiral Yi Sun-sin</span>
          </p>
        </FadeIn>
        <FadeIn delay={1.0}>
          <p className="hero-tagline">Legacy in Structure.<br />Culture in Motion.<br />A K-Crypto Brand for the World.</p>
        </FadeIn>
        <FadeIn delay={1.2}><HeroMint /></FadeIn>
      </section>

      <div className="divider" />

      {/* MANIFESTO */}
      <section style={{ background: "linear-gradient(175deg, #0d1225, #080d1c)" }} id="manifesto">
        <div className="section">
          <FadeIn>
            <p className="sec-num">01</p>
            <h2 className="sec-title">The Symbol Rebuilt</h2>
            <div className="gold-line" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="body">
              The Geobukseon was a symbol of order imposed upon chaos — a future carved from an overwhelming present. <strong>Geobukseon Coin revives this symbol,</strong> translating Korea's historical depth into a digital asset brand for the world.
            </p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="values">
              {["Dignity over noise", "Longevity over trend", "Belonging over speculation", "Symbolism over exaggeration"].map((v, i) => (
                <div className="val" key={i}>{v}</div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* LEGACY */}
      <section style={{ background: "#070c1a" }}>
        <div className="section">
          <FadeIn>
            <p className="sec-num">02</p>
            <h2 className="sec-title">The Geobukseon Legacy</h2>
            <div className="gold-line" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="body">
              Admiral Yi Sun-sin (1545–1598) forged strategy from disadvantage. The Geobukseon — iron-spiked, covered, impenetrable — was the product of a mindset that could reverse the odds.
            </p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="quote-side">Defense. Survival. Breakthrough. Voyage.</div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* VISION */}
      <section style={{ background: "linear-gradient(175deg, #0d1225, #080d1c)" }}>
        <div className="section">
          <FadeIn>
            <p className="sec-num">03</p>
            <h2 className="sec-title">K-Culture Meets<br />the Digital Frontier</h2>
            <div className="gold-line" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="body">
              K is no longer a regional code. <strong>Geobukseon Coin extends Korea's cultural momentum into digital assets</strong> — carrying historical density in a form the world can read.
            </p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div style={{
              textAlign: "center", margin: "48px 0",
              fontFamily: "'Jost', sans-serif",
              fontSize: "clamp(13px, 1.8vw, 16px)",
              fontWeight: 300, letterSpacing: "0.3em", lineHeight: 2.8,
              color: "var(--gold)", opacity: 0.55,
              textTransform: "uppercase",
            }}>
              Built in Korea.<br />Carried by culture.<br />Expanded to the world.
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* TOKENOMICS */}
      <section style={{ background: "#070c1a" }} id="token">
        <div className="section">
          <FadeIn>
            <p className="sec-num">04</p>
            <h2 className="sec-title">Tokenomics</h2>
            <p className="sec-sub">Structure of Trust</p>
            <div className="gold-line" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="token-card">
              <div className="token-card-title">Official Token Information</div>
              {tokenInfo.map(([label, value], i) => (
                <div className="token-row" key={i}>
                  <span className="t-label">{label}</span>
                  <span className={`t-val ${value === "Revoked" ? "rev" : ""}`}>{value}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="links-grid">
              <CopyButton text={MINT} label="Mint" />
              <LinkButton href="https://x.com/kobukofficial" label="Official X" />
              <LinkButton href="https://github.com/kobukofficial/kobuk-official" label="GitHub Repository" />
            </div>
          </FadeIn>
          <FadeIn delay={0.26}>
            <div className="alloc-grid">
              {allocation.map(([name, pct], i) => (
                <div className="alloc-row" key={i}>
                  <span className="alloc-name">{name}</span>
                  <div className="alloc-bar-wrap">
                    <div className="alloc-bar" style={{ width: pct + "%" }} />
                  </div>
                  <span className="alloc-pct">{pct}%</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.32}>
            <p className="body" style={{ fontSize: 12, opacity: 0.35, marginTop: 4 }}>
              Founding Team (15%) under structured vesting with initial lock-up. Liquidity provisioned in phases prioritizing stability and transparency.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      {/* ROADMAP */}
      <section style={{ background: "linear-gradient(175deg, #0d1225, #080d1c)" }} id="roadmap">
        <div className="section">
          <FadeIn>
            <p className="sec-num">05</p>
            <h2 className="sec-title">Roadmap</h2>
            <p className="sec-sub">The Voyage Ahead</p>
            <div className="gold-line" />
          </FadeIn>
          {phases.map((p, i) => (
            <FadeIn key={i} delay={0.06 + i * 0.06}>
              <div className="phase">
                <div className="phase-num">{p.n}</div>
                <div>
                  <div className="phase-title">{p.t}</div>
                  <div className="phase-desc">{p.d}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* CONCLUSION */}
      <section style={{ background: "linear-gradient(175deg, #080d1c, #060a16)", padding: "110px 24px", textAlign: "center" }}>
        <FadeIn>
          <img src={LOGO} alt="" style={{ width: 48, height: 48, objectFit: "contain", opacity: 0.35, marginBottom: 36, filter: "drop-shadow(0 0 20px rgba(196,162,101,0.08))" }} />
        </FadeIn>
        <FadeIn delay={0.12}>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "clamp(20px, 3.5vw, 30px)", fontWeight: 300,
            lineHeight: 2, maxWidth: 480, margin: "0 auto 32px", color: "var(--ivory)",
            letterSpacing: "0.05em",
          }}>
            It starts in Korea.<br />It expands to the world.<br />And it does not sink easily.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="sans" style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: "0.25em", color: "var(--gold)", opacity: 0.4, textTransform: "uppercase" }}>
            That is the standard Geobukseon Coin aspires to.
          </p>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">
          <img src={LOGO} alt="" />
          <span>Geobukseon Coin</span>
        </div>
        <div className="footer-links">
          <a href="https://x.com/kobukofficial" target="_blank" rel="noopener noreferrer">X / Twitter</a>
          <a href="https://github.com/kobukofficial/kobuk-official" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <p className="footer-copy">© 2026 Geobukseon Coin. All rights reserved.</p>
      </footer>
    </div>
  );
}
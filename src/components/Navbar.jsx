import { useState, useEffect } from 'react';

const links = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#skills' },
];

function scrollTo(href) {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('#hero');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 24);

            // find active section
            const ids = links.map(l => l.href);
            for (let i = ids.length - 1; i >= 0; i--) {
                const el = document.querySelector(ids[i]);
                if (el && el.getBoundingClientRect().top <= 160) {
                    setActive(ids[i]);
                    break;
                }
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLink = (e, href) => {
        e.preventDefault();
        scrollTo(href);
        setOpen(false);
    };

    return (
        <>
            {/* ── DESKTOP NAV ── */}
            <nav style={{
                position: 'fixed',
                top: '20px',
                left: 0,
                right: 0,
                padding: '0 24px',
                zIndex: 100,
                pointerEvents: 'none',
            }}>
                <div style={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                    pointerEvents: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 28px',
                    height: '60px',
                    borderRadius: '999px',
                    background: scrolled ? 'rgba(255,255,255,0.84)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                    border: scrolled ? '1px solid rgba(14,165,233,0.2)' : '1px solid transparent',
                    boxShadow: scrolled ? '0 4px 28px rgba(14,165,233,0.10)' : 'none',
                    transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
                }}>
                    {/* Logo */}
                    <a href="#hero" onClick={e => handleLink(e, '#hero')}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                    >
                        <img src="/LOGO 2.svg" alt="AAN Logo" style={{ height: '34px', width: 'auto' }} />
                    </a>

                    {/* Desktop Links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        className="desktop-links">
                        {links.map(l => (
                            <a
                                key={l.href}
                                href={l.href}
                                onClick={e => handleLink(e, l.href)}
                                style={{
                                    position: 'relative',
                                    padding: '6px 14px',
                                    borderRadius: '999px',
                                    fontSize: '0.875rem',
                                    fontWeight: 700,
                                    color: active === l.href ? '#0284c7' : '#475569',
                                    background: active === l.href ? 'rgba(14,165,233,0.10)' : 'transparent',
                                    transition: 'all 0.22s ease',
                                    textDecoration: 'none',
                                }}
                                onMouseEnter={e => { if (active !== l.href) e.target.style.color = '#0ea5e9'; }}
                                onMouseLeave={e => { if (active !== l.href) e.target.style.color = '#475569'; }}
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <a href="#contact" onClick={e => handleLink(e, '#contact')} className="btn btn-primary"
                        style={{ padding: '0.55rem 1.4rem', fontSize: '0.85rem' }}>
                        Contact ✦
                    </a>

                    {/* Burger – mobile */}
                    <button
                        onClick={() => setOpen(!open)}
                        style={{
                            display: 'none',
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: '#0f172a', padding: '4px',
                        }}
                        className="burger-btn"
                    >
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            {open
                                ? <path d="M18 6L6 18M6 6l12 12" />
                                : <path d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* ── MOBILE MENU OVERLAY ── */}
            <div style={{
                position: 'fixed', inset: 0,
                background: 'rgba(240,249,255,0.97)',
                backdropFilter: 'blur(24px)',
                zIndex: 99,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '24px',
                opacity: open ? 1 : 0,
                pointerEvents: open ? 'auto' : 'none',
                transition: 'opacity 0.3s ease',
            }}>
                {links.map(l => (
                    <a
                        key={l.href}
                        href={l.href}
                        onClick={e => handleLink(e, l.href)}
                        style={{
                            fontFamily: 'Outfit,sans-serif', fontWeight: 800,
                            fontSize: '1.8rem',
                            color: active === l.href ? '#0ea5e9' : '#0f172a',
                            transition: 'color 0.2s',
                        }}
                    >
                        {l.label}
                    </a>
                ))}
                <a href="#contact" onClick={e => handleLink(e, '#contact')} className="btn btn-primary" style={{ marginTop: '8px' }}>
                    Contact ✦
                </a>
            </div>

            {/* Hide desktop links / show burger on small screens */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .burger-btn    { display: block !important; }
        }
      `}</style>
        </>
    );
}

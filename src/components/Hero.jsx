import useReveal from '../hooks/useReveal';

export default function Hero() {
    const ref = useReveal(0.1);

    return (
        <section id="hero" className="section-base" ref={ref}
            style={{ minHeight: 'calc(100vh - 88px)', display: 'flex', alignItems: 'center' }}>

            {/* Decorative blobs */}
            <div className="blob" style={{
                position: 'absolute', top: '8%', left: '-5%',
                width: 480, height: 480, borderRadius: '50%', pointerEvents: 'none',
                background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)',
            }} />
            <div className="blob" style={{
                position: 'absolute', bottom: '5%', right: '-5%',
                width: 400, height: 400, borderRadius: '50%', pointerEvents: 'none',
                background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)',
                animationDelay: '3s',
            }} />

            <div className="container">
                {/* hero-glass-card — class used by responsive.css */}
                <div className="glass-card hero-glass-card" style={{ padding: '52px 56px', position: 'relative', overflow: 'hidden' }}>
                    <div className="card-top-bar" />

                    <div className="hero-grid">

                        {/* ── Left: Text ── */}
                        <div className="reveal-left" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                            <div className="badge">Welcome to my world <span>✨</span></div>

                            <div>
                                <p style={{ fontSize: '1.05rem', fontWeight: 500, color: '#64748b', marginBottom: '6px' }}>Hi, I'm</p>
                                <h1 style={{
                                    fontFamily: 'Outfit,sans-serif', fontWeight: 900,
                                    fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
                                    color: '#0f172a', lineHeight: 1.08, marginBottom: '12px',
                                }}>
                                    AaffeefAhmed N.
                                </h1>
                                <p className="gradient-text" style={{
                                    fontFamily: 'Outfit,sans-serif', fontWeight: 800,
                                    fontSize: 'clamp(1.3rem, 3.5vw, 2.4rem)', lineHeight: 1.15,
                                }}>
                                    MERN Stack Developer<br />
                                    <span style={{ fontWeight: 700, fontSize: '85%' }}>&amp; AI Enthusiast</span>
                                </p>
                            </div>

                            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, fontWeight: 500, maxWidth: '440px' }}>
                                Passionate about creating intuitive, high‑performance web experiences
                                and integrating intelligent AI systems into real‑world products.
                            </p>

                            {/* hero-btn-row — responsive.css stacks on mobile */}
                            <div className="hero-btn-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                <a href="#projects" className="btn btn-primary">My Projects ✦</a>
                                <a href="public/Resume - AAFFEEF AHMED N CS.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">Download CV ↓</a>
                            </div>

                            {/* Socials */}
                            <div style={{ display: 'flex', gap: '10px', paddingTop: '8px' }}>
                                {[
                                    { icon: 'instagram', href: 'https://www.instagram.com/_aaffuz_/' },
                                    { icon: 'linkedin', href: 'https://www.linkedin.com/in/aaffeef-ahmed/' },
                                    { icon: 'github', href: 'https://github.com/AAFFEEF' },
                                ].map(s => (
                                    <a key={s.icon} href={s.href} target="_blank" rel="noreferrer" className="social-orb">
                                        {s.icon === 'github' && (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                                        )}
                                        {s.icon === 'linkedin' && (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                                        )}
                                        {s.icon === 'instagram' && (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                                        )}
                                    </a>
                                ))}
                            </div>

                        </div>

                        {/* ── Right: Avatar ── */}
                        {/* hero-avatar-col — order:-1 on tablet via responsive.css */}
                        <div className="hero-avatar-col reveal-right" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/* hero-avatar-wrap — size shrinks via responsive.css */}
                            <div className="hero-avatar-wrap" style={{ position: 'relative', width: 340, height: 380 }}>

                                {/* Tilted border ring */}
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    border: '7px solid #0ea5e9', borderRadius: '2.5rem',
                                    transform: 'rotate(3deg)', boxShadow: '0 0 40px rgba(14,165,233,0.25)',
                                }} />

                                {/* Accent pills */}
                                <div style={{ position: 'absolute', top: -14, left: -18, width: 44, height: 22, background: '#0ea5e9', borderRadius: '999px', transform: 'rotate(40deg)' }} />
                                <div style={{ position: 'absolute', bottom: -12, left: 24, width: 56, height: 18, background: '#38bdf8', borderRadius: '999px', transform: 'rotate(-10deg)' }} />
                                <div style={{ position: 'absolute', bottom: 30, right: -26, width: 22, height: 52, background: '#7dd3fc', borderRadius: '999px', transform: 'rotate(38deg)' }} />

                                {/* Avatar image */}
                                <div style={{
                                    position: 'absolute', inset: '10px', borderRadius: '2rem',
                                    overflow: 'hidden',
                                    background: 'linear-gradient(135deg,#e0f2fe,#bae6fd)',
                                }}>
                                    <img
                                        src="/avatar.jpg"
                                        alt="AaffeefAhmed N."
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center top',
                                            display: 'block',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Stats row — hero-stats-row class for responsive */}
                    <div className="reveal hero-stats-row" style={{
                        marginTop: '48px', paddingTop: '32px',
                        borderTop: '1px solid rgba(14,165,233,0.12)',
                        display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center',
                    }}>
                        {[
                            { num: '5+', label: 'Projects Built' },
                            { num: '2+', label: 'Years Learning' },
                            { num: 'AI', label: 'Focused' },
                        ].map(stat => (
                            <div key={stat.label} style={{ textAlign: 'center' }}>
                                <div className="hero-stat-num" style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: '2.2rem', color: '#0ea5e9', lineHeight: 1 }}>
                                    {stat.num}
                                </div>
                                <div className="hero-stat-label" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginTop: '4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

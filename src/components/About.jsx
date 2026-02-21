import useReveal from '../hooks/useReveal';

const quickInfo = [
    { icon: '📍', label: 'Location', value: 'Chennai, Tamil Nadu' },
    { icon: '🎓', label: 'Degree', value: 'B.E. Computer Science' },
    { icon: '💡', label: 'Focus', value: 'AI & Web Dev' },
    { icon: '✅', label: 'Status', value: 'Open to Work' },
];

const achievements = [
    { icon: '🏆', title: "Dean's List", desc: 'Academic excellence award' },
    { icon: '⚡', title: 'Hackathon', desc: 'Won inter-college hackathon' },
    { icon: '🤖', title: 'AI Projects', desc: '4+ AI/ML implementations' },
    { icon: '🌐', title: 'Web Dev', desc: 'Full-stack MERN projects' },
];

export default function About() {
    const ref = useReveal();

    return (
        <section id="about" className="section-base section-tint" ref={ref}>
            <div className="container">

                {/* Header */}
                <div className="section-header">
                    <div className="section-eyebrow reveal"><span /> Who I Am <span /></div>
                    <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
                        Background &amp; <span className="gradient-text">Story</span>
                    </h2>
                    <p className="section-subtitle reveal" style={{ transitionDelay: '0.2s' }}>
                        Bridging the gap between academic theory and practical engineering.
                    </p>
                </div>

                {/* Two-col grid — about-two-col stacks on ≤768 */}
                <div className="about-two-col" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px', alignItems: 'start',
                }}>

                    {/* ── Left ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="glass-card reveal-left" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
                            <div className="card-top-bar" />

                            {/* Circular avatar */}
                            <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'linear-gradient(135deg,#38bdf8,#0ea5e9)', padding: '3px', margin: '0 auto 18px', boxShadow: '0 0 28px rgba(14,165,233,0.28)' }}>
                                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src="/avatar.jpg" alt="AaffeefAhmed N."
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                                        onError={e => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                                    />
                                    <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', fontSize: '2rem' }}>🖼️</div>
                                </div>
                            </div>

                            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.15rem', textAlign: 'center', color: '#0f172a', marginBottom: '4px' }}>AaffeefAhmed N.</h3>
                            <p style={{ textAlign: 'center', fontSize: '0.83rem', color: '#0284c7', fontWeight: 600, marginBottom: '20px' }}>MERN Stack Developer &amp; AI Enthusiast</p>

                            {/* about-quick-grid — 1col on small phone */}
                            <div className="about-quick-grid" style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                                {quickInfo.map(q => (
                                    <div key={q.label} style={{ display: 'flex', alignItems: 'center', gap: '11px', background: '#f0f9ff', borderRadius: '10px', padding: '9px 13px', border: '1px solid #e0f2fe' }}>
                                        <span style={{ fontSize: '1rem' }}>{q.icon}</span>
                                        <div>
                                            <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{q.label}</p>
                                            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{q.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* Bio */}
                        <div className="glass-card reveal-right" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
                            <div className="card-top-bar" />
                            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#0f172a', marginBottom: '14px' }}>My Story</h3>
                            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.75, fontWeight: 500, marginBottom: '14px' }}>
                                I'm a passionate Computer Science student at Vel Tech High Tech Dr.Rangarajan Dr.Sakunthala Engineering College with a love for building things that live on the internet — from elegant frontends to intelligent AI systems.
                            </p>
                            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.75, fontWeight: 500, marginBottom: '18px' }}>
                                My expertise spans the full MERN stack with growing specialisation in AI/ML integration, NLP, and generative AI. Every pixel and model weight should serve a purpose.
                            </p>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#e0f2fe', borderRadius: '12px', padding: '14px 16px', border: '1px solid #bae6fd' }}>
                                <span style={{ fontSize: '1.1rem', marginTop: '2px' }}>✨</span>
                                <p style={{ fontSize: '0.86rem', color: '#0369a1', fontWeight: 600, lineHeight: 1.6 }}>
                                    Deeply committed to crafting unique, effective experiences — every line of code matters.
                                </p>
                            </div>
                        </div>

                        {/* Achievements — achievements-grid 1col on phone */}
                        <div className="glass-card reveal" style={{ padding: '32px', transitionDelay: '0.15s' }}>
                            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1rem', color: '#0f172a', marginBottom: '16px' }}>Highlights</h3>
                            <div className="achievements-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {achievements.map(a => (
                                    <div key={a.title} style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: '12px', padding: '14px', transition: 'border-color 0.25s' }}>
                                        <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{a.icon}</div>
                                        <div style={{ fontWeight: 700, fontSize: '0.87rem', color: '#0f172a', marginBottom: '2px' }}>{a.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>{a.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

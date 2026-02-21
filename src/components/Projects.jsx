import { useState, useEffect, useRef, useCallback } from 'react';
import useReveal from '../hooks/useReveal';

const projects = [
    {
        emoji: '🛡️',
        category: 'AI / Cybersecurity',
        title: 'Malicious URL Detection',
        desc: 'ML pipeline that analyzes URL structural & lexical features to detect phishing, malware, and spam in real-time.',
        longDesc: 'Built using Scikit-learn — extracts 30+ features, selects top performers, trains multiple classifiers, and serves predictions via Flask API.',
        tools: ['Python', 'Scikit-learn', 'Flask', 'Pandas', 'NumPy'],
        from: '#0ea5e9', to: '#0284c7',
        github: 'https://github.com/AAFFEEF/Malicious-URL-Detection', live: 'https://malicious-url-detection-rgzz.vercel.app/',
    },

    {
        emoji: '😊',
        category: 'AI / Mental Health',
        title: 'Mood Tracker & Journal',
        desc: 'AI-powered mood journaling with sentiment analysis and a DeepSeek chatbot for emotional support.',
        longDesc: 'React + Node.js + Express integrating DeepSeek LLM API. Mood logs, journal entries, AI chat stored in MongoDB.',
        tools: ['React.js', 'Node.js', 'DeepSeek API', 'MongoDB', 'Express'],
        from: '#7dd3fc', to: '#38bdf8',
        github: 'https://github.com/aaffeefahmed', live: '#',
    },

];

const AUTOPLAY_DELAY = 4500;

export default function Projects() {
    const sectionRef = useReveal();
    const [current, setCurrent] = useState(0);
    const [dir, setDir] = useState(1);
    const [animating, setAnimating] = useState(false);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef(null);

    const goTo = useCallback((nextIdx, direction) => {
        if (animating || nextIdx === current) return;
        setDir(direction);
        setAnimating(true);
        setCurrent(nextIdx);
        setTimeout(() => setAnimating(false), 520);
    }, [animating, current]);

    const goNext = useCallback(() => goTo((current + 1) % projects.length, 1), [current, goTo]);
    const goPrev = useCallback(() => goTo((current - 1 + projects.length) % projects.length, -1), [current, goTo]);

    useEffect(() => {
        if (paused) return;
        timerRef.current = setTimeout(goNext, AUTOPLAY_DELAY);
        return () => clearTimeout(timerRef.current);
    }, [current, paused, goNext]);

    const p = projects[current];

    return (
        <section id="projects" className="section-base" ref={sectionRef}>
            <div className="container">

                {/* Header */}
                <div className="section-header">
                    <div className="section-eyebrow reveal"><span /> Featured Work <span /></div>
                    <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
                        Things I've <span className="gradient-text">Built</span>
                    </h2>
                    <p className="section-subtitle reveal" style={{ transitionDelay: '0.2s' }}>
                        Use the arrows or dots to explore my projects.
                    </p>
                </div>

                {/* Slider wrapper */}
                <div className="reveal" style={{ transitionDelay: '0.3s' }}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >

                    {/* Progress bar */}
                    <div style={{ height: '3px', background: '#e0f2fe', borderRadius: '999px', marginBottom: '24px', overflow: 'hidden' }}>
                        <div key={`${current}-p`} style={{
                            height: '100%',
                            background: 'linear-gradient(90deg,#38bdf8,#0ea5e9)',
                            borderRadius: '999px',
                            animation: paused ? 'none' : `progressFill ${AUTOPLAY_DELAY}ms linear`,
                        }} />
                    </div>

                    {/* Slide viewport */}
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px' }}>
                        <div
                            key={current}
                            className="glass-card proj-card-grid"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                minHeight: '420px',
                                overflow: 'hidden',
                                animation: `slideIn${dir > 0 ? 'Right' : 'Left'} 0.5s cubic-bezier(.4,0,.2,1) both`,
                            }}
                        >
                            {/* Visual panel */}
                            <div className="proj-visual-panel" style={{
                                background: `linear-gradient(135deg,${p.from},${p.to})`,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                                padding: '48px 32px', gap: '20px',
                                position: 'relative', overflow: 'hidden',
                            }}>
                                <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', top: -80, right: -80 }} />
                                <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', bottom: -40, left: -40 }} />
                                <div style={{
                                    width: 110, height: 110, borderRadius: '28px',
                                    background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '3rem', boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                                }}>
                                    {p.emoji}
                                </div>
                                <div style={{
                                    padding: '5px 16px', borderRadius: '999px',
                                    background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                                    fontSize: '0.75rem', fontWeight: 700, color: '#fff', letterSpacing: '0.1em',
                                }}>
                                    {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                                </div>
                            </div>

                            {/* Content panel */}
                            <div className="proj-content-panel" style={{
                                padding: '40px 40px',
                                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px',
                                background: 'rgba(255,255,255,0.78)',
                            }}>
                                <div>
                                    <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0ea5e9' }}>
                                        {p.category}
                                    </span>
                                    <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', color: '#0f172a', marginTop: '8px', marginBottom: '14px', lineHeight: 1.2 }}>
                                        {p.title}
                                    </h3>
                                    <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.75, fontWeight: 500, marginBottom: '10px' }}>
                                        {p.desc}
                                    </p>
                                    {/* proj-long-desc hidden on ≤768 by responsive.css */}
                                    <p className="proj-long-desc" style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.7 }}>
                                        {p.longDesc}
                                    </p>
                                </div>

                                <div>
                                    <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                                        Tech Stack
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                                        {p.tools.map(t => <span key={t} className="tag">{t}</span>)}
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        {p.github === '#' ? (
                                            <span className="btn btn-outline" style={{ fontSize: '0.83rem', padding: '0.55rem 1.3rem', opacity: 0.6, cursor: 'not-allowed' }}>GitHub ↗</span>
                                        ) : (
                                            <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: '0.83rem', padding: '0.55rem 1.3rem' }}>GitHub ↗</a>
                                        )}

                                        {p.live === '#' ? (
                                            <span className="btn btn-primary" style={{ fontSize: '0.83rem', padding: '0.55rem 1.3rem', opacity: 0.6, cursor: 'not-allowed' }}>Coming Soon</span>
                                        ) : (
                                            <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ fontSize: '0.83rem', padding: '0.55rem 1.3rem' }}>Live Demo →</a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', flexWrap: 'wrap', gap: '14px' }}>
                        {/* Dots */}
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            {projects.map((_, i) => (
                                <button key={i} onClick={() => goTo(i, i > current ? 1 : -1)} style={{
                                    width: i === current ? '28px' : '8px', height: '8px', borderRadius: '999px', border: 'none', cursor: 'pointer', padding: 0,
                                    background: i === current ? 'linear-gradient(90deg,#38bdf8,#0ea5e9)' : '#bae6fd',
                                    boxShadow: i === current ? '0 0 10px rgba(14,165,233,0.4)' : 'none',
                                    transition: 'all 0.35s cubic-bezier(.4,0,.2,1)',
                                }} />
                            ))}
                        </div>
                        {/* Arrows */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={goPrev} className="btn btn-outline" style={{ width: 46, height: 46, padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                            </button>
                            <button onClick={goNext} className="btn btn-primary" style={{ width: 46, height: 46, padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                        </div>
                    </div>

                    {/* Thumbnail strip — proj-thumb-btn class for responsive */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                        {projects.map((proj, i) => (
                            <button key={i} onClick={() => goTo(i, i > current ? 1 : -1)}
                                className="proj-thumb-btn"
                                style={{
                                    flex: 1, height: '60px', borderRadius: '12px', border: `2px solid ${i === current ? '#0ea5e9' : '#bae6fd'}`,
                                    background: `linear-gradient(135deg,${proj.from}33,${proj.to}33)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.4rem', cursor: 'pointer',
                                    opacity: i === current ? 1 : 0.55,
                                    transition: 'all 0.3s ease',
                                    boxShadow: i === current ? '0 0 14px rgba(14,165,233,0.3)' : 'none',
                                    padding: 0,
                                }}
                                onMouseEnter={e => { if (i !== current) e.currentTarget.style.opacity = '0.85'; }}
                                onMouseLeave={e => { if (i !== current) e.currentTarget.style.opacity = '0.55'; }}
                            >
                                {proj.emoji}
                            </button>
                        ))}
                    </div>

                </div>
            </div>

            <style>{`
        @keyframes slideInRight { from{opacity:0;transform:translateX(70px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInLeft  { from{opacity:0;transform:translateX(-70px)} to{opacity:1;transform:translateX(0)} }
        @keyframes progressFill { from{width:0%} to{width:100%} }
        @media(max-width:700px){
          .proj-card-grid{ grid-template-columns:1fr!important; min-height:unset!important; }
          .proj-visual-panel{ border-radius:20px 20px 0 0!important; }
        }
      `}</style>
        </section>
    );
}

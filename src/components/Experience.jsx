import { useState, useEffect, useRef } from 'react';

const expData = [
    {
        icon: '💼',
        type: 'INTERNSHIP',
        year: 'Dec 2025 – Present',
        title: 'Junior Developer Intern',
        company: 'The Development Studio',
        link: 'https://www.devstudioco.com/#home',
        location: 'Remote',
        desc: 'Developing responsive React.js applications, improving UI/UX metrics, and integrating REST APIs for real-time data.',
        bullets: [
            'Built reusable component library used across 3 products',
            'Improved load performance by 30% through code splitting',
            'Integrated REST APIs for live data rendering',
            'Participated in daily stand-ups and code reviews',
        ],
        tags: ['React.js', 'JavaScript', 'CSS3', 'REST APIs', 'Git'],
        active: true,
    },
    {
        icon: '🌟',
        type: 'UPCOMING',
        year: '2026 — Open',
        title: 'Full-Stack / AI Engineer',
        company: 'Open to Opportunities',
        location: 'Remote or On-Site',
        desc: 'Actively exploring full-time roles in frontend, full-stack or AI-adjacent engineering. Excited to join an impact-driven team.',
        tags: ['React.js', 'Node.js', 'Python', 'Machine Learning'],
        active: false,
    },
];

function ExpCard({ item, index, visible }) {
    return (
        <div
            className="timeline-item"
            style={{
                position: 'relative',
                marginBottom: '40px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(36px)',
                transition: `opacity 0.6s ease ${index * 0.22}s, transform 0.6s ease ${index * 0.22}s`,
            }}
        >
            {/* Node */}
            <div className={`timeline-node ${item.active ? 'timeline-node--active' : ''}`}>
                <span style={{ fontSize: '0.9rem' }}>{item.icon}</span>
            </div>

            {/* Card */}
            <div
                className="glass-card"
                style={{
                    padding: '28px 32px',
                    position: 'relative', overflow: 'hidden',
                    opacity: item.active ? 1 : 0.72,
                    borderStyle: item.active ? 'solid' : 'dashed',
                }}
            >
                <div className="card-top-bar" style={{
                    background: item.active
                        ? 'linear-gradient(90deg,#0ea5e9,#38bdf8,transparent)'
                        : 'linear-gradient(90deg,#bae6fd,#e0f2fe,transparent)'
                }} />

                {/* Badge + year */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span className="badge" style={{ color: item.active ? '#0284c7' : '#64748b', background: item.active ? '#e0f2fe' : '#f8fafc', borderColor: item.active ? '#bae6fd' : '#e2e8f0' }}>
                        {item.active && <span className="dot-pulse" style={{ background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />}
                        {item.type}
                    </span>
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontSize: '0.73rem', fontWeight: 700, color: '#0369a1',
                        background: '#f0f9ff', border: '1px solid #bae6fd',
                        padding: '5px 14px', borderRadius: '999px',
                    }}>
                        {item.year}
                    </span>
                </div>

                <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#0f172a', marginBottom: '4px' }}>
                    {item.title}
                </h3>
                {item.link ? (
                    <a href={item.link} target="_blank" rel="noreferrer" style={{ display: 'inline-block', fontSize: '0.95rem', fontWeight: 600, color: '#0284c7', marginBottom: '2px', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                        {item.company} ↗
                    </a>
                ) : (
                    <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0284c7', marginBottom: '2px' }}>{item.company}</p>
                )}
                <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '14px' }}>📍 {item.location}</p>

                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, fontWeight: 500, marginBottom: item.bullets ? '14px' : '18px' }}>
                    {item.desc}
                </p>

                {item.bullets && (
                    <ul style={{ marginBottom: '18px', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {item.bullets.map((b, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: '#475569', fontWeight: 500 }}>
                                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0ea5e9', flexShrink: 0, marginTop: 6 }} />
                                {b}
                            </li>
                        ))}
                    </ul>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
            </div>
        </div>
    );
}

export default function Experience() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="experience" className="section-base section-tint" ref={sectionRef}>
            <div className="container">

                {/* Header */}
                <div className="section-header">
                    <div className="section-eyebrow" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s' }}>
                        <span /> Work History <span />
                    </div>
                    <h2 className="section-title" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.6s ease 0.1s' }}>
                        Professional <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="section-subtitle" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}>
                        Real-world roles and contributions in technology.
                    </p>
                </div>

                {/* Timeline */}
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <div className="timeline-wrap">
                        <div className="timeline-rail" />

                        {expData.map((item, i) => (
                            <ExpCard key={i} item={item} index={i} visible={visible} />
                        ))}

                        {/* End cap */}
                        <div className="timeline-foot">
                            <div className="timeline-foot-dot">⭐</div>
                            <p style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0ea5e9' }}>
                                Open to exciting new opportunities!
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

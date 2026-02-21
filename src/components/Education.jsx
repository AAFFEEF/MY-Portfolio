import { useState, useEffect, useRef } from 'react';

const educationData = [
    {
        icon: '🏫',
        type: 'SCHOOL',
        year: '2019 – 2023',
        title: 'Higher Secondary Certificate (HSC)',
        institution: 'SMA VIMAL.MRT.HR.SEC.SCHOOL',
        link: 'https://smsvimal.com/',
        location: 'Tamil Nadu, India',
        desc: 'Completed HSC with a strong foundation in Mathematics, Physics, and Computer Science, which ignited a deep passion for technology and problem-solving.',
        tags: ['Mathematics', 'Physics', 'Computer Science'],
    },
    {
        icon: '🎓',
        type: 'COLLEGE',
        year: '2023 – 2027',
        title: 'Bachelor of Engineering — Computer Science',
        institution: 'Vel Tech High Tech Dr.Rangarajan Dr.Sakunthala Engineering College (An Autonomous Institution)',
        link: 'https://www.velhightech.com/',
        location: 'Chennai, Tamil Nadu',
        desc: 'Pursuing B.E. Computer Science with specialisation in AI & Machine Learning. Actively participating in hackathons, tech clubs, and real-world projects.',
        tags: ['AI & ML', 'Full-Stack Dev', 'Data Structures', 'React.js', 'Python'],
        active: true,
    },
];

function TimelineCard({ item, index, visible }) {
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
            <div className="glass-card" style={{ padding: '28px 32px', position: 'relative', overflow: 'hidden' }}>
                <div className="card-top-bar" />

                {/* Row: badge + year */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span className="badge">{item.type}</span>
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontSize: '0.73rem', fontWeight: 700, color: '#0369a1',
                        background: '#f0f9ff', border: '1px solid #bae6fd',
                        padding: '5px 14px', borderRadius: '999px',
                    }}>
                        {item.active && <span className="dot-pulse" />}
                        {item.year}
                    </span>
                </div>

                <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#0f172a', marginBottom: '4px' }}>
                    {item.title}
                </h3>
                {item.link ? (
                    <a href={item.link} target="_blank" rel="noreferrer" style={{ display: 'inline-block', fontSize: '0.95rem', fontWeight: 600, color: '#0284c7', marginBottom: '2px', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                        {item.institution} ↗
                    </a>
                ) : (
                    <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0284c7', marginBottom: '2px' }}>{item.institution}</p>
                )}
                <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '14px' }}>📍 {item.location}</p>

                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, fontWeight: 500, marginBottom: '18px' }}>
                    {item.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
            </div>
        </div>
    );
}

export default function Education() {
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
        <section id="education" className="section-base" ref={sectionRef}>
            <div className="container">

                {/* Header */}
                <div className="section-header">
                    <div className="section-eyebrow" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s' }}>
                        <span /> Academic Journey <span />
                    </div>
                    <h2 className="section-title" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.6s ease 0.1s' }}>
                        Education &amp; <span className="gradient-text">Roadmap</span>
                    </h2>
                    <p className="section-subtitle" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}>
                        My academic path from school through engineering college.
                    </p>
                </div>

                {/* Timeline */}
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <div className="timeline-wrap">
                        <div className="timeline-rail" />

                        {educationData.map((item, i) => (
                            <TimelineCard key={i} item={item} index={i} visible={visible} />
                        ))}

                        {/* End cap */}
                        <div className="timeline-foot">
                            <div className="timeline-foot-dot">🚀</div>
                            <p style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0ea5e9' }}>
                                Continuing the journey — stay tuned!
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

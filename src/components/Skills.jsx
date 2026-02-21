import useReveal from '../hooks/useReveal';
import { FaRobot, FaPalette, FaLaptopCode, FaReact, FaPython, FaNodeJs, FaBrain, FaGitAlt, FaJs } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb } from 'react-icons/si';

const services = [
    {
        icon: <FaRobot color="#0ea5e9" />,
        title: 'AI Architecture',
        desc: 'Designing and integrating ML models into real-world applications — from feature engineering to API deployment.',
        tags: ['Python', 'Scikit-learn', 'NLP', 'LLMs'],
    },
    {
        icon: <FaPalette color="#0ea5e9" />,
        title: 'UI / UX Design',
        desc: 'Crafting wireframes, interactive prototypes, and polished design systems that users love.',
        tags: ['Figma', 'User Research', 'Design Systems'],
    },
    {
        icon: <FaLaptopCode color="#0ea5e9" />,
        title: 'MERN Full Stack Developer',
        desc: 'Building end-to-end web applications using MongoDB, Express.js, React.js, and Node.js — from database design to polished UI.',
        tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    },
];

const techStack = [
    { name: 'React.js', icon: <FaReact color="#61DAFB" /> },
    { name: 'Python', icon: <FaPython color="#3776AB" /> },
    { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06B6D4" /> },
    { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
    { name: 'AI / ML', icon: <FaBrain color="#FF6F61" /> },
    { name: 'Git', icon: <FaGitAlt color="#F05032" /> },
    { name: 'JavaScript', icon: <FaJs color="#F7DF1E" /> },
];

export default function Skills() {
    const ref = useReveal();

    return (
        <section id="skills" className="section-base section-tint" ref={ref}>
            <div className="container">

                {/* Header */}
                <div className="section-header">
                    <div className="section-eyebrow reveal"><span /> What I Offer <span /></div>
                    <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
                        Services &amp; <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="section-subtitle reveal" style={{ transitionDelay: '0.2s' }}>
                        From intelligent AI systems to powerful full-stack web applications.
                    </p>
                </div>

                {/* Service cards — skills-service-grid 1col on ≤768 */}
                <div className="skills-service-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '20px', marginBottom: '48px',
                }}>
                    {services.map((s, i) => (
                        <div key={i} className="glass-card glass-card-lift reveal" style={{
                            padding: '32px 24px',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                            position: 'relative', overflow: 'hidden',
                            transitionDelay: `${i * 0.12}s`,
                        }}>
                            <div className="card-top-bar" />
                            <div style={{
                                width: 64, height: 64, borderRadius: '16px',
                                background: 'linear-gradient(135deg,#e0f2fe,#f0f9ff)',
                                border: '1px solid #bae6fd',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.8rem', marginBottom: '18px',
                                boxShadow: '0 4px 14px rgba(14,165,233,0.1)',
                            }}>
                                {s.icon}
                            </div>
                            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', marginBottom: '10px' }}>{s.title}</h3>
                            <p style={{ fontSize: '0.87rem', color: '#475569', lineHeight: 1.7, fontWeight: 500, marginBottom: '18px', flexGrow: 1 }}>{s.desc}</p>
                            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg,transparent,#bae6fd,transparent)', margin: '4px 0 14px' }} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', justifyContent: 'center' }}>
                                {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tech stack — tech-stack-grid responsive via responsive.css */}
                <div className="glass-card reveal" style={{ padding: '32px', transitionDelay: '0.35s' }}>
                    <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.05rem', color: '#0f172a', textAlign: 'center', marginBottom: '22px' }}>
                        Tech Stack
                    </h3>
                    <div className="tech-stack-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: '10px' }}>
                        {techStack.map((t, i) => (
                            <div key={i} className="tech-stack-item" style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
                                padding: '14px 8px',
                                background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: '12px',
                                cursor: 'default', transition: 'border-color 0.25s,transform 0.25s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#0ea5e9'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0f2fe'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>{t.icon}</span>
                                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0369a1', textAlign: 'center' }}>{t.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

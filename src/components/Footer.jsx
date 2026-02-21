const navLinks = ['Home', 'About', 'Education', 'Experience', 'Projects', 'Services', 'Contact'];
const hrefs = ['#hero', '#about', '#education', '#experience', '#projects', '#skills', '#contact'];

export default function Footer() {
    const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <footer style={{
            position: 'relative',
            borderTop: '1px solid rgba(14,165,233,0.15)',
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '44px 24px 28px',
        }}>
            <div className="container">

                {/* footer-top-row — stacks on ≤768 */}
                <div className="footer-top-row" style={{
                    display: 'flex', flexWrap: 'wrap',
                    gap: '28px', justifyContent: 'space-between', marginBottom: '36px',
                }}>

                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <img src="/LOGO 2.svg" alt="AAN Logo" style={{ height: '34px', width: 'auto' }} />
                            <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', letterSpacing: '0.05em' }}>
                                AaffeefAhmed N.
                            </span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500, maxWidth: '200px', lineHeight: 1.6 }}>
                            MERN Stack Developer &amp; AI Enthusiast. Building intelligent, beautiful products.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <p style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0284c7', marginBottom: '12px' }}>Navigation</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 22px' }}>
                            {navLinks.map((label, i) => (
                                <a key={label} href={hrefs[i]}
                                    onClick={e => { e.preventDefault(); scrollTo(hrefs[i]); }}
                                    style={{ fontSize: '0.83rem', fontWeight: 600, color: '#475569', textDecoration: 'none', transition: 'color 0.2s' }}
                                    onMouseEnter={e => e.target.style.color = '#0ea5e9'}
                                    onMouseLeave={e => e.target.style.color = '#475569'}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <p style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0284c7', marginBottom: '12px' }}>Contact</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                            {[
                                { label: 'n.aaffeefahmed@gmail.com', href: 'mailto:n.aaffeefahmed@gmail.com' },
                                { label: '+91 9655 747 689', href: 'tel:+919655747689' },
                                { label: 'Tamil Nadu, India', href: '#' },
                            ].map(c => (
                                <a key={c.label} href={c.href}
                                    style={{ fontSize: '0.83rem', fontWeight: 500, color: '#475569', textDecoration: 'none', transition: 'color 0.2s' }}
                                    onMouseEnter={e => e.target.style.color = '#0ea5e9'}
                                    onMouseLeave={e => e.target.style.color = '#475569'}
                                >
                                    {c.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(14,165,233,0.2),transparent)', marginBottom: '22px' }} />

                {/* footer-bottom-row — stacks on ≤480 */}
                <div className="footer-bottom-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 500 }}>
                        © {new Date().getFullYear()} AaffeefAhmed N. — All rights reserved.
                    </p>
                    <p style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 500 }}>
                        Built with React &amp; Tailwind CSS ✦
                    </p>
                </div>

            </div>
        </footer>
    );
}

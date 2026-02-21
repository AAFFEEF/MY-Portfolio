import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import emailjs from '@emailjs/browser';

const contactDetails = [
    { icon: '✉️', label: 'Email', value: 'n.aaffeefahmed@gmail.com', href: 'mailto:n.aaffeefahmed@gmail.com' },
    { icon: '📞', label: 'Phone', value: '+91 9655 747 689', href: 'tel:+919655747689' },
    { icon: '📍', label: 'Location', value: 'Chennai, Tamil Nadu, India', href: '#' },
];

export default function Contact() {
    const ref = useReveal();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Save to MongoDB Backend
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                // 2. Send Greeting Response using EmailJS
                // AI-enhanced professional greeting message
                const aiEnhancedGreeting = `Hi ${form.name},

Thank you for getting in touch through my website! I have received your inquiry and I am looking forward to learning more about your project.

I am currently reviewing the details you provided and will get back to you within the next 24 hours so we can discuss how to bring your vision to life.

In the meantime, if you have any additional details, design inspirations, or requirements you'd like to share, feel free to reply directly to this email.

Best regards,

AaffeefAhmed N > MERN Stack Web Developer

n.aaffeefahmed@gmail.com

9655747689`;

                try {
                    await emailjs.send(
                        'service_bxpd27o',       // The Service ID provided
                        'template_dquutqh',      // IMPORTANT: Replace with your actual EmailJS Template ID
                        {
                            to_name: form.name,
                            to_email: form.email,
                            from_name: 'Aaffeef Ahmed',
                            subject: 'Thank you for reaching out! | AaffeefAhmed - Web Development Services',
                            message: aiEnhancedGreeting,
                            reply_to: 'n.aaffeefahmed@gmail.com'
                        },
                        '3mPbHvnKOsRgXI-CB'
                    );
                    console.log('Automated greeting email sent successfully via EmailJS.');
                } catch (emailError) {
                    console.error('EmailJS Error Object:', emailError);
                    const errorDetails = emailError?.text || emailError?.message || JSON.stringify(emailError);
                    alert('The database saved your message, but the auto-email failed to send. Error: ' + errorDetails);
                }

                setSent(true);
                setForm({ name: '', email: '', message: '' });
            } else {
                let errorMsg = 'We encountered an error while sending your message. Please try again.';
                try {
                    const errData = await response.json();
                    if (errData.details && errData.details.length > 0) {
                        errorMsg = `Validation Error: ${errData.details.join(', ')}`;
                    } else if (errData.error) {
                        errorMsg = `Error: ${errData.error}`;
                    }
                } catch (e) { /* ignore parse error */ }
                alert(errorMsg);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to send message. Please check the network connectivity or try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="section-base" ref={ref}>
            <div className="container">

                {/* Header */}
                <div className="section-header">
                    <div className="section-eyebrow reveal"><span /> Get In Touch <span /></div>
                    <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
                        Let's Build <span className="gradient-text">Together</span>
                    </h2>
                    <p className="section-subtitle reveal" style={{ transitionDelay: '0.2s' }}>
                        Open to new projects, roles, or a friendly tech conversation.
                    </p>
                </div>

                {/* contact-two-col stacks on ≤768 */}
                <div className="contact-two-col" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                    gap: '24px', alignItems: 'start',
                }}>

                    {/* ── Left: info ── */}
                    <div className="reveal-left">
                        <div className="glass-card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
                            <div className="card-top-bar" />
                            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#0f172a', marginBottom: '8px' }}>Say Hello 👋</h3>
                            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, fontWeight: 500, marginBottom: '24px' }}>
                                Whether you have a project, a role to discuss, or just want to connect — I'd love to hear from you.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '20px' }}>
                                {contactDetails.map(d => (
                                    <a key={d.label} href={d.href} style={{
                                        display: 'flex', alignItems: 'center', gap: '12px',
                                        background: '#f0f9ff', border: '1px solid #e0f2fe',
                                        borderRadius: '11px', padding: '13px 15px',
                                        textDecoration: 'none', color: 'inherit',
                                        transition: 'border-color 0.25s,transform 0.25s',
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#0ea5e9'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0f2fe'; e.currentTarget.style.transform = 'translateX(0)'; }}
                                    >
                                        <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{d.icon}</div>
                                        <div>
                                            <p style={{ fontSize: '0.62rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{d.label}</p>
                                            <p style={{ fontSize: '0.86rem', fontWeight: 600, color: '#0f172a' }}>{d.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                {[
                                    { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/aaffeef-ahmed/' },
                                    { label: 'GitHub ↗', href: 'https://github.com/AAFFEEF' },
                                ].map(s => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                                        className="btn btn-outline" style={{ flex: 1, fontSize: '0.8rem', padding: '0.58rem 0.9rem', justifyContent: 'center' }}>
                                        {s.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right: form ── */}
                    <div className="reveal-right">
                        <div className="glass-card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
                            <div className="card-top-bar" />
                            {sent ? (
                                <div style={{ textAlign: 'center', padding: '44px 0' }}>
                                    <div style={{ fontSize: '3.2rem', marginBottom: '14px' }}>🎉</div>
                                    <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#0f172a', marginBottom: '10px' }}>Message Sent!</h3>
                                    <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6 }}>Thanks! I'll get back to you as soon as possible.</p>
                                    <button onClick={() => setSent(false)} className="btn btn-primary" style={{ marginTop: '22px' }}>Send Another</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#0f172a', marginBottom: '4px' }}>Send a Message</h3>
                                    <input type="text" required placeholder="Your Name" className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                    <input type="email" required placeholder="Your Email" className="form-input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                                    <textarea required placeholder="Your Message" className="form-input" rows={5} style={{ resize: 'vertical' }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                                    <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }} disabled={loading}>
                                        {loading ? 'Sending…' : 'Send Message →'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('https://my-portfolio-1-m9qa.onrender.com/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok && data.token) {
                // Store the JWT token securely
                localStorage.setItem('adminToken', data.token);
                // Redirect to dashboard
                navigate('/admin/dashboard');
            } else {
                setError(data.error || 'Invalid login details');
            }
        } catch (err) {
            setError('Server error. Please check your backend connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section-base" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container">
                <div className="glass-card" style={{ maxWidth: '400px', margin: '0 auto', padding: '40px' }}>
                    <div className="card-top-bar" />
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', color: '#0f172a', marginBottom: '8px', textAlign: 'center' }}>
                        Admin Portal
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px', textAlign: 'center' }}>
                        Sign in to view contact messages.
                    </p>

                    {error && (
                        <div style={{ background: '#fef2f2', color: '#ef4444', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '20px', border: '1px solid #fca5a5' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <input
                            type="text"
                            placeholder="Username"
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', marginTop: '10px' }} disabled={loading}>
                            {loading ? 'Authenticating...' : 'Login securely'}
                        </button>
                    </form>

                    <a href="/" style={{ display: 'block', textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: '#0ea5e9', textDecoration: 'none' }}>
                        &larr; Back to Portfolio
                    </a>
                </div>
            </div>
        </section>
    );
}

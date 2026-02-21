import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function AdminDashboard() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchMessages = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/admin/messages', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem('adminToken');
                navigate('/admin');
                return;
            }

            const data = await res.json();
            if (res.ok) {
                setMessages(data);
            } else {
                setError(data.error || 'Failed to fetch data');
            }
        } catch (err) {
            setError('Could not connect to backend server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [navigate]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;

        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`http://localhost:5000/api/admin/messages/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setMessages((prev) => prev.filter(msg => msg._id !== id));
            } else {
                let errorMsg = 'Failed to delete message.';
                try {
                    const errData = await res.json();
                    if (errData.error) errorMsg = errData.error;
                } catch (e) { }
                alert(errorMsg);
            }
        } catch (err) {
            alert('Server error while deleting.');
        }
    };

    const handleExport = () => {
        if (messages.length === 0) {
            alert("No data available to export.");
            return;
        }

        // Format data specifically for export
        const exportData = messages.map((m) => ({
            Name: m.name,
            Email: m.email,
            Message: m.message,
            Date: new Date(m.date).toLocaleString(),
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Messages");

        // Generate buffer and auto download
        XLSX.writeFile(workbook, "Portfolio_Messages.xlsx");
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#0ea5e9', fontWeight: 600 }}>Loading Dashboard...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Outfit, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 800 }}>Contact Messages</h1>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={handleExport} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📥 Export Excel
                    </button>
                    <button onClick={handleLogout} className="btn btn-primary" style={{ background: '#ef4444', borderColor: '#ef4444' }}>
                        Logout
                    </button>
                    <button onClick={() => navigate('/')} className="btn btn-outline">
                        Main Site
                    </button>
                </div>
            </div>

            {error && (
                <div style={{ background: '#fef2f2', color: '#ef4444', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
                    {error}
                </div>
            )}

            {messages.length === 0 && !error ? (
                <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                    <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No messages found in the database.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
                    {messages.map((msg) => (
                        <div key={msg._id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '16px', flexGrow: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                    <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 700 }}>{msg.name}</h3>
                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                        {new Date(msg.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <a href={`mailto:${msg.email}`} style={{ display: 'inline-block', color: '#0ea5e9', fontSize: '0.9rem', marginBottom: '16px', textDecoration: 'none', fontWeight: 500 }}>
                                    ✉️ {msg.email}
                                </a>
                                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                    {msg.message}
                                </p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                                <button
                                    onClick={() => handleDelete(msg._id)}
                                    style={{ background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
                                >
                                    Delete Message
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

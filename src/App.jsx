import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Terminal, Shield, BookOpen, ChevronRight, X, Lock } from 'lucide-react';
import { writeups } from './data';

function HomePage() {
    const [selectedWriteup, setSelectedWriteup] = useState(null);

    const openWriteup = (w) => {
        setSelectedWriteup(w);
        document.body.style.overflow = 'hidden';
    };

    const closeWriteup = () => {
        setSelectedWriteup(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="container">
            <header>
                <h1><Shield style={{ display: 'inline', marginRight: '1rem', verticalAlign: 'middle', width: '48px', height: '48px', color: 'var(--accent-primary)' }} />Bandit Writeups</h1>
                <p>Your beginner-friendly guide to mastering the Linux command line.</p>
            </header>

            <main>
                <div className="writeups-grid">
                    {writeups.map((w, index) => (
                        <div
                            className="level-card"
                            key={w.id || index}
                            onClick={() => openWriteup(w)}
                            tabIndex={0}
                            role="button"
                            onKeyPress={(e) => e.key === 'Enter' && openWriteup(w)}
                        >
                            <div className="level-title">
                                <h2>{w.title}</h2>
                                <ChevronRight className="chevron-icon" />
                            </div>
                            <p className="description">{w.description}</p>
                        </div>
                    ))}
                </div>
            </main>

            {selectedWriteup && (
                <div className="modal-overlay" onClick={closeWriteup}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2><BookOpen style={{ display: 'inline', marginRight: '10px', verticalAlign: 'middle' }} />{selectedWriteup.title}</h2>
                            <button className="close-btn" onClick={closeWriteup} aria-label="Close modal">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="modal-body markdown-body">
                            <p><strong>Goal:</strong> {selectedWriteup.description}</p>

                            <div className="terminal-block">
                                {[...selectedWriteup.commands].map((cmd, i) => (
                                    <div key={i} className="command">{cmd}</div>
                                ))}
                            </div>

                            <h3>Explanation</h3>
                            <p>{selectedWriteup.explanation}</p>

                            <div className="password-box">
                                <h4><Lock size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} /> Discovered Password</h4>
                                <code>{selectedWriteup.password}</code>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');

    const [newWriteup, setNewWriteup] = useState({
        title: '',
        description: '',
        commands: '',
        explanation: '',
        password: ''
    });
    const [status, setStatus] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const encoder = new TextEncoder();
        const data = encoder.encode(passwordInput);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        // Check against the SHA-256 hash
        if (hashHex === '79f59426bcd514d77a4b968ab937c211ae0c4e3eaf3a19541a8b48b7370ecdba') {
            setIsAuthenticated(true);
        } else {
            alert("Invalid password");
        }
    };

    const handleAdminSubmit = async (e) => {
        e.preventDefault();
        setStatus('Saving...');

        const newId = writeups.length ? Math.max(...writeups.map(w => w.id)) + 1 : 0;

        const newEntry = {
            id: newId,
            title: newWriteup.title,
            description: newWriteup.description,
            commands: newWriteup.commands.split('\n').filter(c => c.trim() !== ''),
            explanation: newWriteup.explanation,
            password: newWriteup.password
        };

        try {
            const res = await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEntry)
            });
            const data = await res.json();

            if (res.ok) {
                setStatus(data.message);
                setNewWriteup({ title: '', description: '', commands: '', explanation: '', password: '' });
            } else {
                setStatus('Error: ' + data.error);
                alert('Error: ' + data.error);
            }
        } catch (err) {
            setStatus('Network error: ' + err.message);
            alert('Network error: ' + err.message);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
                <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}><Terminal style={{ display: 'inline', marginRight: '10px', verticalAlign: 'middle' }} />Admin Access</h2>
                <form onSubmit={handleLogin} style={{ background: 'var(--bg-color-light)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--accent-primary)', width: '100%', maxWidth: '400px' }}>
                    <div className="admin-form">
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" required value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} autoFocus />
                        </div>
                        <button type="submit" className="submit-btn" style={{ marginTop: '1rem' }}>Login</button>
                    </div>
                    <button type="button" onClick={() => navigate('/')} className="admin-btn" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>Back to Site</button>
                </form>
            </div>
        );
    }

    return (
        <div className="container">
            <header>
                <button className="admin-btn" style={{ marginBottom: '1rem', display: 'inline-flex' }} onClick={() => navigate('/')}>
                    <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} /> Back
                </button>
                <h1><Terminal style={{ display: 'inline', marginRight: '1rem', verticalAlign: 'middle', width: '48px', height: '48px', color: 'var(--accent-primary)' }} />Admin Area</h1>
                <p>Generate a writeup and commit it to GitHub automatically.</p>
            </header>

            <div style={{ background: 'var(--bg-color-light)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--accent-primary)' }}>
                <form onSubmit={handleAdminSubmit} className="admin-form">
                    <div className="form-group">
                        <label>Level Title</label>
                        <input required type="text" placeholder="e.g. Level 4 -> 5" value={newWriteup.title} onChange={e => setNewWriteup({ ...newWriteup, title: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea required rows="2" value={newWriteup.description} onChange={e => setNewWriteup({ ...newWriteup, description: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Commands (One per line)</label>
                        <textarea required rows="4" value={newWriteup.commands} onChange={e => setNewWriteup({ ...newWriteup, commands: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Explanation</label>
                        <textarea required rows="4" value={newWriteup.explanation} onChange={e => setNewWriteup({ ...newWriteup, explanation: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input required type="text" value={newWriteup.password} onChange={e => setNewWriteup({ ...newWriteup, password: e.target.value })} />
                    </div>
                    <button type="submit" className="submit-btn">Save & Push to GitHub</button>
                    {status && <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--accent-primary)' }}>{status}</p>}
                </form>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/mg" element={<AdminPage />} />
            </Routes>
        </BrowserRouter>
    );
}

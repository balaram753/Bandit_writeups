import React from 'react';
import { DEVELOPER } from '../data';
import Card from '../components/ui/Card';
import { Github, Linkedin, Instagram, Code, Shield, Briefcase } from 'lucide-react';
import './Developer.css';

const Developer = () => {
    const dev = DEVELOPER;

    return (
        <div className="container dev-container">
            <h2 className="dev-header">
                Meet the Developer
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <Card className="member-card dev-card-main">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                        <img
                            src={dev.image || `https://ui-avatars.com/api/?name=${dev.name}&background=random`}
                            alt={dev.name}
                            className="dev-avatar"
                        />
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ color: 'var(--text-color)', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>{dev.name}</h3>
                            <p style={{ color: 'var(--accent-secondary)', fontSize: '1.2rem', margin: 0 }}>{dev.role}</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                            {dev.github && <a href={dev.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-color)' }}><Github size={24} /></a>}
                            {dev.linkedin && <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-color)' }}><Linkedin size={24} /></a>}
                            {dev.instagram && <a href={dev.instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-color)' }}><Instagram size={24} /></a>}
                        </div>

                        <p style={{ textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.6', color: '#ccc', maxWidth: '600px' }}>
                            {dev.bio}
                        </p>
                    </div>

                    <div style={{ marginTop: '3rem' }}>
                        <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                            <Shield size={24} className="text-secondary" /> Areas of Interest
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                            {dev.interests.map((interest, index) => (
                                <span key={index} style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent-secondary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', border: '1px solid var(--accent-secondary)' }}>
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem' }}>
                        <h4 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                            <Code size={24} className="text-primary" /> Technical Skills
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                            {dev.skills.map((skill, index) => (
                                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    <img src={skill.icon} alt={skill.name} style={{ width: '50px', height: '50px' }} />
                                    <span style={{ fontSize: '0.9rem', color: '#aaa' }}>{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {dev.websites && dev.websites.length > 0 && (
                        <div style={{ marginTop: '4rem', width: '100%' }}>
                            <h4 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                                <Briefcase size={24} className="text-accent" /> Live Websites
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
                                {dev.websites.map((work, index) => (
                                    <div key={index} className="dev-website-card">
                                        <a href={work.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                            <h5 style={{ margin: 0, fontSize: '1.2rem', textAlign: 'center', color: 'var(--text-color)' }}>{work.title}</h5>
                                        </a>
                                        <iframe
                                            src={work.url}
                                            title={work.title}
                                            className="dev-iframe"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {dev.githubProjects && dev.githubProjects.length > 0 && (
                        <div style={{ marginTop: '4rem', width: '100%' }}>
                            <h4 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                                <Github size={24} className="text-primary" /> GitHub Repositories
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' }}>
                                {dev.githubProjects.map((repo, index) => (
                                    <a key={index} href={repo.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(56, 189, 248, 0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.2)', transition: 'all 0.2s ease-in-out', cursor: 'pointer' }} className="github-card">
                                            <Github size={32} style={{ color: 'var(--text-color)' }} />
                                            <div>
                                                <h5 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--accent-primary)' }}>{repo.title}</h5>
                                                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--accent-secondary)' }}>{repo.description}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Developer;

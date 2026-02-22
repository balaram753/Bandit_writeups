import React from 'react';

const Card = ({ children, className = '', style = {} }) => {
    return (
        <div className={`card ${className}`} style={{
            background: 'var(--bg-color-light)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '2rem',
            backgroundColor: 'rgba(31, 40, 51, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'var(--shadow-glow)',
            ...style
        }}>
            {children}
        </div>
    );
};

export default Card;

import React, { useState } from 'react';

const LoginForm = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get('error');

    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: `url(${require('../assets/login-bg.png')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2d3748',
            fontFamily: "'Montserrat', sans-serif"
        }}>
            <h1 style={{
                fontSize: '3.5rem',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#2d3748',
                textShadow: 'none'
            }}>
                MY-SCHEDULE
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#4a5568', fontWeight: '500' }}>
                Your Schedule, Simplified.
            </p>

            <div style={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '40px',
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', textAlign: 'center', marginBottom: '30px', color: '#2d3748' }}>Student Login</h2>

                <div style={{ width: '100%' }}>
                    <a href="http://localhost:8082/login" style={{ textDecoration: 'none', display: 'block' }}>
                        <button
                            type="button"
                            style={{
                                width: '100%',
                                padding: '14px',
                                backgroundColor: '#4fd1c5',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 6px rgba(79, 209, 197, 0.2)',
                                fontFamily: "'Montserrat', sans-serif"
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#38b2ac';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = '#4fd1c5';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            Login with Google
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;

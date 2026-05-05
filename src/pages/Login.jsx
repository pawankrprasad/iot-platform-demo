import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTheme, styles } from '../context/ThemeContext';
import { authApi } from '../api';
import { setLoading as setAuthLoading, loginSuccess, loginFailed } from '../store';

export default function Login() {
    const { dark } = useTheme();
    const st = styles(dark);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('pkprasad06@gmail.com');
    const [password, setPassword] = useState('Welcome@123!');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter your email and password.');
            return;
        }
        dispatch(setAuthLoading());
        setLoading(true);
        try {
            const { data: { accessToken = '', refreshToken = '', user = null } } = await authApi.login({ email, password });
            dispatch(loginSuccess({ accessToken, refreshToken, user }));
            navigate('/', { replace: true });
        } catch (err) {
            const message = err?.message ?? 'Login failed. Please check your credentials.';
            dispatch(loginFailed(message));
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const bg = dark ? '#0f1117' : '#f4f6f9';
    const cardBg = dark ? '#161b27' : '#fff';
    const border = dark ? '#ffffff12' : '#e2e8f0';
    const subColor = dark ? '#64748b' : '#718096';
    const inputBg = dark ? '#0f1117' : '#f8fafc';

    return (
        <div
            style={{
                minHeight: '100vh',
                background: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Inter', system-ui, sans-serif",
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background grid / glow decoration */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                        'radial-gradient(circle at 20% 30%, #3b82f618 0%, transparent 50%), radial-gradient(circle at 80% 70%, #8b5cf618 0%, transparent 50%)',
                    pointerEvents: 'none',
                }}
            />

            <div
                style={{
                    width: '100%',
                    maxWidth: 420,
                    padding: '0 16px',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <img src="/assets/logo.png" alt="Logo" style={{ width: '20%', height: '20%' }} />
                    <div style={st.orbitronLogoText}>
                        SMATRYX
                    </div>
                    <div style={st.logoSub}>IoT Platform</div>
                </div>

                {/* Card */}
                <div
                    style={{
                        background: cardBg,
                        border: `1px solid ${border}`,
                        borderRadius: 14,
                        padding: '32px 28px',
                        boxShadow: dark
                            ? '0 20px 60px rgba(0,0,0,0.5)'
                            : '0 8px 32px rgba(0,0,0,0.08)',
                    }}
                >
                    <div
                        style={{
                            fontWeight: 700,
                            fontSize: 17,
                            marginBottom: 4,
                            color: dark ? '#f8fafc' : '#1a202c',
                        }}
                    >
                        Sign in to your account
                    </div>
                    <div style={{ fontSize: 12, color: subColor, marginBottom: 24 }}>
                        Welcome back — enter your credentials below
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Email */}
                        <div style={{ marginBottom: 14 }}>
                            <label
                                style={{
                                    display: 'block',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    marginBottom: 6,
                                    color: dark ? '#94a3b8' : '#4a5568',
                                }}
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                placeholder="admin@smatryx.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    ...st.input,
                                    boxSizing: 'border-box',
                                    background: inputBg,
                                    transition: 'border-color .15s',
                                }}
                                onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                                onBlur={(e) =>
                                    (e.target.style.borderColor = dark ? '#ffffff18' : '#e2e8f0')
                                }
                            />
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: 20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <label
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: dark ? '#94a3b8' : '#4a5568',
                                    }}
                                >
                                    Password
                                </label>
                                <span
                                    style={{ fontSize: 11, color: '#3b82f6', cursor: 'pointer' }}
                                    onClick={() => setError('Password reset not implemented in demo.')}
                                >
                                    Forgot password?
                                </span>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        ...st.input,
                                        boxSizing: 'border-box',
                                        paddingRight: 38,
                                        background: inputBg,
                                        transition: 'border-color .15s',
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                                    onBlur={(e) =>
                                        (e.target.style.borderColor = dark ? '#ffffff18' : '#e2e8f0')
                                    }
                                />
                                <span
                                    onClick={() => setShowPassword((v) => !v)}
                                    style={{
                                        position: 'absolute',
                                        right: 10,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        fontSize: 14,
                                        color: subColor,
                                        userSelect: 'none',
                                    }}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </span>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div
                                style={{
                                    background: '#ef444420',
                                    border: '1px solid #ef444440',
                                    borderRadius: 6,
                                    padding: '8px 12px',
                                    fontSize: 12,
                                    color: '#ef4444',
                                    marginBottom: 16,
                                }}
                            >
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: 8,
                                border: 'none',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontSize: 13,
                                fontWeight: 600,
                                background: loading
                                    ? '#3b82f680'
                                    : 'linear-gradient(135deg, #3b82f6, #6366f1)',
                                color: '#fff',
                                boxShadow: loading ? 'none' : '0 4px 14px #3b82f640',
                                transition: 'opacity .15s, transform .1s',
                                letterSpacing: 0.3,
                            }}
                            onMouseEnter={(e) => { if (!loading) e.target.style.opacity = '0.88'; }}
                            onMouseLeave={(e) => { e.target.style.opacity = '1'; }}
                        >
                            {loading ? 'Signing in…' : 'Sign in'}
                        </button>
                    </form>


                </div>

                {/* Footer */}
                <div style={{ textAlign: 'center', fontSize: 11, color: subColor, marginTop: 20 }}>
                    © 2026 Smatryx· All rights reserved
                </div>
            </div>
        </div>
    );
}

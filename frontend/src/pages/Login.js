import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LogIn, Eye, EyeOff, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.login(form);
      login({ name: res.data.name, email: res.data.email, role: res.data.role }, res.data.token);
      toast.success(`Welcome back, ${res.data.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials!');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: '8px', color: '#fff',
    fontSize: '0.95rem', outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%', maxWidth: '420px',
        background: 'linear-gradient(145deg, #111 0%, #1a1a2e 100%)',
        border: '1px solid rgba(212,175,55,0.2)',
        borderRadius: '20px', padding: '40px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Zap size={40} color="#d4af37" style={{ marginBottom: '1rem' }} />
          <h1 style={{ color: '#fff', fontSize: '1.8rem', fontFamily: 'Georgia, serif', margin: 0 }}>
            Welcome Back
          </h1>
          <p style={{ color: '#555', margin: '8px 0 0' }}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#888', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Email</label>
            <input
              type="email" required style={inputStyle}
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#888', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'} required style={inputStyle}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: '#555', cursor: 'pointer',
              }}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px',
            background: loading ? '#555' : 'linear-gradient(135deg, #d4af37, #b8963e)',
            border: 'none', borderRadius: '8px', color: '#000',
            fontWeight: '800', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            letterSpacing: '1px', textTransform: 'uppercase',
          }}>
            <LogIn size={18} />
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#555', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: '700' }}>
            Register Free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

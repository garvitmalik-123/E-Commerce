import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.register(form);
      login({ name: res.data.name, email: res.data.email, role: res.data.role }, res.data.token);
      toast.success(`Welcome, ${res.data.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.email || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: '8px', color: '#fff',
    fontSize: '0.95rem', outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
    }}>
      <div style={{
        width: '100%', maxWidth: '450px',
        background: 'linear-gradient(145deg, #111 0%, #1a1a2e 100%)',
        border: '1px solid rgba(212,175,55,0.2)',
        borderRadius: '20px', padding: '40px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Zap size={40} color="#d4af37" style={{ marginBottom: '1rem' }} />
          <h1 style={{ color: '#fff', fontSize: '1.8rem', fontFamily: 'Georgia, serif', margin: 0 }}>
            Create Account
          </h1>
          <p style={{ color: '#555', margin: '8px 0 0' }}>Join LUXMART today</p>
        </div>

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Garvit Malik' },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'your@email.com' },
            { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
            { label: 'Phone', key: 'phone', type: 'tel', placeholder: '9876543210' },
            { label: 'Address', key: 'address', type: 'text', placeholder: 'Your city, State' },
          ].map(field => (
            <div key={field.key} style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#888', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
                {field.label}
              </label>
              <input
                type={field.type}
                required={['name', 'email', 'password'].includes(field.key)}
                placeholder={field.placeholder}
                style={inputStyle}
                value={form[field.key]}
                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
              />
            </div>
          ))}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px', marginTop: '0.5rem',
            background: loading ? '#555' : 'linear-gradient(135deg, #d4af37, #b8963e)',
            border: 'none', borderRadius: '8px', color: '#000',
            fontWeight: '800', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            letterSpacing: '1px', textTransform: 'uppercase',
          }}>
            <UserPlus size={18} />
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#555', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: '700' }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

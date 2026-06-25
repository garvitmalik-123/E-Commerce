import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Search, User, LogOut, Menu, X, Zap } from 'lucide-react';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${search}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      borderBottom: '1px solid #gold',
      borderBottomColor: '#d4af37',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 30px rgba(212, 175, 55, 0.15)',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={28} color="#d4af37" />
          <span style={{ fontSize: '1.6rem', fontWeight: '800', background: 'linear-gradient(135deg, #d4af37, #f5d77e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Georgia, serif', letterSpacing: '-1px' }}>
            LUXMART
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '500px', margin: '0 2rem', display: 'flex' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRight: 'none',
              borderRadius: '8px 0 0 8px',
              color: '#fff',
              outline: 'none',
              fontSize: '0.9rem',
            }}
          />
          <button type="submit" style={{
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #d4af37, #b8963e)',
            border: 'none',
            borderRadius: '0 8px 8px 0',
            cursor: 'pointer',
            color: '#000',
          }}>
            <Search size={18} />
          </button>
        </form>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/products" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Products
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/orders" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Orders
              </Link>
              <Link to="/cart" style={{ position: 'relative', color: '#ccc', textDecoration: 'none' }}>
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-8px', right: '-8px',
                    background: '#d4af37', color: '#000', borderRadius: '50%',
                    width: '18px', height: '18px', fontSize: '11px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold',
                  }}>{cartCount}</span>
                )}
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d4af37' }}>
                <User size={18} />
                <span style={{ fontSize: '0.85rem' }}>{user?.name?.split(' ')[0]}</span>
              </div>
              <button onClick={handleLogout} style={{
                background: 'transparent', border: '1px solid rgba(212,175,55,0.3)',
                color: '#d4af37', padding: '6px 12px', borderRadius: '6px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                fontSize: '0.85rem',
              }}>
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem' }}>Login</Link>
              <Link to="/register" style={{
                background: 'linear-gradient(135deg, #d4af37, #b8963e)',
                color: '#000', textDecoration: 'none', padding: '8px 20px',
                borderRadius: '6px', fontWeight: '700', fontSize: '0.9rem',
              }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

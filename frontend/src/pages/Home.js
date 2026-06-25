import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, ArrowRight, Zap, Shield, Truck, Star, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const categoryIcons = {
  'Electronics': '📱',
  'Fashion': '👗',
  'Home & Kitchen': '🏠',
  'Sports & Fitness': '💪',
  'Books & Stationery': '📚',
  'Beauty & Health': '✨',
};

const categoryColors = {
  'Electronics': 'linear-gradient(135deg, #1a1a3e, #2d2d6b)',
  'Fashion': 'linear-gradient(135deg, #3e1a2d, #6b2d4a)',
  'Home & Kitchen': 'linear-gradient(135deg, #1a3e2d, #2d6b4a)',
  'Sports & Fitness': 'linear-gradient(135deg, #3e2d1a, #6b4a2d)',
  'Books & Stationery': 'linear-gradient(135deg, #2d1a3e, #4a2d6b)',
  'Beauty & Health': 'linear-gradient(135deg, #3e1a1a, #6b2d2d)',
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      productAPI.getAll(),
      categoryAPI.getAll()
    ]).then(([prodRes, catRes]) => {
      setProducts(Array.isArray(prodRes.data) ? prodRes.data.slice(0, 12) : []);
      setCategories(Array.isArray(catRes.data) ? catRes.data : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleAddToCart = async (productId, e) => {
    e.stopPropagation();
    if (!isLoggedIn) { toast.error('Please login first!'); navigate('/login'); return; }
    try {
      await addToCart(productId);
      toast.success('Added to cart! 🛒');
    } catch { toast.error('Failed to add'); }
  };

  const filteredProducts = activeCategory
    ? products.filter(p => p.category?.id === activeCategory)
    : products;

  return (
    <div style={{ background: '#080810', minHeight: '100vh', color: '#fff' }}>

      {/* Hero Section */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        padding: '120px 2rem 100px',
        background: 'linear-gradient(135deg, #080810 0%, #0d0d2b 50%, #080810 100%)',
      }}>
        {/* Animated background orbs */}
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.1), transparent)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '50px', padding: '6px 16px', marginBottom: '1.5rem' }}>
                <Zap size={14} color="#d4af37" />
                <span style={{ color: '#d4af37', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Premium Shopping</span>
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: '900',
                fontFamily: 'Georgia, serif',
                lineHeight: 1.05,
                margin: '0 0 1.5rem',
                letterSpacing: '-2px',
              }}>
                <span style={{ color: '#fff' }}>Discover</span><br />
                <span style={{ background: 'linear-gradient(135deg, #d4af37 0%, #f5d77e 50%, #d4af37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Premium</span><br />
                <span style={{ color: '#fff' }}>Products</span>
              </h1>
              <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '400px' }}>
                Shop from 90+ curated products across 6 categories. Quality guaranteed, delivered to your doorstep.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/products" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: 'linear-gradient(135deg, #d4af37, #b8963e)',
                  color: '#000', textDecoration: 'none',
                  padding: '14px 32px', borderRadius: '50px',
                  fontWeight: '800', fontSize: '0.95rem',
                  letterSpacing: '1px', textTransform: 'uppercase',
                  boxShadow: '0 8px 32px rgba(212,175,55,0.3)',
                }}>
                  Shop Now <ArrowRight size={18} />
                </Link>
                {!isLoggedIn && (
                  <Link to="/register" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    background: 'transparent', color: '#d4af37',
                    textDecoration: 'none', padding: '14px 32px',
                    borderRadius: '50px', fontWeight: '700',
                    fontSize: '0.95rem', border: '1px solid rgba(212,175,55,0.3)',
                    letterSpacing: '1px', textTransform: 'uppercase',
                  }}>
                    Join Free
                  </Link>
                )}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { number: '90+', label: 'Products', icon: '🛍️' },
                { number: '6', label: 'Categories', icon: '📦' },
                { number: '100%', label: 'Quality', icon: '⭐' },
                { number: 'Free', label: 'Delivery', icon: '🚚' },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '16px', padding: '28px 20px',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: '#d4af37', fontFamily: 'Georgia, serif', lineHeight: 1 }}>{stat.number}</div>
                  <div style={{ color: '#555', fontSize: '0.85rem', marginTop: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div style={{ borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', background: 'rgba(212,175,55,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0' }}>
          {[
            { icon: <Truck size={20} />, title: 'Free Delivery', desc: 'On all orders' },
            { icon: <Shield size={20} />, title: 'Secure Payment', desc: '100% safe & encrypted' },
            { icon: <Star size={20} />, title: 'Premium Quality', desc: 'Curated products only' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 2rem', borderRight: i < 2 ? '1px solid rgba(212,175,55,0.1)' : 'none' }}>
              <div style={{ color: '#d4af37', flexShrink: 0 }}>{f.icon}</div>
              <div>
                <p style={{ margin: 0, color: '#fff', fontWeight: '700', fontSize: '0.9rem' }}>{f.title}</p>
                <p style={{ margin: 0, color: '#555', fontSize: '0.8rem' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div style={{ padding: '80px 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <div>
            <p style={{ color: '#d4af37', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 8px' }}>Browse by</p>
            <h2 style={{ color: '#fff', fontSize: '2.2rem', fontFamily: 'Georgia, serif', margin: 0, letterSpacing: '-1px' }}>
              Categories
            </h2>
          </div>
          <Link to="/products" style={{ color: '#d4af37', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {categories.map((cat, i) => (
            <Link key={cat.id} to={`/products?category=${cat.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: categoryColors[cat.name] || 'linear-gradient(135deg, #1a1a2e, #2d2d4a)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '16px', padding: '32px 24px',
                cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative', overflow: 'hidden',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'; }}
              >
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(212,175,55,0.05)' }} />
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
                  {categoryIcons[cat.name] || '🛒'}
                </div>
                <h3 style={{ color: '#fff', margin: '0 0 4px', fontSize: '1.1rem', fontWeight: '700' }}>{cat.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', margin: 0, fontSize: '0.8rem' }}>{cat.description}</p>
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '4px', color: '#d4af37', fontSize: '0.8rem', fontWeight: '600' }}>
                  Shop Now <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div style={{ padding: '0 2rem 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <p style={{ color: '#d4af37', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 8px' }}>Hand Picked</p>
            <h2 style={{ color: '#fff', fontSize: '2.2rem', fontFamily: 'Georgia, serif', margin: 0, letterSpacing: '-1px' }}>
              Featured Products
            </h2>
          </div>
          <Link to="/products" style={{ color: '#d4af37', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            View All <ChevronRight size={16} />
          </Link>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveCategory(null)} style={{
            padding: '8px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer',
            background: !activeCategory ? 'linear-gradient(135deg, #d4af37, #b8963e)' : 'rgba(255,255,255,0.05)',
            color: !activeCategory ? '#000' : '#888', fontWeight: '700', fontSize: '0.8rem',
            letterSpacing: '0.5px',
          }}>All</button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)} style={{
              padding: '8px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer',
              background: activeCategory === cat.id ? 'linear-gradient(135deg, #d4af37, #b8963e)' : 'rgba(255,255,255,0.05)',
              color: activeCategory === cat.id ? '#000' : '#888', fontWeight: '600', fontSize: '0.8rem',
            }}>{cat.name}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#444' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid rgba(212,175,55,0.2)', borderTop: '3px solid #d4af37', borderRadius: '50%', margin: '0 auto 1rem', animation: 'spin 1s linear infinite' }} />
            Loading...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {filteredProducts.map(product => (
              <div key={product.id} style={{
                background: 'linear-gradient(145deg, #0d0d1a 0%, #111128 100%)',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: '16px', overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.1)'; }}
                onClick={() => navigate('/products')}
              >
                <div style={{ height: '200px', overflow: 'hidden', background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>🛍️</div>
                  )}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', borderRadius: '6px', padding: '4px 10px', fontSize: '0.7rem', color: '#d4af37', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {product.category?.name || 'General'}
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ color: '#fff', margin: '0 0 6px', fontSize: '0.95rem', fontWeight: '700', lineHeight: 1.3 }}>{product.name}</h3>
                  <p style={{ color: '#444', fontSize: '0.78rem', margin: '0 0 14px', lineHeight: 1.5 }}>
                    {product.description?.slice(0, 55)}...
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ color: '#d4af37', fontSize: '1.2rem', fontWeight: '900' }}>₹{product.price?.toLocaleString()}</span>
                      <div style={{ color: product.stock > 0 ? '#4ade80' : '#ef4444', fontSize: '0.7rem', marginTop: '2px' }}>
                        {product.stock > 0 ? `✓ In Stock (${product.stock})` : '✗ Out of Stock'}
                      </div>
                    </div>
                    <button onClick={(e) => handleAddToCart(product.id, e)} disabled={product.stock === 0} style={{
                      background: product.stock === 0 ? '#1a1a1a' : 'linear-gradient(135deg, #d4af37, #b8963e)',
                      border: 'none', color: product.stock === 0 ? '#333' : '#000',
                      padding: '10px 16px', borderRadius: '10px',
                      cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                      fontWeight: '800', fontSize: '0.8rem',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      boxShadow: product.stock > 0 ? '0 4px 16px rgba(212,175,55,0.3)' : 'none',
                    }}>
                      <ShoppingCart size={15} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Banner */}
      <div style={{
        margin: '0 2rem 80px',
        background: 'linear-gradient(135deg, #1a1500 0%, #2d2400 50%, #1a1500 100%)',
        border: '1px solid rgba(212,175,55,0.3)',
        borderRadius: '24px', padding: '60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto',
      }}>
        <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: '#d4af37', fontSize: '2.5rem', fontFamily: 'Georgia, serif', margin: '0 0 1rem', letterSpacing: '-1px' }}>
            Ready to Shop?
          </h2>
          <p style={{ color: '#888', fontSize: '1.1rem', margin: '0 0 2rem' }}>
            Join thousands of happy customers. Free delivery on all orders!
          </p>
          <Link to="/products" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'linear-gradient(135deg, #d4af37, #b8963e)',
            color: '#000', textDecoration: 'none',
            padding: '16px 40px', borderRadius: '50px',
            fontWeight: '800', fontSize: '1rem',
            letterSpacing: '1px', textTransform: 'uppercase',
            boxShadow: '0 8px 32px rgba(212,175,55,0.4)',
          }}>
            Explore All Products <ArrowRight size={20} />
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Home;
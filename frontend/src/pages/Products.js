import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search).get('search');
  const categoryParam = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    categoryAPI.getAll().then(res => setCategories(Array.isArray(res.data) ? res.data : []));
    loadProducts();
  }, [searchParam, categoryParam]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      let res;
      if (searchParam) res = await productAPI.search(searchParam);
      else if (categoryParam) { res = await productAPI.getByCategory(categoryParam); setSelectedCategory(categoryParam); }
      else res = await productAPI.getAll();
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch { toast.error('Failed to load products'); }
    finally { setLoading(false); }
  };

  const filterByCategory = async (catId) => {
    setSelectedCategory(catId);
    setLoading(true);
    try {
      const res = catId === 'all' ? await productAPI.getAll() : await productAPI.getByCategory(catId);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } finally { setLoading(false); }
  };

  const handleAddToCart = async (productId) => {
    if (!isLoggedIn) { toast.error('Please login first!'); return; }
    try {
      await addToCart(productId);
      toast.success('Added to cart!');
    } catch { toast.error('Failed to add to cart'); }
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {searchParam ? `Results for "${searchParam}"` : <><span style={{ color: '#d4af37' }}>All</span> Products</>}
        </h1>
        <p style={{ color: '#555', marginBottom: '2rem' }}>{products.length} products found</p>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button onClick={() => filterByCategory('all')} style={{
            padding: '8px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer',
            background: selectedCategory === 'all' ? 'linear-gradient(135deg, #d4af37, #b8963e)' : 'rgba(255,255,255,0.05)',
            color: selectedCategory === 'all' ? '#000' : '#888', fontWeight: '600', fontSize: '0.85rem',
          }}>All</button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => filterByCategory(cat.id)} style={{
              padding: '8px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer',
              background: selectedCategory === String(cat.id) ? 'linear-gradient(135deg, #d4af37, #b8963e)' : 'rgba(255,255,255,0.05)',
              color: selectedCategory === String(cat.id) ? '#000' : '#888', fontWeight: '600', fontSize: '0.85rem',
            }}>{cat.name}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#444' }}>Loading products...</div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#444' }}>
            <ShoppingCart size={48} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.3 }} />
            <p>No products found</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {products.map(product => (
              <div key={product.id} style={{
                background: 'linear-gradient(145deg, #111 0%, #1a1a2e 100%)',
                border: '1px solid rgba(212,175,55,0.15)', borderRadius: '16px', overflow: 'hidden',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(212,175,55,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ height: '200px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                  {product.imageUrl ? <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '🛍️'}
                </div>
                <div style={{ padding: '20px' }}>
                  <p style={{ color: '#666', fontSize: '0.75rem', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {product.category?.name || 'General'}
                  </p>
                  <h3 style={{ color: '#fff', margin: '0 0 8px', fontSize: '1rem', fontWeight: '700' }}>{product.name}</h3>
                  <p style={{ color: '#555', fontSize: '0.8rem', margin: '0 0 16px', lineHeight: 1.5 }}>
                    {product.description?.slice(0, 70)}...
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#d4af37', fontSize: '1.3rem', fontWeight: '800' }}>₹{product.price}</span>
                    <button onClick={() => handleAddToCart(product.id)} disabled={product.stock === 0} style={{
                      background: product.stock === 0 ? '#333' : 'linear-gradient(135deg, #d4af37, #b8963e)',
                      border: 'none', color: product.stock === 0 ? '#666' : '#000',
                      padding: '8px 16px', borderRadius: '8px',
                      cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                      fontWeight: '700', fontSize: '0.85rem',
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}>
                      <ShoppingCart size={16} />
                      {product.stock === 0 ? 'Out of Stock' : 'Add'}
                    </button>
                  </div>
                  <div style={{ marginTop: '8px', color: product.stock > 0 ? '#4ade80' : '#ef4444', fontSize: '0.75rem' }}>
                    {product.stock > 0 ? `✓ In Stock (${product.stock})` : '✗ Out of Stock'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
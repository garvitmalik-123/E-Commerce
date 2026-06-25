import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cartAPI, orderAPI } from '../services/api';
import { ShoppingCart, Trash2, Plus, Minus, Package } from 'lucide-react';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, fetchCart } = useCart();
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const items = cart?.items || [];
  const total = items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + (price * item.quantity);
  }, 0);

  const handleRemove = async (productId) => {
    try {
      await cartAPI.remove(productId);
      await fetchCart();
      toast.success('Removed from cart!');
    } catch { toast.error('Failed to remove'); }
  };

  const handleUpdate = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await cartAPI.update(productId, quantity);
      await fetchCart();
    } catch { toast.error('Failed to update'); }
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) { toast.error('Cart is empty!'); return; }
    setPlacing(true);
    try {
      await orderAPI.place({ shippingAddress: '' });
      toast.success('Order placed! 🎉');
      await fetchCart();
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally { setPlacing(false); }
  };

  if (items.length === 0) {
    return (
      <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <ShoppingCart size={64} color="#333" />
        <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif' }}>Your cart is empty</h2>
        <p style={{ color: '#555' }}>Add some products to get started</p>
        <Link to="/products" style={{ background: 'linear-gradient(135deg, #d4af37, #b8963e)', color: '#000', textDecoration: 'none', padding: '12px 28px', borderRadius: '8px', fontWeight: '700' }}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: '2rem', marginBottom: '2rem' }}>
          <span style={{ color: '#d4af37' }}>Your</span> Cart ({items.length} items)
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map(item => (
              <div key={item.id} style={{
                background: 'linear-gradient(145deg, #111 0%, #1a1a2e 100%)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '12px', padding: '20px',
                display: 'flex', gap: '1rem', alignItems: 'center',
              }}>
                <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                  {item.product?.imageUrl
                    ? <img src={item.product.imageUrl} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ fontSize: '2rem' }}>🛍️</span>
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#fff', margin: '0 0 4px', fontSize: '1rem' }}>{item.product?.name}</h3>
                  <p style={{ color: '#d4af37', margin: 0, fontWeight: '700' }}>₹{item.product?.price}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => handleUpdate(item.product?.id, item.quantity - 1)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)', color: '#fff', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ color: '#fff', fontWeight: '700', minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => handleUpdate(item.product?.id, item.quantity + 1)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)', color: '#fff', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={14} />
                  </button>
                </div>
                <div style={{ textAlign: 'right', minWidth: '80px' }}>
                  <p style={{ color: '#fff', fontWeight: '700', margin: '0 0 8px' }}>₹{((item.product?.price || 0) * item.quantity).toFixed(0)}</p>
                  <button onClick={() => handleRemove(item.product?.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(145deg, #111 0%, #1a1a2e 100%)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '16px', padding: '24px', height: 'fit-content' }}>
            <h2 style={{ color: '#fff', fontSize: '1.2rem', margin: '0 0 1.5rem', fontFamily: 'Georgia, serif' }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: '#888' }}>Items ({items.length})</span>
              <span style={{ color: '#fff' }}>₹{total.toFixed(0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: '#888' }}>Delivery</span>
              <span style={{ color: '#4ade80' }}>Free</span>
            </div>
            <div style={{ borderTop: '1px solid rgba(212,175,55,0.2)', margin: '1rem 0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#fff', fontWeight: '700', fontSize: '1.1rem' }}>Total</span>
              <span style={{ color: '#d4af37', fontWeight: '800', fontSize: '1.3rem' }}>₹{total.toFixed(0)}</span>
            </div>
            <button onClick={handlePlaceOrder} disabled={placing} style={{
              width: '100%', padding: '14px',
              background: placing ? '#555' : 'linear-gradient(135deg, #d4af37, #b8963e)',
              border: 'none', borderRadius: '8px', color: '#000',
              fontWeight: '800', fontSize: '1rem', cursor: placing ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
              <Package size={18} />
              {placing ? 'Placing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
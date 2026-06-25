import React, { useEffect, useState } from 'react';
import { orderAPI } from '../services/api';
import { Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

const statusConfig = {
  PENDING: { color: '#f59e0b', icon: <Clock size={16} />, label: 'Pending' },
  CONFIRMED: { color: '#3b82f6', icon: <CheckCircle size={16} />, label: 'Confirmed' },
  SHIPPED: { color: '#8b5cf6', icon: <Truck size={16} />, label: 'Shipped' },
  DELIVERED: { color: '#4ade80', icon: <CheckCircle size={16} />, label: 'Delivered' },
  CANCELLED: { color: '#ef4444', icon: <XCircle size={16} />, label: 'Cancelled' },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getAll()
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
      Loading orders...
    </div>
  );

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: '2rem', marginBottom: '2rem' }}>
          <span style={{ color: '#d4af37' }}>My</span> Orders
        </h1>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#444' }}>
            <Package size={64} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.3 }} />
            <p>No orders yet</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map(order => {
              const status = statusConfig[order.status] || statusConfig.PENDING;
              return (
                <div key={order.id} style={{
                  background: 'linear-gradient(145deg, #111 0%, #1a1a2e 100%)',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '16px', padding: '24px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                      <p style={{ color: '#555', fontSize: '0.8rem', margin: '0 0 4px' }}>Order #{order.id}</p>
                      <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: `${status.color}20`, border: `1px solid ${status.color}40`, padding: '6px 14px', borderRadius: '50px' }}>
                      <span style={{ color: status.color }}>{status.icon}</span>
                      <span style={{ color: status.color, fontSize: '0.85rem', fontWeight: '700' }}>{status.label}</span>
                    </div>
                  </div>

                  {order.items?.map(item => (
                    <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: '#ccc', fontSize: '0.9rem' }}>{item.productName} × {item.quantity}</span>
                      <span style={{ color: '#d4af37', fontWeight: '600' }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
                    <span style={{ color: '#888' }}>Total Amount</span>
                    <span style={{ color: '#d4af37', fontWeight: '800', fontSize: '1.2rem' }}>₹{order.totalAmount}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

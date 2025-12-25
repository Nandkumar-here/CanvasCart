import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { artworks } from '../data/artworks';

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        deliveryType: 'physical' // 'physical' | 'digital'
    });

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const hydratedCart = savedCart.map(item => {
            const art = artworks.find(a => a.id === item.id);
            return { ...item, ...art };
        }).filter(item => item.title);

        setCartItems(hydratedCart);

        // Auto-detect delivery type preference
        const hasPhysical = hydratedCart.some(item => item.category !== 'Digital');
        if (!hasPhysical && hydratedCart.length > 0) {
            setFormData(prev => ({ ...prev, deliveryType: 'digital' }));
        }
    }, []);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = formData.deliveryType === 'physical' ? 15 : 0;
    const total = subtotal + shippingCost;

    const handleSubmit = (e) => {
        e.preventDefault();

        const order = {
            id: Date.now(), // Simple ID
            date: new Date().toISOString(),
            items: cartItems,
            customer: formData,
            totals: {
                subtotal,
                shippingCost,
                total
            }
        };

        // Save order
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

        // Clear cart
        localStorage.removeItem('cart');

        // Redirect
        navigate('/success');
    };

    if (cartItems.length === 0) {
        return <div>Cart is empty</div>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="page-title">Checkout</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>

                {/* Form Section */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Delivery Method</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="delivery"
                                    value="physical"
                                    checked={formData.deliveryType === 'physical'}
                                    onChange={e => setFormData({ ...formData, deliveryType: e.target.value })}
                                />
                                Standard Shipping (+$15)
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="delivery"
                                    value="digital"
                                    checked={formData.deliveryType === 'digital'}
                                    onChange={e => setFormData({ ...formData, deliveryType: e.target.value })}
                                />
                                Digital Delivery ($0)
                            </label>
                        </div>
                    </div>

                    {formData.deliveryType === 'physical' && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Shipping Address</label>
                            <textarea
                                required
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--color-border)', minHeight: '100px', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                            />
                        </div>
                    )}

                    <button type="submit" className="btn" style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                        Place Order (${total})
                    </button>
                </form>

                {/* Summary Section */}
                <div style={{ background: 'var(--color-card-bg)', padding: '2rem', borderRadius: '8px', height: 'fit-content', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Order Summary</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {cartItems.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span>{item.title} x {item.quantity}</span>
                                <span>${item.price * item.quantity}</span>
                            </div>
                        ))}

                        <div style={{ borderTop: '1px solid var(--color-border)', margin: '1rem 0' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Subtotal</span>
                            <span>${subtotal}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Shipping</span>
                            <span>${shippingCost}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '1rem' }}>
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { artworks } from '../data/artworks';
import { getCart, saveOrder, clearCart } from '../utils/storage';

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        deliveryType: 'physical' // 'physical' | 'digital'
    });

    // Load Cart Data
    useEffect(() => {
        const storedItems = getCart();
        const hydrated = storedItems.map(item => {
            const art = artworks.find(a => a.id === item.id);
            return art ? { ...item, ...art } : null;
        }).filter(Boolean);

        setCartItems(hydrated);

        // Auto-select digital delivery if only digital items
        const hasPhysical = hydrated.some(item => item.category !== 'Digital');
        if (!hasPhysical && hydrated.length > 0) {
            setFormData(prev => ({ ...prev, deliveryType: 'digital' }));
        }
    }, []);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = formData.deliveryType === 'physical' ? 15 : 0;
    const total = subtotal + shippingCost;

    const handleSubmit = (e) => {
        e.preventDefault();

        const order = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: cartItems,
            customer: formData,
            totals: { subtotal, shippingCost, total }
        };

        saveOrder(order);
        clearCart();
        navigate('/success');
    };

    if (cartItems.length === 0) {
        return <div className="empty-cart-msg">Cart is empty</div>;
    }

    return (
        <div className="checkout-container">
            <h1 className="page-title">Checkout</h1>

            <div className="checkout-layout">
                {/* Checkout Form */}
                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            required
                            type="text"
                            className="form-input"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            required
                            type="email"
                            className="form-input"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Delivery Method</label>
                        <div className="delivery-options">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="delivery"
                                    value="physical"
                                    checked={formData.deliveryType === 'physical'}
                                    onChange={e => setFormData({ ...formData, deliveryType: e.target.value })}
                                />
                                Standard Shipping (+$15)
                            </label>
                            <label className="radio-label">
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
                        <div className="form-group">
                            <label>Shipping Address</label>
                            <textarea
                                required
                                className="form-textarea"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                    )}

                    <button type="submit" className="btn submit-btn">
                        Place Order (${total})
                    </button>
                </form>

                {/* Order Summary Sidebar */}
                <div className="order-sidebar">
                    <h3>Order Summary</h3>
                    <div className="sidebar-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="sidebar-item">
                                <span>{item.title} x {item.quantity}</span>
                                <span>${item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="sidebar-divider" />

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${subtotal}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>${shippingCost}</span>
                    </div>
                    <div className="summary-row total-row">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

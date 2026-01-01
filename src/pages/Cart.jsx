import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { artworks } from '../data/artworks';
import { getCart, updateItemQuantity, removeFromCart, clearCart } from '../utils/storage';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    // Load cart and merge with artwork details
    useEffect(() => {
        const loadCart = () => {
            const storedItems = getCart();
            const hydrated = storedItems.map(item => {
                const art = artworks.find(a => a.id === item.id);
                return art ? { ...item, ...art } : null;
            }).filter(Boolean); // Remove items if artwork deleted/not found

            setCartItems(hydrated);
        };

        loadCart();

        // Listen for updates from other tabs/components
        window.addEventListener('storage', loadCart);
        return () => window.removeEventListener('storage', loadCart);
    }, []);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="cart-page">
            <h1 className="page-title">Your Cart</h1>

            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <h2>Your cart is empty</h2>
                    <Link to="/" className="btn">Browse Artworks</Link>
                </div>
            ) : (
                <div className="cart-layout">
                    {/* Cart Items List */}
                    <div className="cart-list">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div
                                    className="cart-item-image"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />

                                <div className="cart-item-info">
                                    <h3>{item.title}</h3>
                                    <p className="cart-item-medium">{item.medium}</p>

                                    <div className="cart-controls">
                                        <div className="quantity-controls">
                                            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-item-price">
                                    ${item.price * item.quantity}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="cart-summary">
                        <h3>Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal}</span>
                        </div>
                        <p className="shipping-note">Shipping calculated at checkout</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button className="btn checkout-btn" onClick={() => navigate('/checkout')}>
                                Proceed to Checkout
                            </button>
                            <button
                                className="btn btn-outline"
                                style={{ width: '100%', borderColor: '#ef4444', color: '#ef4444' }}
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to clear your cart?')) {
                                        clearCart();
                                    }
                                }}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

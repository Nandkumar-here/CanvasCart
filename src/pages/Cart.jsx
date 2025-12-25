import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { artworks } from '../data/artworks';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        // Hydrate cart with artwork details
        const hydratedCart = savedCart.map(item => {
            const art = artworks.find(a => a.id === item.id);
            return { ...item, ...art };
        }).filter(item => item.title); // Filter out if artwork not found

        setCartItems(hydratedCart);
    }, []);

    const updateQuantity = (id, delta) => {
        const newCart = cartItems.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        });
        setCartItems(newCart);
        saveCart(newCart);
    };

    const removeItem = (id) => {
        const newCart = cartItems.filter(item => item.id !== id);
        setCartItems(newCart);
        saveCart(newCart);
    };

    const saveCart = (items) => {
        // Save only id and quantity to localStorage
        const toSave = items.map(item => ({ id: item.id, quantity: item.quantity }));
        localStorage.setItem('cart', JSON.stringify(toSave));
        // Dispatch event so Navbar could potentially update (not implemented yet but good practice)
        window.dispatchEvent(new Event('storage'));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <h2>Your cart is empty</h2>
                <Link to="/" className="btn" style={{ marginTop: '1rem' }}>Browse Artworks</Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="page-title">Your Cart</h1>
            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '2fr 1fr' }}>

                <div className="cart-list">
                    {cartItems.map(item => (
                        <div key={item.id} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                            <div
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    backgroundImage: `url(${item.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '4px'
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <h3>{item.title}</h3>
                                <p style={{ color: 'var(--color-secondary)' }}>{item.medium}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: '4px' }}>
                                        <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '0.2rem 0.8rem', color: 'var(--color-text)' }}>-</button>
                                        <span style={{ padding: '0 0.5rem' }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '0.2rem 0.8rem', color: 'var(--color-text)' }}>+</button>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} style={{ color: '#ef4444', textDecoration: 'underline' }}>Remove</button>
                                </div>
                            </div>
                            <div style={{ fontWeight: 'bold' }}>
                                ${item.price * item.quantity}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary" style={{ background: 'var(--color-card-bg)', padding: '2rem', borderRadius: '8px', height: 'fit-content', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Summary</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span>Subtotal</span>
                        <span>${subtotal}</span>
                    </div>
                    <p style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Shipping calculated at checkout</p>
                    <button className="btn" style={{ width: '100%' }} onClick={() => navigate('/checkout')}>
                        Proceed to Checkout
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Cart;

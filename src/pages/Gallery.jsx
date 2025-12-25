import React, { useState, useEffect } from 'react';
import { artworks } from '../data/artworks';

const Gallery = () => {
    const [filter, setFilter] = useState('All');

    // Filter artworks based on category
    const filteredArtworks = filter === 'All'
        ? artworks
        : artworks.filter(art => art.category === filter);

    // Helper to add item to Cart in localStorage
    const addToCart = (artwork) => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if item already exists
        const existingItem = existingCart.find(item => item.id === artwork.id);

        let newCart;
        if (existingItem) {
            newCart = existingCart.map(item =>
                item.id === artwork.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            newCart = [...existingCart, { id: artwork.id, quantity: 1 }];
        }

        localStorage.setItem('cart', JSON.stringify(newCart));
        alert(`${artwork.title} added to cart!`);
    };

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                <h1 className="page-title">Gallery</h1>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ padding: '0.5rem', fontSize: '1rem' }}
                >
                    <option value="All">All Categories</option>
                    <option value="Digital">Digital</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Mixed Media">Mixed Media</option>
                </select>
            </div>

            <div className="grid">
                {filteredArtworks.map(art => (
                    <div key={art.id} className="artwork-card" style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}>
                        <div
                            style={{
                                height: '250px',
                                backgroundColor: '#eee',
                                backgroundImage: `url(${art.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '2px',
                                marginBottom: '1rem'
                            }}
                        />
                        <h3>{art.title}</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>{art.artist}</p>
                        <p style={{ fontWeight: 'bold', margin: '0.5rem 0' }}>${art.price}</p>
                        <button className="btn" onClick={() => addToCart(art)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;

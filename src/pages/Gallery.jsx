import React, { useState } from 'react';
import { artworks } from '../data/artworks';
import { addToCart } from '../utils/storage';

const Gallery = () => {
    const [filter, setFilter] = useState('All');

    // Filter logic: show all items or specific category
    const filteredArtworks = filter === 'All'
        ? artworks
        : artworks.filter(art => art.category === filter);

    // Handle user interaction
    const handleAddToCart = (artwork) => {
        addToCart(artwork);
        // Trigger custom notification instead of alert
        window.dispatchEvent(new CustomEvent('show-notification', {
            detail: { message: `${artwork.title} added to cart!` }
        }));
    };

    return (
        <div>
            {/* Header and Filter */}
            <div className="gallery-header">
                <h1 className="page-title">Gallery</h1>
                <select
                    className="category-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    <option value="Digital">Digital</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Mixed Media">Mixed Media</option>
                </select>
            </div>

            {/* Artworks Grid */}
            <div className="grid">
                {filteredArtworks.map(art => (
                    <div key={art.id} className="artwork-card">
                        <div
                            className="artwork-image"
                            style={{ backgroundImage: `url(${art.image})` }}
                        />
                        <div className="artwork-details">
                            <h3>{art.title}</h3>
                            <p className="artist-name">{art.artist}</p>
                            <p className="artwork-price">${art.price}</p>
                            <button className="btn" onClick={() => handleAddToCart(art)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-hero">
            <h1 className="hero-title">CanvasCart</h1>
            <p className="hero-tagline">
                Discover the finest collection of digital and traditional art.
                From masterpiece to marketplace.
            </p>

            <Link to="/gallery" className="btn">
                Shop Now
            </Link>

            <div className="home-features">
                <div className="feature-card">
                    <h3 className="feature-title">Curated Art</h3>
                    <p>Hand-picked selections from top global artists.</p>
                </div>
                <div className="feature-card">
                    <h3 className="feature-title">Secure Shipping</h3>
                    <p>Global delivery Digital and Physical.</p>
                </div>
                <div className="feature-card">
                    <h3 className="feature-title">Digital & Physical</h3>
                    <p>NFTs and physical canvases in one place.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;

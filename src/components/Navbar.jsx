import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container nav-content">
                {/* Logo */}
                <Link to="/" className="logo">CANVASCART</Link>

                {/* Navigation Links */}
                <ul className="nav-links">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/gallery" className="nav-link">Gallery</Link></li>
                    <li><Link to="/contact" className="nav-link">Contact</Link></li>
                    <li>
                        <Link to="/cart" className="cart-link nav-link">
                            Cart
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

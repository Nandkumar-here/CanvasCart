import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../utils/storage';

const Success = () => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const allOrders = getOrders();
        if (allOrders.length > 0) {
            // Get the most recent order
            setOrder(allOrders[allOrders.length - 1]);
        }
    }, []);

    if (!order) {
        return (
            <div className="no-order-container">
                <h2>No recent order found</h2>
                <Link to="/" className="btn">Return to Gallery</Link>
            </div>
        );
    }

    return (
        <div className="success-container">
            <div className="success-icon">✓</div>
            <h1 className="success-title">Order Confirmed!</h1>
            <p className="success-subtitle">Thank you, {order.customer.name}</p>
            <p>Your order #{order.id} has been placed.</p>

            <div className="order-details-card">
                <h3>Order Details</h3>
                <p><strong>Email:</strong> {order.customer.email}</p>
                <p>
                    <strong>Delivery:</strong>{' '}
                    {order.customer.deliveryType === 'digital' ? 'Digital Download' : 'Physical Shipping'}
                </p>
                {order.customer.deliveryType === 'physical' && (
                    <p><strong>Address:</strong> {order.customer.address}</p>
                )}

                <div className="order-total-section">
                    <div className="summary-row total-row">
                        <span>Total Paid</span>
                        <span>${order.totals.total}</span>
                    </div>
                </div>
            </div>

            <Link to="/" className="btn continue-btn">Continue Shopping</Link>
        </div>
    );
};

export default Success;

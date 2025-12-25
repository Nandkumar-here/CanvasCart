import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
        if (allOrders.length > 0) {
            // Get the most recent order
            setOrder(allOrders[allOrders.length - 1]);
        }
    }, []);

    if (!order) {
        return (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <h2>No recent order found</h2>
                <Link to="/" className="btn">Return to Gallery</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center' }}>
            <div style={{ marginBottom: '2rem', color: '#10b981', fontSize: '4rem' }}>✓</div>
            <h1 className="page-title" style={{ marginTop: 0 }}>Order Confirmed!</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-secondary)' }}>Thank you, {order.customer.name}</p>
            <p>Your order #{order.id} has been placed.</p>

            <div style={{ background: 'var(--color-card-bg)', padding: '2rem', borderRadius: '8px', marginTop: '2rem', textAlign: 'left', border: '1px solid var(--color-border)' }}>
                <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>Order Details</h3>
                <p><strong>Email:</strong> {order.customer.email}</p>
                <p><strong>Delivery:</strong> {order.customer.deliveryType === 'digital' ? 'Digital Download' : 'Physical Shipping'}</p>
                {order.customer.deliveryType === 'physical' && <p><strong>Address:</strong> {order.customer.address}</p>}

                <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                        <span>Total Paid</span>
                        <span>${order.totals.total}</span>
                    </div>
                </div>
            </div>

            <Link to="/" className="btn" style={{ marginTop: '2rem' }}>Continue Shopping</Link>
        </div>
    );
};

export default Success;

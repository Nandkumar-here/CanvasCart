import React, { useState, useEffect } from 'react';

const Notification = () => {
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleShowNotification = (event) => {
            setMessage(event.detail.message);
            setIsVisible(true);

            // Hide after 3 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);
        };

        window.addEventListener('show-notification', handleShowNotification);

        return () => {
            window.removeEventListener('show-notification', handleShowNotification);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="notification-toast">
            {message}
        </div>
    );
};

export default Notification;

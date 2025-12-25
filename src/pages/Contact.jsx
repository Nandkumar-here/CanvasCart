import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Create content string with timestamp
        const timestamp = new Date().toLocaleString();
        const fileContent = `Contact Message
Date: ${timestamp}
-------------------------
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
`;

        // 2. Create a Blob (File-like object) from the string
        const blob = new Blob([fileContent], { type: 'text/plain' });

        // 3. Create a temporary download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `contact-message-${Date.now()}.txt`; // Unique filename

        // 4. Trigger the download
        document.body.appendChild(link);
        link.click();

        // 5. Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // 6. Show success message
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });

        // Reset success message after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="contact-container">
            <h2 className="page-title">Contact Us</h2>

            {submitted && (
                <div className="success-message">
                    Message saved and downloaded! We'll get back to you shortly.
                </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-input"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        className="form-textarea"
                        required
                        placeholder="How can we help?"
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button type="submit" className="btn">
                    Send & Download
                </button>
            </form>
        </div>
    );
};

export default Contact;

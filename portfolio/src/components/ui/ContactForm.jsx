import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../../styles/contact.css';

const ContactForm = () => {
  const form = useRef();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace these with your actual EmailJS service ID, template ID, and Public Key
      const result = await emailjs.sendForm(
        'service_5x3pk36',
        'template_orvobot',
        form.current,
        'GfHgnOYTDvGw4Imig'
      );
      
      setStatus({
        submitted: true,
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      
      // Clear the form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus({
        submitted: true,
        success: false,
        message: 'Failed to send message. Please try again or contact me directly.'
      });
    } finally {
      setIsSubmitting(false);
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }
  };

  return (
    <form className="contact-form" ref={form} onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        className="form-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
      
      {status.submitted && (
        <div className={`form-status ${status.success ? 'success' : 'error'}`}>
          {status.message}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
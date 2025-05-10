import React from 'react';
import ContactForm from '../components/ui/ContactForm';
import '../styles/globals.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Contact Me</h1>
      <p>Send a message to connect and explore the universe together!</p>
      <ContactForm />
    </div>
  );
};

export default Contact;
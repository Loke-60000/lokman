import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setErrors({
        name: !name && 'Name is required',
        email: !email && 'Email is required',
        message: !message && 'Message is required',
      });
      return;

    }

    setIsSending(true);

    const templateParams = {
      from_name: name,
      from_email: email,
      phone,
      subject: subject || 'New message from your website',
      message,
    };

    emailjs
      .send(
        window.REACT_APP_EMAILJS_SERVICE_ID,
        window.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        window.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setIsSending(false);
          setIsSent(true);
          setName('');
          setEmail('');
          setPhone('');
          setSubject('');
          setMessage('');
          setErrors({});
        },
        (error) => {
          console.log(error.text);
          setIsSending(false);
          setSendError('There was an error sending your email. Please try again later.');
        }
      );
  };


  return (
    <div className="container">
      <h1><span className='ColoredLetter'>C</span>ontact Me</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone (optional)</label>
          <input
            type="tel"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject (optional)</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
            id="message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          {errors.message && (
            <div className="invalid-feedback">{errors.message}</div>
          )}
        </div>
        {isSending && (
          <div className="alert alert-info" role="alert">
            Sending your message...
          </div>
        )}
        {isSent && (
          <div className="alert alert-success" role="alert">
            Your message has been sent. Thank you!
          </div>
        )}
        {sendError && (
          <div className="alert alert-danger" role="alert">
            {sendError}
          </div>
        )}
        <div className="contactButtonContainer">
          <button type="submit" className="contactButton" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
  
};

export default ContactPage;
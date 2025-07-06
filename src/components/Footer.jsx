import Logo from '../assets/Logo.svg';
import { FaFacebook, FaInstagram, FaYelp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer-grid">
        <section className="footer-column" aria-labelledby="about-heading">
          <h3 id="about-heading" className="visually-hidden">About Little Lemon</h3>
          <img 
            src={Logo} 
            alt="Little Lemon Restaurant Logo" 
            className="footer-logo" 
          />
          <p className="footer-description">
            Little Lemon brings authentic Mediterranean flavors to Chicago with fresh ingredients and traditional recipes passed down through generations.
          </p>
        </section>

        <section className="footer-column" aria-labelledby="nav-heading">
          <h3 id="nav-heading" className="footer-heading">Navigation</h3>
          <nav className="footer-nav" aria-label="Main navigation">
            <a href="/" aria-label="Home page">Home</a>
            <a href="/about" aria-label="About us page">About</a>
            <a href="/menu" aria-label="View our menu">Menu</a>
            <a href="/booking" aria-label="Book a table">Reservations</a>
            <a href="/order" aria-label="Order online">Order Online</a>
            <a href="/login" aria-label="Login to your account">Login</a>
          </nav>
        </section>

        <section className="footer-column" aria-labelledby="contact-heading">
          <h3 id="contact-heading" className="footer-heading">Contact</h3>
          <address className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" aria-hidden="true" />
              <span>123 Lemon Street<br />Chicago, IL 60601</span>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" aria-hidden="true" />
              <a href="tel:+15551234567" aria-label="Call us at 555-123-4567">
                (555) 123-4567
              </a>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" aria-hidden="true" />
              <a href="mailto:info@littlelemon.com" aria-label="Email us at info@littlelemon.com">
                info@littlelemon.com
              </a>
            </div>
          </address>
        </section>

        <section className="footer-column" aria-labelledby="social-heading">
          <h3 id="social-heading" className="footer-heading">Follow Us</h3>
          <div className="social-media" aria-label="Social media links">
            <a 
              href="https://facebook.com" 
              aria-label="Visit our Facebook page (opens in new tab)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook aria-hidden="true" /> Facebook
            </a>
            <a 
              href="https://instagram.com" 
              aria-label="Visit our Instagram page (opens in new tab)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram aria-hidden="true" /> Instagram
            </a>
            <a 
              href="https://yelp.com" 
              aria-label="Visit our Yelp page (opens in new tab)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYelp aria-hidden="true" /> Yelp
            </a>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} Little Lemon<br />
            All rights reserved
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
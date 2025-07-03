import Logo from '../assets/Logo.svg';
import { FaFacebook, FaInstagram, FaYelp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-column">
          <img src={Logo} alt="Little Lemon Restaurant" className="footer-logo" />
          <p className="footer-description">
            Little Lemon brings authentic Mediterranean flavors to Chicago with fresh ingredients and traditional recipes passed down through generations.
          </p>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Navigation</h3>
          <nav className="footer-nav">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/menu">Menu</a>
            <a href="/reservations">Reservations</a>
            <a href="/order">Order Online</a>
            <a href="/login">Login</a>
          </nav>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Contact</h3>
          <div className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>123 Lemon Street<br />Chicago, IL 60601</span>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <a href="tel:+15551234567">(555) 123-4567</a>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <a href="mailto:info@littlelemon.com">info@littlelemon.com</a>
            </div>
          </div>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="social-media">
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebook /> Facebook
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram /> Instagram
            </a>
            <a href="https://yelp.com" aria-label="Yelp">
              <FaYelp /> Yelp
            </a>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} Little Lemon<br />
            All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
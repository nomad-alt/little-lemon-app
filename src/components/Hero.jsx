import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-image.jpg';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p className="hero-description">
          We are family owned restaurant, 
          focused on a traditional recipes served with a modern twist.
        </p>
        <Link to="/booking" className="button primary">
          Reserve a Table
        </Link>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Little Lemon restaurant" />
      </div>
    </section>
  );
}

export default Hero;
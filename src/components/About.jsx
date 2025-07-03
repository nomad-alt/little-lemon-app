import AdrianPhoto from '../assets/adrian.jpg';
import MarioPhoto from '../assets/mario.jpg';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-text">
          <h2>Little Lemon</h2>
          <h3>Chicago</h3>
          <p>
            Founded in 2015 by brothers Adrian and Mario, Little Lemon brings authentic 
            Mediterranean flavors to the heart of Chicago. Our recipes are passed down 
            through generations, using only the freshest ingredients to create dishes 
            that honor our family's culinary heritage.
          </p>
          <p>
            What started as a small neighborhood eatery has grown into one of Chicago's 
            most beloved Mediterranean restaurants, thanks to our commitment to quality 
            and warm hospitality.
          </p>
        </div>

        <div className="about-images">
          <div className="image-container">
            <img src={AdrianPhoto} alt="Adrian - Co-founder" className="founder-image" />
            <p className="founder-name">Adrian</p>
            <p className="founder-title">Master Chef</p>
          </div>
          <div className="image-container">
            <img src={MarioPhoto} alt="Mario - Co-founder" className="founder-image" />
            <p className="founder-name">Mario</p>
            <p className="founder-title">Restaurant Manager</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
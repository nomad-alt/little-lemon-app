import GreekSalad from "../assets/greek-salad.jpg";
import Bruschetta from '../assets/lemon-dessert.jpg';
import LemonDessert from '../assets/bruschetta.jpg';

const specialsData = [
  {
    id: 1,
    title: "Greek Salad",
    price: "$12.99",
    description: "The famous Greek salad of crispy lettuce, peppers, olives, and our Chicago-style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    image: GreekSalad,
    orderable: true
  },
  {
    id: 2,
    title: "Bruschetta",
    price: "$7.99",
    description: "Our bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil, topped with fresh tomatoes.",
    image: LemonDessert,
    orderable: true
  },
  {
    id: 3,
    title: "Lemon Dessert",
    price: "$6.99",
    description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    image: Bruschetta,
    orderable: true
  }
];

const Specials = () => {

  return (
    <section className="specials-section">
      <div className="specials-header">
        <h2>This Week's Specials</h2>
        <button className="online-menu-button">Online Menu</button>
      </div>
      <div className="specials-grid">
        {specialsData.map((item) => (
          <div key={item.id} className="special-card">
            <div className="card-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="card-content">
              <div className="card-header">
                <h3>{item.title}</h3>
                <span className="price">{item.price}</span>
              </div>
              <p className="description">{item.description}</p>
              {item.orderable && (
                <button className="order-button">
                  Order for Delivery
                  <span className="delivery-icon">🛵</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Specials;
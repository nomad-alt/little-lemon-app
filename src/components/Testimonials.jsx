import User1 from '../assets/user1.jpg';
import User2 from '../assets/user2.jpg';
import User3 from '../assets/user3.jpg';

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    review: "The Greek salad was absolutely amazing! Fresh ingredients and perfect seasoning. Will definitely come back!",
    photo: User1,
    date: "2023-05-15"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    review: "Great atmosphere and friendly staff. The lemon dessert was the perfect ending to our meal.",
    photo: User2,
    date: "2023-06-22"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    review: "Best Mediterranean food in Chicago! The bruschetta is to die for. Highly recommend!",
    photo: User3,
    date: "2023-07-10"
  },
];

const StarRating = (rating) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "star filled" : "star"}>
          ★
        </span>
      ))}
    </div>
  );
}

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-grid">
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-header">
              <div className="user-profile">
                <img src={testimonial.photo} alt={testimonial.name} className="user-photo" />
                <div className="user-info">
                  <h3>{testimonial.name}</h3>
                  <span className="review-date">{testimonial.date}</span>
                </div>
              </div>
              <StarRating rating={testimonial.rating} />
            </div>
            <p className="testimonial-review">{testimonial.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
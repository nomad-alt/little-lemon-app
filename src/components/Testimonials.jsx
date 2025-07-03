const Testimonials = () => {

  const testimonials = [
    { name: "Mattias", review: "5 stars" },
    { name: "Name 2", review: "5 stars" },
    { name: "Name 3", review: "4 stars" },
    { name: "Name 4", review: "3 stars" }
  ];

  return (
    <section className="testimonials">
      <h2>Testimonials</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <h3>{testimonial.name}</h3>
            <p>{testimonial.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
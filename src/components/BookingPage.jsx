import BookingForm from '../forms/BookingForm';

const BookingPage = () => {
  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
    // In a real app, you would send this data to an API
    alert(`Reservation confirmed for ${formData.date} at ${formData.time} for ${formData.guests} guests!`);
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>Make a Reservation</h1>
        <p>Experience the taste of the Mediterranean</p>
      </div>

      <div className="booking-content">
        <BookingForm onSubmit={handleSubmit} />

        <div className="booking-info">
          <h3>Reservation Details</h3>
          <ul>
            <li>Hours: 5:00 PM - 10:00 PM daily</li>
            <li>Maximum party size: 10 guests</li>
            <li>Special occasions: Please let us know in advance</li>
            <li>Cancellation policy: 24 hours notice required</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
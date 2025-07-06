import { useState } from 'react';
import BookingForm from '../forms/BookingForm';
import ErrorBoundary from './ErrorBoundary';

const BookingPage = () => {
  const [bookingData, setBookingData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (formData) => {
    setBookingData(formData);
    setIsSubmitted(true);
  };

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <h1>Table Reservation</h1>
        <p>Book your table at Little Lemon</p>
      </div>

      <div className="booking-container">
        {isSubmitted ? (
          <div className="confirmation">
            <h2>Reservation Confirmed!</h2>
            <div className="confirmation-details">
              <p><strong>Date:</strong> {bookingData.date}</p>
              <p><strong>Time:</strong> {bookingData.time}</p>
              <p><strong>Guests:</strong> {bookingData.guests}</p>
              <p><strong>Occasion:</strong> {bookingData.occasion || 'None'}</p>
            </div>
            <button
              className="new-reservation-btn"
              onClick={() => setIsSubmitted(false)}
            >
              Make Another Reservation
            </button>
          </div>
        ) : (
          <ErrorBoundary>
            <BookingForm onSubmit={handleSubmit} />
          </ErrorBoundary>
        )}

        <div className="booking-info">
          <h3>Reservation Information</h3>
          <ul>
            <li>Hours: 5:00 PM - 10:00 PM daily</li>
            <li>Maximum party size: 10 guests</li>
            <li>Special occasions: Please let us know in advance</li>
            <li>Cancellation policy: 24 hours notice required</li>
          </ul>
          <div className="contact-info">
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Email:</strong> reservations@littlelemon.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
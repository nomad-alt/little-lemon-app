import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../forms/BookingForm';
import ErrorBoundary from './ErrorBoundary';

const BookingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Submit to API (with fallback for development)
      const isSuccess = window.submitAPI?.(formData) ?? true;

      if (isSuccess) {
        // Navigate to confirmation page with booking data
        navigate('/confirmed', { state: { booking: formData } });
      } else {
        setError('Failed to submit booking. Please try again.');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <h1>Table Reservation</h1>
        <p>Book your table at Little Lemon</p>
      </div>

      <div className="booking-container">
        <ErrorBoundary>
          <BookingForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
        </ErrorBoundary>

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
};

export default BookingPage;
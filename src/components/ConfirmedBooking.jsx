import { useLocation } from 'react-router-dom';

const ConfirmedBooking = () => {
  const location = useLocation();
  const bookingData = location.state?.booking;

  return (
    <div className="confirmed-booking">
      <h1>Reservation Confirmed!</h1>
      <div className="confirmation-details">
        <h2>Your Reservation Details</h2>
        {bookingData && (
          <>
            <p><strong>Date:</strong> {bookingData.date}</p>
            <p><strong>Time:</strong> {bookingData.time}</p>
            <p><strong>Guests:</strong> {bookingData.guests}</p>
            {bookingData.occasion !== 'None' && (
              <p><strong>Occasion:</strong> {bookingData.occasion}</p>
            )}
          </>
        )}
      </div>
      <p className="confirmation-message">
        Thank you for choosing Little Lemon! We look forward to serving you.
      </p>
    </div>
  );
};

export default ConfirmedBooking;
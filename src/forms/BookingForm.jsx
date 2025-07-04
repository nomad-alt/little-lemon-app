import { useState } from 'react';

const BookingForm = ( onSubmit ) => {
    // State for form fields
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: 'None'
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Available times for reservation
  const [availableTimes] = useState([
    '17:00', '18:00', '19:00', '20:00', '21:00'
  ]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    if (formData.guests < 1 || formData.guests > 10) {
      newErrors.guests = 'Number of guests must be between 1 and 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      // Reset form after submission
      setFormData({
        date: '',
        time: '',
        guests: 1,
        occasion: 'None'
      });
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

    return (
        <div className="booking-form-container">
          <h2>Reserve Your Table</h2>
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="date">Choose date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && <p className="error-message">{errors.date}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="time">Choose time</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={errors.time ? 'error' : ''}
              >
                <option value="">Select a time</option>
                {availableTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.time && <p className="error-message">{errors.time}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="guests">Number of guests</label>
              <input
                type="number"
                id="guests"
                name="guests"
                min="1"
                max="10"
                value={formData.guests}
                onChange={handleChange}
                className={errors.guests ? 'error' : ''}
              />
              {errors.guests && <p className="error-message">{errors.guests}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="occasion">Occasion</label>
              <select
                id="occasion"
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
              >
                <option value="None">None</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">
              Reserve Table
            </button>
          </form>
        </div>
      );
    }

    export default BookingForm;
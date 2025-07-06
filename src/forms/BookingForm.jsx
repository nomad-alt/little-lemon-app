import { useState, useReducer, useEffect } from 'react';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development' && !window.fetchAPI) {
  console.log('Using mock API for development');
  window.fetchAPI = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6
      ? ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
      : ['17:00', '18:00', '19:00', '20:00', '21:00'];
  };
  window.submitAPI = () => true;
}

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

  // Initialize times reducer function
  const initializeTimes = () => {
    const today = new Date();
    return window.fetchAPI(today) || ['17:00', '18:00', '19:00', '20:00', '21:00'];
  };

  // Update times reducer function
  const updateTimes = (state, action) => {
    switch (action.type) {
      case 'SET_DATE':
        try {
          // Fetch available times for the selected date
          return window.fetchAPI(new Date(action.date));
        } catch (error) {
          console.error('Error fetching available times:', error);
          return state;
        }
      default:
        return state;
    }
  };

  // State for available times using reducer
  const [availableTimes, dispatch] = useReducer(updateTimes, [], () => initializeTimes());

  // Initialize times on component mount
  useEffect(() => {
    if (window.fetchAPI) {
      const today = new Date();
      dispatch({ type: 'SET_DATE', date: today.toISOString().split('T')[0] });
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Dispatch action when date changes
    if (name === 'date') {
      dispatch({ type: 'SET_DATE', date: value });

      // Clear the time selection when date changes
      setFormData(prev => ({
        ...prev,
        time: ''
      }));
    }

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
      try {
        // Submit the form data to the API
        const isSubmitted = window.submitAPI(formData);

        if (isSubmitted) {
          // Call the onSubmit prop passed from parent
          if (typeof onSubmit === 'function') {
            onSubmit(formData);
          }

          // Reset form after submission
          setFormData({
            date: '',
            time: '',
            guests: 1,
            occasion: 'None'
          });
        } else {
          alert('Failed to submit reservation. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting reservation:', error);
        alert('An error occurred while submitting your reservation.');
      }
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
            data-testid="date-input"
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
            data-testid="time-select"
            disabled={!formData.date}
          >
            <option value="">Select a time</option>
            {availableTimes.map(time => (
              <option key={time} value={time} data-testid="time-option">
                {time}
              </option>
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
            data-testid="guests-input"
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
            data-testid="occasion-select"
          >
            <option value="None">None</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
        </div>

        <button
          type="submit"
          className="submit-btn"
          data-testid="submit-btn"
          disabled={!formData.date || !formData.time}
        >
          Reserve Table
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
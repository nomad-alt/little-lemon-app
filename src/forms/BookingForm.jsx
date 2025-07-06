import { useState, useReducer, useEffect } from 'react';

// Development mock API
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

const BookingForm = ({ onSubmit, isLoading = false }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: 'None'
  });

  // State for validation errors
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  // Initialize times reducer function
  const initializeTimes = () => {
    try {
      const today = new Date();
      if (typeof window.fetchAPI === 'function') {
        const times = window.fetchAPI(today);
        return Array.isArray(times) ? times : ['17:00', '18:00', '19:00', '20:00', '21:00'];
      }
      return ['17:00', '18:00', '19:00', '20:00', '21:00'];
    } catch (error) {
      console.error('Error initializing times:', error);
      return ['17:00', '18:00', '19:00', '20:00', '21:00'];
    }
  };

  // Update times reducer function
  const updateTimes = (state, action) => {
    switch (action.type) {
      case 'SET_DATE':
        try {
          if (typeof window.fetchAPI === 'function') {
            const times = window.fetchAPI(new Date(action.date));
            return Array.isArray(times) ? times : state;
          }
          return state;
        } catch (error) {
          console.error('Error fetching available times:', error);
          return state;
        }
      default:
        return state;
    }
  };

  // State for available times using reducer
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  // Initialize times on component mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: today }));
    dispatch({ type: 'SET_DATE', date: today });
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
      setFormData(prev => ({ ...prev, time: '' }));
    }

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError(null);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    if (formData.guests < 1 || formData.guests > 10) {
      newErrors.guests = 'Number of guests must be between 1 and 10';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) return;

    try {
      // Submit the form data to the API
      const isSubmitted = typeof window.submitAPI === 'function'
        ? window.submitAPI(formData)
        : true; // Fallback for testing

      if (isSubmitted) {
        // Call the onSubmit prop passed from parent
        if (typeof onSubmit === 'function') {
          await onSubmit(formData);
        }
        // Reset form after successful submission
        const today = new Date().toISOString().split('T')[0];
        setFormData({
          date: today,
          time: '',
          guests: 1,
          occasion: 'None'
        });
        dispatch({ type: 'SET_DATE', date: today });
      } else {
        setApiError('Failed to submit reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      setApiError('An error occurred while submitting your reservation.');
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-form-container">
      <h2>Reserve Your Table</h2>
      {apiError && <div className="error-message api-error">{apiError}</div>}
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
            required
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
            required
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
            required
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
          disabled={isLoading || !formData.date || !formData.time}
        >
          {isLoading ? 'Submitting...' : 'Reserve Table'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
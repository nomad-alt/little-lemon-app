// Initialize available times
export const initializeTimes = () => {
  return ['17:00', '18:00', '19:00', '20:00', '21:00'];
};

// Update times based on selected date
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'SET_DATE':
      // For now, return the same available times regardless of date
      // This would be replaced with actual date-based logic later
      return state;

    case 'SET_TIMES':
      // Return new times when explicitly set
      return action.times;

    default:
      return state;
  }
};
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '../forms/BookingForm';

describe('BookingForm', () => {
  const mockSubmit = vi.fn();
  const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00'];

  beforeEach(() => {
    render(<BookingForm onSubmit={mockSubmit} availableTimes={mockAvailableTimes} />);
  });

  test('renders "Reserve Your Table" heading', () => {
    const heading = screen.getByRole('heading', { name: /reserve your table/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders all form fields', () => {
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reserve table/i })).toBeInTheDocument();
  });

  test('date input has min attribute set to today', () => {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = screen.getByLabelText(/choose date/i);
    expect(dateInput).toHaveAttribute('min', today);
  });

  test('time select has available times populated', () => {
    mockAvailableTimes.forEach(time => {
      expect(screen.getByRole('option', { name: time })).toBeInTheDocument();
    });
  });

  test('guests input has min=1 and max=10', () => {
    const guestsInput = screen.getByLabelText(/number of guests/i);
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
  });

  test('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    const submitButton = screen.getByRole('button', { name: /reserve table/i });

    await user.click(submitButton);

    expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
    expect(screen.getByText(/please select a time/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter number of guests/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test('validates guests input range', async () => {
    const user = userEvent.setup();
    const guestsInput = screen.getByLabelText(/number of guests/i);

    await user.clear(guestsInput);
    await user.type(guestsInput, '0');
    await user.click(screen.getByRole('button', { name: /reserve table/i }));
    expect(screen.getByText(/minimum 1 guest/i)).toBeInTheDocument();

    await user.clear(guestsInput);
    await user.type(guestsInput, '11');
    expect(screen.getByText(/maximum 10 guests/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    const testData = {
      date: '2025-07-25',
      time: '19:00',
      guests: '4',
      occasion: 'Birthday'
    };

    // Fill in the form
    await user.type(screen.getByLabelText(/choose date/i), testData.date);
    await user.selectOptions(screen.getByLabelText(/choose time/i), testData.time);
    await user.clear(screen.getByLabelText(/number of guests/i));
    await user.type(screen.getByLabelText(/number of guests/i), testData.guests);
    await user.selectOptions(screen.getByLabelText(/occasion/i), testData.occasion);

    // Submit the form
    await user.click(screen.getByRole('button', { name: /reserve table/i }));

    // Verify submission
    expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
      date: testData.date,
      time: testData.time,
      guests: testData.guests,
      occasion: testData.occasion
    }));
  });

  test('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    const testData = {
      date: '2025-07-25',
      time: '19:00',
      guests: '4',
      occasion: 'Birthday'
    };

    // Mock a slow submission
    mockSubmit.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));

    // Fill in the form
    await user.type(screen.getByLabelText(/choose date/i), testData.date);
    await user.selectOptions(screen.getByLabelText(/choose time/i), testData.time);
    await user.type(screen.getByLabelText(/number of guests/i), testData.guests);
    await user.selectOptions(screen.getByLabelText(/occasion/i), testData.occasion);

    const submitButton = screen.getByRole('button', { name: /reserve table/i });
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
  });
});
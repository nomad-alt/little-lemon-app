/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '../forms/BookingForm';

describe('BookingForm', () => {
  const mockSubmit = vi.fn();

  beforeEach(() => {
    render(<BookingForm onSubmit={mockSubmit} />);
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
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();

    // Fill in the form
    await user.type(screen.getByLabelText(/choose date/i), '2025-07-25');
    await user.selectOptions(screen.getByLabelText(/choose time/i), '19:00');
    await user.clear(screen.getByLabelText(/number of guests/i));
    await user.type(screen.getByLabelText(/number of guests/i), '4');
    await user.selectOptions(screen.getByLabelText(/occasion/i), 'Birthday');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /reserve table/i }));
  });
});
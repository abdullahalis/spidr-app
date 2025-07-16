import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('renders form heading', () => {
  render(<App />);
  expect(screen.getByText(/Reserve Your Air Fryer/i)).toBeInTheDocument();
});

test('renders all input fields', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/First name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Last name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Phone number/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Guess the air fryer cost/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Secret PIN/i)).toBeInTheDocument();
});



test('shows error messages on empty submit', async () => {
  render(<App />);
  const submitButton = screen.getByText(/submit/i);
  await userEvent.click(submitButton);

  expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/Enter a valid phone number/i)).toBeInTheDocument();
});

test('allows typing in first name', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/First name/i);
  await userEvent.type(input, 'John');
  expect(input).toHaveValue('John');
});

test('shows success message after valid form submission', async () => {
  render(<App />);
  // fill out all fields with valid values
  fireEvent.change(screen.getByPlaceholderText(/First name/i), {
    target: { value: 'Abdullah' },
  });

  fireEvent.change(screen.getByPlaceholderText(/Last name/i), {
    target: { value: 'Ali' },
  });

  fireEvent.change(screen.getByPlaceholderText(/Phone number/i), {
    target: { value: '(123)-456-7890' },
  });

  fireEvent.change(screen.getByPlaceholderText(/Email address/i), {
    target: { value: 'test@example.com' },
  });

  fireEvent.change(screen.getByPlaceholderText(/Guess the air fryer cost/i), {
    target: { value: '50' },
  });

  const pinInput = screen.getByPlaceholderText(/Secret PIN/i);
  for (let i = 0; i < 16; i++) {
    fireEvent.keyDown(pinInput, { key: '1', code: 'Digit1' });
  }

  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  // ✅ wait for the success message to appear
  const successMessage = await screen.findByText(/Form submitted/i);
  expect(successMessage).toBeInTheDocument();
});


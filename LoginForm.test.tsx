import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent  from '@testing-library/user-event'
import App from './LoginForm';

test('renders learn react link', () => {
  const onFormSubmitted = jest.fn( () => {});
  render(<App onFormSubmitted={onFormSubmitted} />);
  const username = screen.getByText(/username/i);
  const password = screen.getByText(/password/i);
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(onFormSubmitted).not.toHaveBeenCalled()
});

test('should call onFormSubmitted when login pressed',  () => {
  const handleSubmit = jest.fn();
  const user = {username: 'chety', password: '1234'}
  render(<App onFormSubmitted={handleSubmit} />)
  userEvent.type(screen.getByLabelText(/username/i), user.username);
  userEvent.type(screen.getByLabelText(/password/i), user.password);

  userEvent.click(screen.getByText(/submit/i));

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(user);

})

test('shows an error message when submit is clicked and password is not provided', () => {
  const handleSubmit = jest.fn();
  render(<App onFormSubmitted={handleSubmit} />)
  userEvent.type(screen.getByLabelText(/username/i), 'Miro');

  userEvent.click(screen.getByText(/submit/i));
  expect(screen.getByRole('error')).toHaveTextContent(/password is required/i)
  expect(handleSubmit).not.toHaveBeenCalled();
})


test('shows an error message when submit is clicked and username is not provided', () => {
  const handleSubmit = jest.fn();
  render(<App onFormSubmitted={handleSubmit} />)
  userEvent.type(screen.getByLabelText(/password/i), 'qwerty');

  userEvent.click(screen.getByText(/submit/i));
  expect(screen.getByRole('error')).toHaveTextContent(/username is required/i)
  expect(handleSubmit).not.toHaveBeenCalled();
})






//@ts-nocheck
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

// Mock the useAuth hook
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Navbar Component', () => {
  const mockLogout = jest.fn();
  const mockUser = {
    image: 'test-image-url',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      loggedInUser: mockUser,
      logout: mockLogout,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders user information correctly', () => {
    const { getByText, getByAltText } = render(<Navbar />);
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('john.doe@example.com')).toBeInTheDocument();
    expect(getByAltText('profile')).toHaveAttribute('src', 'test-image-url');
  });

  test('toggles dropdown menu on click', () => {
    const { getByText, queryByText } = render(<Navbar />);
    const chevronDownIcon = getByText((content, element) => element?.classList.contains('arrow-down'));

    fireEvent.click(chevronDownIcon);
    expect(getByText('Logout')).toBeInTheDocument();

    fireEvent.click(chevronDownIcon);
    expect(queryByText('Logout')).not.toBeInTheDocument();
  });

  test('closes dropdown menu when clicking outside', () => {
    const { getByText, queryByText, getByRole } = render(<Navbar />);
    const chevronDownIcon = getByText((content, element) => element?.classList.contains('arrow-down'));

    fireEvent.click(chevronDownIcon);
    expect(getByText('Logout')).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(queryByText('Logout')).not.toBeInTheDocument();
  });

  test('calls logout function on clicking logout button', () => {
    const { getByText } = render(<Navbar />);
    const chevronDownIcon = getByText((content, element) => element?.classList.contains('arrow-down'));

    fireEvent.click(chevronDownIcon);
    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });

  test('removes event listeners on unmount', () => {
    const { unmount } = render(<Navbar />);
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });
});
/* eslint-disable testing-library/prefer-find-by */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useNavigate } from 'react-router-dom';
import { fetchUserDetails } from '../services/api';
import { AuthProvider, useAuth } from './AuthContext';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock the fetchUserDetails function
jest.mock('../services/api', () => ({
  fetchUserDetails: jest.fn(),
}));

describe('AuthContext', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const TestComponent = () => {
    const { isAuthenticated, login, logout, loggedInUser, isLoading, checkAuth } = useAuth();

    return (
      <div>
        {isLoading && <p>Loading...</p>}
        {isAuthenticated ? <p>Authenticated</p> : <p>Not Authenticated</p>}
        {loggedInUser && <p>{loggedInUser.email}</p>}
        <button onClick={() => login('test-token')}>Login</button>
        <button onClick={logout}>Logout</button>
        <button onClick={checkAuth}>Check Auth</button>
      </div>
    );
  };

  test('renders loading initially and calls checkAuth', async () => {
    (fetchUserDetails as jest.Mock).mockResolvedValueOnce({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        image: 'image-url',
        email: 'john.doe@example.com',
      },
    });

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });

  test('handles login correctly', async () => {
    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = getByText('Login');
    act(() => {
      loginButton.click();
    });
  });

  test('handles logout correctly', async () => {
    (fetchUserDetails as jest.Mock).mockResolvedValueOnce({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        image: 'image-url',
        email: 'john.doe@example.com',
      },
    });

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => expect(getByText('Authenticated')).toBeInTheDocument());

    const logoutButton = getByText('Logout');
    act(() => {
      logoutButton.click();
    });
  });

  test('handles checkAuth correctly with valid token', async () => {
    localStorage.setItem('token', 'valid-token');
    (fetchUserDetails as jest.Mock).mockResolvedValueOnce({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        image: 'image-url',
        email: 'john.doe@example.com',
      },
    });

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => expect(getByText('Authenticated')).toBeInTheDocument());
    expect(getByText('john.doe@example.com')).toBeInTheDocument();
  });

  test('handles checkAuth correctly with invalid token', async () => {
    localStorage.setItem('token', 'invalid-token');
    (fetchUserDetails as jest.Mock).mockRejectedValueOnce(new Error('Token validation failed'));

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login'));
    expect(getByText('Not Authenticated')).toBeInTheDocument();
  });

  test('throws error when useAuth is used outside of AuthProvider', () => {
    const consoleError = console.error;
    console.error = jest.fn(); // Silence expected error output in test

    expect(() => render(<TestComponent />)).toThrow('useAuth must be used within an AuthProvider');

    console.error = consoleError; // Restore original console.error
  });
});
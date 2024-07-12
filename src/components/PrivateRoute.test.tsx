/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';

// Mock the useAuth hook
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock the Navigate component
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: jest.fn(() => null),
  Outlet: jest.fn(() => <div>Outlet Component</div>),
}));

describe('PrivateRoute Component', () => {
  const mockUseAuth = useAuth as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      checkAuth: jest.fn(),
    });

    const { getByText } = render(<PrivateRoute />);

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  test('navigates to login when not authenticated', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      checkAuth: jest.fn(),
    });

    render(<PrivateRoute />);

    await waitFor(() => {
      expect(Navigate).toHaveBeenCalledWith({ to: '/login' }, {});
    });
  });

  test('calls checkAuth on mount', () => {
    const mockCheckAuth = jest.fn();
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      checkAuth: mockCheckAuth,
    });

    render(<PrivateRoute />);

    expect(mockCheckAuth).toHaveBeenCalled();
  });
});
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('DashboardPage Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the dashboard page correctly', () => {
    const { getByText } = render(
      <Router>
        <DashboardPage />
      </Router>
    );

    expect(getByText('Go to Users')).toBeInTheDocument();
  });

  test('calls navigate when the button is clicked', () => {
    const { getByText } = render(
      <Router>
        <DashboardPage />
      </Router>
    );

    const button = getByText('Go to Users');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/users');
  });

  test('button has correct styles', () => {
    const { getByText } = render(
      <Router>
        <DashboardPage />
      </Router>
    );

    const button = getByText('Go to Users');
    expect(button).toHaveClass('text-xl font-bold cursor-pointer p-4 rounded hover:bg-[#8baff2]');
  });
});
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-container */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import UserTable from './UserTable';
import { User } from '../types/type';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('UserTable Component', () => {
  const mockNavigate = jest.fn();
  const users: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      age: 30,
      ssn: '123-45-6789',
      department: 'Engineering',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      age: 25,
      ssn: '987-65-4321',
      department: 'Marketing',
      image: 'https://via.placeholder.com/150',
    },
  ];

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders table headers correctly', () => {
    const { getByText } = render(
      <Router>
        <UserTable users={users} />
      </Router>
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Phone')).toBeInTheDocument();
    expect(getByText('Age')).toBeInTheDocument();
    expect(getByText('SSN')).toBeInTheDocument();
    expect(getByText('Department')).toBeInTheDocument();
  });

  test('renders user data correctly', () => {
    const { getByText, getAllByRole } = render(
      <Router>
        <UserTable users={users} />
      </Router>
    );

    // Check if user data is rendered correctly
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('john.doe@example.com')).toBeInTheDocument();
    expect(getByText('123-456-7890')).toBeInTheDocument();
    expect(getByText('30')).toBeInTheDocument();
    expect(getByText('123-45-6789')).toBeInTheDocument();
    expect(getByText('Engineering')).toBeInTheDocument();

    expect(getByText('Jane Smith')).toBeInTheDocument();
    expect(getByText('jane.smith@example.com')).toBeInTheDocument();
    expect(getByText('987-654-3210')).toBeInTheDocument();
    expect(getByText('25')).toBeInTheDocument();
    expect(getByText('987-65-4321')).toBeInTheDocument();
    expect(getByText('Marketing')).toBeInTheDocument();

    // Check if all rows are rendered
    const rows = getAllByRole('row');
    expect(rows.length).toBe(3); // Including header row
  });

  test('navigates to user detail page on row click', () => {
    const { getByText } = render(
      <Router>
        <UserTable users={users} />
      </Router>
    );

    // Click on the first user's row
    fireEvent.click(getByText('John Doe'));

    // Check if navigate is called with correct path
    expect(mockNavigate).toHaveBeenCalledWith('/users/1');
  });

  test('renders without crashing when user list is empty', () => {
    const { container } = render(
      <Router>
        <UserTable users={[]} />
      </Router>
    );

    // Check if the table is rendered
    expect(container.querySelector('table')).toBeInTheDocument();
  });
});
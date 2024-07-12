/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
//@ts-nocheck
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';

describe('Sidebar Component', () => {

  test('renders the sidebar with dashboard and users links', () => {
    const { getByText, getByRole } = render(
      <Router>
        <Sidebar />
      </Router>
    );

    expect(getByText('Dashboard')).toBeInTheDocument();
    expect(getByText('Users')).toBeInTheDocument();
  });

  test('toggles the sidebar width when the toggle button is clicked', () => {
    const { getByRole, container } = render(
      <Router>
        <Sidebar />
      </Router>
    );

    const toggleButton = getByRole('button');
    const sidebar = container.firstChild;

    // Initially the sidebar should be open
    expect(sidebar).toHaveClass('w-64');

    // Click the toggle button to close the sidebar
    fireEvent.click(toggleButton);
    expect(sidebar).toHaveClass('w-20');

    // Click the toggle button to open the sidebar again
    fireEvent.click(toggleButton);
    expect(sidebar).toHaveClass('w-64');
  });

  test('does not render text when the sidebar is closed', () => {
    const { getByRole, queryByText } = render(
      <Router>
        <Sidebar />
      </Router>
    );

    const toggleButton = getByRole('button');

    // Click the toggle button to close the sidebar
    fireEvent.click(toggleButton);

    expect(queryByText('Dashboard')).not.toBeInTheDocument();
    expect(queryByText('Users')).not.toBeInTheDocument();
  });
});
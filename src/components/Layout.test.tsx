import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Outlet } from 'react-router-dom';
import Layout from './Layout';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Main from './MainContent';

// Mock the child components
jest.mock('./Sidebar', () => () => <div>Sidebar Component</div>);
jest.mock('./Navbar', () => () => <div>Navbar Component</div>);
jest.mock('./MainContent', () => ({ children }: { children: JSX.Element }) => <div>Main Content {children}</div>);

// Mock the Outlet component
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div>Outlet Component</div>,
}));

describe('Layout Component', () => {
  test('renders Sidebar, Navbar, Main, and Outlet components', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Check if Sidebar is rendered
    expect(screen.getByText('Sidebar Component')).toBeInTheDocument();

    // Check if Navbar is rendered
    expect(screen.getByText('Navbar Component')).toBeInTheDocument();

    // Check if Main and Outlet are rendered
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Outlet Component')).toBeInTheDocument();
  });
});
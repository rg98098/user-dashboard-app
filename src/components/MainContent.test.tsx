/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Main from './MainContent';

describe('Main Component', () => {
  test('renders children correctly', () => {
    const { getByText } = render(<Main><div>Test Child</div></Main>);
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  test('has correct styles', () => {
    const { container } = render(<Main><div>Test Child</div></Main>);
    const divElement = container.firstChild;
    expect(divElement).toHaveClass('flex-grow p-4 overflow-auto h-full');
    expect(divElement).toHaveStyle('background-color: #f0f0f0');
  });
});
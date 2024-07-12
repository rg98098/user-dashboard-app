/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();
  const mockOnItemsPerPageChange = jest.fn();

  const setup = (currentPage = 1, itemsPerPage = 10, totalItems = 100) => {
    return render(
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={mockOnPageChange}
        onItemsPerPageChange={mockOnItemsPerPageChange}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination component correctly', () => {
    const { getByText, getAllByRole } = setup();

    expect(getByText('Total 100 Items')).toBeInTheDocument();
    expect(getAllByRole('listitem').length).toBe(12); // 10 page numbers + 2 navigation buttons
    expect(getByText('<')).toBeInTheDocument();
    expect(getByText('>')).toBeInTheDocument();
  });

  test('calls onPageChange when a page number is clicked', () => {
    const { getByText } = setup();

    fireEvent.click(getByText('2'));

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('calls onPageChange when next and previous buttons are clicked', () => {
    const { getByText } = setup(2);

    fireEvent.click(getByText('<'));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(getByText('>'));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test('disables previous button on first page and next button on last page', () => {
    const { getByText, rerender } = setup(1);

    expect(getByText('<')).toHaveClass('bg-gray-300');
    expect(getByText('>')).not.toHaveClass('bg-gray-300');

    rerender(
      <Pagination
        currentPage={10}
        itemsPerPage={10}
        totalItems={100}
        onPageChange={mockOnPageChange}
        onItemsPerPageChange={mockOnItemsPerPageChange}
      />
    );

    expect(getByText('>')).toHaveClass('bg-gray-300');
    expect(getByText('<')).not.toHaveClass('bg-gray-300');
  });

  test('calls onItemsPerPageChange when items per page is changed', () => {
    const { getByDisplayValue } = setup();

    fireEvent.change(getByDisplayValue('10 / page'), { target: { value: '20' } });

    expect(mockOnItemsPerPageChange).toHaveBeenCalled();
  });

  test('renders correct number of page options based on total items', () => {
    const { getByText, rerender } = setup(1, 10, 35);

    expect(getByText('4')).toBeInTheDocument();

    rerender(
      <Pagination
        currentPage={1}
        itemsPerPage={10}
        totalItems={25}
        onPageChange={mockOnPageChange}
        onItemsPerPageChange={mockOnItemsPerPageChange}
      />
    );

    expect(getByText('3')).toBeInTheDocument();
  });
});
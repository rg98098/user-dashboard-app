import React from 'react';

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (pageNumber: number) => void;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map(number => (
      <li
        key={number}
        className={`page-item cursor-pointer ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} p-2 rounded`}
        onClick={() => onPageChange(number)}>
        {number}
      </li>
    ));
  };

  const getItemsPerPageOptions = () => {
    const options = [];
    for (let i = 10; i <= Math.min(10 * Math.ceil(totalItems / 10), 50); i += 10) {
      options.push(i);
    }
    return options;
  };

  return (
    <div className="flex items-center justify-end gap-2.5 mt-4">
      <span className="text-sm text-gray-700">Total {totalItems} Items</span>
      <ul className="flex items-center space-x-1">
        <li
          className={`page-item cursor-pointer p-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-white text-blue-500'}`}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}>
          {'<'}
        </li>
        {renderPageNumbers()}
        <li
          className={`page-item cursor-pointer p-2 rounded ${currentPage === Math.ceil(totalItems / itemsPerPage) ? 'bg-gray-300' : 'bg-white text-blue-500'}`}
          onClick={() => onPageChange(Math.min(currentPage + 1, Math.ceil(totalItems / itemsPerPage)))}>
          {'>'}
        </li>
      </ul>
      <select value={itemsPerPage} className="p-2 rounded border border-gray-300" onChange={onItemsPerPageChange}>
        {getItemsPerPageOptions().map(option => (
          <option key={option} value={option}>{option} / page</option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
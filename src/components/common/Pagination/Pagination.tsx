import React, { HTMLProps } from 'react';
import './Pagination.scss';
import classNames from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps extends HTMLProps<HTMLDivElement> {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  className,
  ...props
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 4) pages.push(1, '...');

      for (
        let i = Math.max(1, currentPage - 2);
        i <= Math.min(totalPages, currentPage + 2);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) pages.push('...', totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number | string) => {

    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  const paginationClass = classNames('pagination__component', className);

  return (
    <div className={paginationClass} {...props}>
      <button
        className={`pagination__component-item ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon width={16} height={16} />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`pagination__component-item ${currentPage === page ? 'active' : ''}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={`pagination__component-item ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon width={16} height={16} />
      </button>
    </div>
  );
};

export default Pagination;

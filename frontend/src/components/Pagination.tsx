import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  const pages = []
  const maxVisiblePages = 5
  
  let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1)
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(0, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  if (totalPages <= 1) return null

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      
      {startPage > 0 && (
        <>
          <button
            onClick={() => onPageChange(0)}
            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            1
          </button>
          {startPage > 1 && <span className="text-gray-500">...</span>}
        </>
      )}
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-sm border rounded-md ${
            currentPage === page
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page + 1}
        </button>
      ))}
      
      {endPage < totalPages - 1 && (
        <>
          {endPage < totalPages - 2 && <span className="text-gray-500">...</span>}
          <button
            onClick={() => onPageChange(totalPages - 1)}
            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </div>
  )
}
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="backdrop-blur-md bg-white/70 rounded-xl px-6 py-4 border border-sky-200/60 shadow-lg">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-lg bg-white/80 border border-sky-300/50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-sky-50 hover:border-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center rounded-lg bg-white/80 border border-sky-300/50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-sky-50 hover:border-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
        >
          Next
        </button>
      </div>
      
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-600">
            Page <span className="font-semibold text-gray-800">{currentPage}</span> of{' '}
            <span className="font-semibold text-gray-800">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex gap-1">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-lg px-3 py-2 bg-white/80 border border-sky-300/50 text-gray-600 hover:bg-sky-50 hover:border-sky-400 hover:text-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 shadow-sm ${
                  page === currentPage
                    ? 'bg-sky-500 text-white border border-sky-600 shadow-md hover:bg-sky-600'
                    : 'bg-white/80 text-gray-700 border border-sky-300/50 hover:bg-sky-50 hover:border-sky-400 hover:text-sky-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-lg px-3 py-2 bg-white/80 border border-sky-300/50 text-gray-600 hover:bg-sky-50 hover:border-sky-400 hover:text-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

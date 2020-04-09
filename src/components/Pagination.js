import React from "react";

const Pagination = ({ perPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / perPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                    <button
                        class="page-link"
                        aria-label="Previous"
                        onClick={() => paginate(--currentPage)}
                    >
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li
                        key={number}
                        className={
                            currentPage === number ? "page-item active" : "page-item"
                        }
                    >
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                <li
                    className={
                        currentPage === pageNumbers.length
                            ? "page-item disabled"
                            : "page-item"
                    }
                >
                    <button
                        class="page-link"
                        aria-label="Next"
                        onClick={() => paginate(++currentPage)}
                    >
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
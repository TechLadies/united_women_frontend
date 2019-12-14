import React from 'react';
import './PageNavigation.css';

const PageNavigation = ({ donorsPerPage, totalDonors, paginate, currentPage, decrement, increment }) => {

    const pageNumber = []
    for(let i = 1; i <= Math.ceil(totalDonors / donorsPerPage); i++) {
        pageNumber.push(i)
    }

    const totalPages = totalDonors / donorsPerPage;

    return (
        <nav>
            <ul className="pagination">
                <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                    <a onClick={() => decrement()} className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
                {pageNumber.map(number => (
                    <li key={number} className={currentPage === number ? "page-item active" : "page-item"}>
                        <a onClick={() => paginate(number)}
                            className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
                <li className={currentPage === totalPages ? "page-item disabled" : "page-item"}>
                    <a onClick={() => increment()} className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
};

export default PageNavigation;
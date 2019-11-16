import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
    return (
        <div className='sidebar bg-light'>
            <div className='sidebar-brand'>
                <p>United Women</p>
            </div>
            <nav className='sidebar-nav'>
                <ul className='nav'>
                    <li className='nav-item'>
                        <Link to='/' className='nav-link'>Donor Records</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/donation-records' className='nav-link'>Donation Records</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/upload-records' className='nav-link'>Upload Records</Link>
                    </li>
                </ul>
            </nav>
            <button type="button" className="btn btn-outline-secondary btn-logout">Logout</button>
        </div>

    );
}

export default NavBar
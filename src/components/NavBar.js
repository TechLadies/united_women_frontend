import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <div class='sidebar bg-light'>
            <div class='sidebar-brand'>
                <p>United Women</p>
            </div>
            <nav class='sidebar-nav'>
                <ul class='nav'>
                    <li class='nav-item'>
                        <Link to='/' className='nav-link'>Donor Records</Link>
                    </li>
                    <li class='nav-item'>
                        <Link to='/donation-records' className='nav-link'>Donation Records</Link>
                    </li>
                    <li class='nav-item'>
                        <Link to='/upload-records' className='nav-link'>Upload Records</Link>
                    </li>
                </ul>
            </nav>
            <button type="button" class="btn btn-outline-primary btn-logout">Logout</button>
        </div>

    );
}

export default NavBar
import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
    const checkActive = (match, location) => {
        const {pathname} = location;
        if (pathname === "/"
            || pathname === "/donor-record"
            || pathname === "/add-donor") {
            return true;
        }
    }
    return (
        <div className='sidebar bg-light'>
            <div className='sidebar-brand'>
                <p>United Women</p>
            </div>
            <nav className='sidebar-nav'>
                <ul>
                    <li className='nav-item'>
                        <NavLink to='/'
                                 className='nav-link'
                                 isActive={checkActive}
                                 activeClassName='active'>Donor Records</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/donation-records' className='nav-link' activeClassName='active'>Donation Records</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/upload-records' className='nav-link' activeClassName='active'>Upload Records</NavLink>
                    </li>
                </ul>
            </nav>
            <button type="button" className="btn btn-outline-primary btn-block btn-logout">Logout</button>
        </div>

    );
}

export default NavBar
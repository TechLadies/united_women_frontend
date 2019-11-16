import React from 'react'
import NavBar from '../components/NavBar'

function NavBarWrapper(Component) {
    return function() {
        return (
            <React.Fragment>
                <NavBar/>
                <Component/>
            </React.Fragment>
        )
    }
}

export default NavBarWrapper
import React from 'react'
import NavBar from '../components/NavBar'

function NavBarWrapper(Component) {
    return function({ unsetToken, ...props }) {
        return (
            <React.Fragment>
                <NavBar unsetToken={ unsetToken }/>
                <main>
                    <Component unsetToken={ unsetToken } { ...props } />
                </main>
            </React.Fragment>
        )
    }
}

export default NavBarWrapper
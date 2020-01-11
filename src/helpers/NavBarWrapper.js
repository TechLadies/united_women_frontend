import React from "react";
import NavBar from "../components/NavBar";

function NavBarWrapper(Component) {
    return function({ unsetToken, ...props }) {
        return (
            <React.Fragment>
                <NavBar unsetToken={ unsetToken }/>
                <div className="sidebar-offset-left">
                    <main>
                        <Component unsetToken={ unsetToken } { ...props } />
                    </main>
                </div>
            </React.Fragment>
        )
    }
}

export default NavBarWrapper;

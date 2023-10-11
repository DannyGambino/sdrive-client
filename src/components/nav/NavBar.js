import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
    setMenuOpen(!menuOpen);
};

    return (
        <div className="header">
        <ul className={`navbar ${menuOpen ? "active" : ""}`}>
            <li className="navbar__item">
                <Link className="navbar__link" to="/tickets">Repair Orders</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("sdrive")
                        }
                    }>
                    Logout
                </Link>
            </li>
        </ul>
        <div className={`menu-toggle ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        </div>
        </div>
    )
}

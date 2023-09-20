import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const AdvisorNavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/advisors">Advisors</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/technicians">Technicians</Link>
            </li>
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
    )
}

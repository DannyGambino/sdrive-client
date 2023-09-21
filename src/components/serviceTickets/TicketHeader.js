import React from "react"
import { Link } from "react-router-dom"
import "./Tickets.css"

export const TicketHeader = ({ ticket }) => {
    return <header className="ticket__header">
        <div className="ticket__customer">
            <Link to={`/tickets/${ticket.id}`}>RO #{ticket.ro_identifier}</Link>
        </div>
    </header>
}

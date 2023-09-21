import React, { useEffect, useState } from "react"
import "./Tickets.css"
import { fetchIt } from "../../utils/fetchIt"

export const TicketFooter = ({ ticket }) => {

    const [technician, setTechnician] = useState({})

    useEffect(() => {
        fetchIt(`http://localhost:8000/technicians/${ticket.technician.id}`)
                .then(tech => setTechnician(tech))
    }, [])

    const ticketStatus = () => {
        if (ticket.date_completed === null) {
            if (ticket.technician) {
                return <span className="status--in-progress">In progress</span>
            }
            return <span className="status--new">Unclaimed</span>
        }
        return <span className="status--completed">Done</span>
    }

    return <footer className="ticket__footer">
        <div className="ticket__employee">
            {
                ticket.date_completed === null
                    ? `Assigned to ${technician?.full_name ?? "no one, yet"}`
                    : `Completed by ${technician?.full_name} on ${ticket.date_completed}`
            }
        </div>
        <div> {ticketStatus()} </div>
    </footer>
}

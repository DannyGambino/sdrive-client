import React, { useEffect, useState, useCallback } from "react"
import { useHistory, useParams } from "react-router-dom"
import { fetchIt } from "../../utils/fetchIt"
import { isStaff } from "../../utils/isStaff"

export const Ticket = () => {
    const [ticket, updateTicket] = useState({})
    const [technicians, syncTechnicians] = useState([])
    const { ticketId } = useParams()
    const history = useHistory()
    const [updating, setUpdating] = useState(false)

    const fetchTicket = useCallback(() => {
        return fetchIt(`http://localhost:8000/tickets/${ticketId}`)
            .then(updateTicket)
            .catch(() => updateTicket({}))
    }, [ticketId])

    useEffect(
        () => {
            fetchTicket()
        },
        [ticketId, fetchTicket]
    )

    useEffect(
        () => {
            fetchIt("http://localhost:8000/technicians")
                .then(syncTechnicians)
                .catch(() => syncTechnicians([]))
        }, []
    )

    const deleteTicket = () => {
        fetchIt(
            `http://localhost:8000/tickets/${ticketId}`,
            {
                method: "DELETE"
            }
        ).then(() => history.push("/tickets"))
    }

    const updateTechnician = (evt) => {
        const updatedTicket = {...ticket, technician: parseInt(evt.target.value)}
        
        fetchIt(
            `http://localhost:8000/tickets/${ticketId}`,
            {
                method: "PUT",
                body: JSON.stringify(updatedTicket)
            }
        ).then(updateTicket({...ticket, technician: parseInt(evt.target.value)}))
    }

    const ticketStatus = () => {
        if (ticket.date_completed === null) {
            if (ticket.technician) {
                return <span className="status--in-progress">In progress</span>
            }
            return <span className="status--new">Unclaimed</span>
        }
        return <span className="status--completed">Done</span>
    }

    const technicianPicker = (ticket) => {
        if (isStaff()) {
            return <div className="ticket__technician">Assigned to {" "}
                <select
                    value={ticket?.technician?.id}
                    onChange={e => updateTechnician(e)}>
                    <option value="0">Choose...</option>
                    {
                        technicians.map(e => <option key={`technician--${e.id}`} value={e.id}>{e.full_name}: {e.specialty}</option>)
                    }
                </select>
            </div>
        }
        else {
            return <div className="ticket__technician">Assigned to {ticket?.technician?.full_name ?? "no one"}</div>
        }
    }

    const submitTicket = (evt) => {
        evt.preventDefault()
        console.log(ticket)
        fetchIt(
            `http://localhost:8000/tickets/${ticketId}`,
            { method: "PUT", body: JSON.stringify(ticket) }
        )
            .then(() => history.push("/tickets"))
    }

    return (
        <>
            <section className="ticket">
                {updating ? (
            <form className="ticketForm">
                <h2 className="ticketForm__title">Update Repair Order</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="customer">Customer Name:</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = {...ticket}
                                    copy.customer = evt.target.value
                                    updateTicket(copy)
                                }
                            }
                            required autoFocus
                            type="text" id="customer"
                            className="form-control"
                            placeholder="Insert Name"
                            />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = {...ticket}
                                    copy.description = evt.target.value
                                    updateTicket(copy)
                                }
                            }
                            required autoFocus
                            type="text" id="description"
                            className="form-control"
                            placeholder="Brief description of problem"
                            />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="vehicle">Vehicle:</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = {...ticket}
                                    copy.vehicle = evt.target.value
                                    updateTicket(copy)
                                }
                            }
                            required autoFocus
                            type="text" id="vehicle"
                            className="form-control"
                            placeholder="Make and Model"
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="all-wheel">All-Wheel Drive</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = {...ticket}
                                    copy.emergency = evt.target.checked
                                    updateTicket(copy)
                                }
                            }
                            type="checkbox" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="2-wheel">2-Wheel Drive:</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = {...ticket}
                                    copy.emergency = evt.target.checked
                                    updateTicket(copy)
                                }
                            }
                            type="checkbox" />
                    </div>
                </fieldset>
                <button onClick={submitTicket} className="btn btn-primary">
                    Submit Repair Order
                </button>
            </form>
                ) : (
                <div className="ticket__static">
                <h3 className="ticket__description">Description</h3>
                <div>{ticket.description}</div>
                <h3 className="ticket__description">Vehicle</h3>
                <div>{ticket.vehicle}</div>

                <footer className="ticket__footer ticket__footer--detail">
                    <div className=" footerItem">Submitted by {ticket.advisor?.full_name}</div>
                    <div className="ticket__technician footerItem">
                        {
                            ticket.date_completed === null
                                ? technicianPicker(ticket)
                                : `Completed by ${ticket.technician?.name} on ${ticket.date_completed}`
                        }
                    </div>
                    <div className="footerItem">
                        { ticketStatus() }
                    </div>
                    {
                        isStaff()
                            ? <><button onClick={() => setUpdating(true)}>Update</button><button onClick={deleteTicket}>Delete</button></>
                            : ""
                    }
                </footer>
                </div>

                )}

            </section>
        </>
    )
}

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
    const [advisor, setAdvisor] = useState({})
    const [technician, setTechnician] = useState({})

    const fetchTicket = useCallback(() => {
        return fetchIt(`http://localhost:8000/tickets/${ticketId}`)
        .then(updateTicket)
        .catch(() => updateTicket({}))
    }, [ticketId])

    const getAdvisor = () => {
        console.log("get advisor function", ticket)
        if (ticket?.advisor?.id) {
        fetchIt(`http://localhost:8000/advisors/${ticket?.advisor?.id}`)
                .then(adv => setAdvisor(adv))
    }
    }
    
    const getTechnician = () => {
        console.log("get technician function", ticket)
        if (ticket?.technician?.id) {
        fetchIt(`http://localhost:8000/technicians/${ticket?.technician?.id}`)
                .then(tech => setTechnician(tech))
    }
    }

    useEffect(() => {
        getAdvisor();
        getTechnician();
    }, [ticket]);

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
            return <div className="ticket__technician">Assigned to {technician?.full_name ?? "no one"}</div>
        }
    }
    
    const complete = (evt) => {
        if (evt.target.value === "Completed") {
            const timeStamp = new Date()
            const formattedDate = timeStamp.toISOString().split('T')[0];
            ticket.date_completed = formattedDate;
        }
        else (
            ticket.date_completed=null
        )
        fetchIt(
            `http://localhost:8000/tickets/${ticketId}`,
            {
                method: "PUT",
                body: JSON.stringify(ticket)
            }
        ).then(updateTicket(ticket))
        }

    const submitTicket = (evt) => {
        evt.preventDefault()
        console.log(ticket)
        fetchIt(
            `http://localhost:8000/tickets/${ticketId}`,
            { method: "PUT", body: JSON.stringify(ticket) }
        )
            .then(() => setUpdating(!updating))
    }

    return (
        <>
        <div className="container">
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
                            value={ticket.customer}
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
                            value={ticket.description}
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
                            value={ticket.vehicle}
                            type="text" id="vehicle"
                            className="form-control"
                            placeholder="Make and Model"
                            />
                    </div>
                </fieldset>
                <button onClick={submitTicket} className="button">
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
                    <div className=" footerItem">Submitted by {advisor?.full_name}</div>
                    <div className="ticket__technician footerItem">
                        {
                            ticket.date_completed === null
                            ? technicianPicker(ticket)
                                : `Completed by ${technician?.full_name} on ${ticket.date_completed}`
                        }
                    </div>
                    <div className="footerItem">
                        {
                            isStaff()
                            ? (<div className="ticket__complete">
                            <input
                            type="radio"
                            name="completed"
                            value="Active"
                            onChange={ticket => complete(ticket)}
                            >
                            </input>
                            <label>Active</label>
                            <input
                            type="radio"
                            name="completed"
                            value="Completed"
                            onChange={ticket => complete(ticket)}
                            >
                            </input>
                            <label>Completed</label>              
                            </div>)
                            : ""    
                        }
                    </div>
                    <div className="footerItem">
                        { ticketStatus() }
                    </div>
                    {
                        isStaff()
                        ? <><button className="button update" onClick={() => setUpdating(true)}>Update</button><button className="button delete" onClick={deleteTicket}>Delete</button></>
                        : ""
                    }
                </footer>
                </div>

)}

            </section>
            </div>
        </>
    )
}

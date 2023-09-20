import React, {useState} from "react"
import { useHistory } from "react-router-dom"
import { fetchIt } from "../../utils/fetchIt"

export const TicketForm = () => {

    const [ticket, updateTicket] = useState({
        description: "",
        customer: ""
    })
    const history = useHistory()

    const submitTicket = (evt) => {
        evt.preventDefault()

        fetchIt(
            "http://localhost:8000/tickets",
            { method: "POST", body: JSON.stringify(ticket) }
        )
            .then(() => history.push("/tickets"))
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Repair Order</h2>
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
    )
}
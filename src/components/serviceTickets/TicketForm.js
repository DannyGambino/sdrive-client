import React, {useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { fetchIt } from "../../utils/fetchIt"

export const TicketForm = () => {

    const [ticket, updateTicket] = useState({
        description: "",
        customer: "",
        vehicle: ""  
    })
    const history = useHistory()

    const submitFetch = (updatedTicket) => {
        fetchIt(
            "http://localhost:8000/tickets",
            { method: "POST", body: JSON.stringify(updatedTicket) }
        ).then(() => history.push("/tickets"));
    }
    
    const getRoNumber = async () => {
        const fetched = await fetchIt("http://localhost:8000/tickets");
        const roNumber = fetched.length + 1;
        return roNumber;
    }
    
    const submitTicket = (evt) => {
        evt.preventDefault();
        getRoNumber().then((roNumber) => {
            const updatedTicket = { ...ticket, ro_identifier: roNumber };
            submitFetch(updatedTicket);
        });
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
            </fieldset>
            <button onClick={submitTicket} className="btn btn-primary">
                Submit Repair Order
            </button>
        </form>
    )
}
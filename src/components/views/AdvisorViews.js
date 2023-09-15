import React from "react"
import { Route } from "react-router-dom"
import { TechnicianList } from "./Technicians/TechnicianList";
import { Advisor } from "./advisors/Advisor";
import { AdvisorForm } from "./advisors/AdvisorForm";
import { AdvisorList } from "./advisors/AdvisorList";
import { Ticket } from "./serviceTickets/Ticket";
import { TicketForm } from "./serviceTickets/TicketForm";
import { TicketList } from "./serviceTickets/TicketList";

export const AdvisorViews = () => {

    return (
        <>
            <Route exact path="/technicians">
                <TechnicianList />
            </Route>

            <Route exact path="/">
                <TicketList />
            </Route>

            <Route exact path="/tickets">
                <TicketList />
            </Route>

            <Route exact path="/tickets/:ticketId(\d+)">
                <Ticket />
            </Route>

            <Route path="/tickets/create">
                <TicketForm />
            </Route>

            <Route exact path="/advisors">
                <AdvisorList />
            </Route>

            <Route exact path="/advisors/:advisorId(\d+)">
                <Advisor />
            </Route>

            <Route path="/advisors/create">
                <AdvisorForm />
            </Route>

        </>
    )
}

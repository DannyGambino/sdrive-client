import React, { useEffect, useState } from "react"
import { fetchIt } from "../../utils/fetchIt"
import "./Technicians.css"

export const TechnicianList = () => {
    const [technicians, setTechnicians] = useState([])
    const [totalTechnicianMessage, updateMessage] = useState("")

    useEffect(
        () => {
            fetchIt("http://localhost:8000/technicians")
                .then(setTechnicians)
                .catch(() => setTechnicians([]))
        }, []
    )

    useEffect(
        () => {
            if (technicians.length === 1) {
                updateMessage("You have 1 technician")
            }
            else {
                updateMessage(`You have ${technicians.length} technicians`)
            }
        },
        [technicians]
    )

    return (
        <>
        <div className="experience container">
            <h2>Technician List</h2>
            <div className="tech-message">{totalTechnicianMessage}</div>
            {
                technicians.map(
                    (technicianObject) => {
                        return <p key={`technician--${technicianObject.id}`}>{technicianObject.full_name}</p>
                    }
                    )
                }
                </div>
        </>
    )
}
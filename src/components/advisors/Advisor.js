import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchIt } from "../../utils/fetchIt"

export const Advisor = () => {
    const [ advisor, set ] = useState({})  // State variable for current advisor object
    const { advisorId } = useParams()

    useEffect(
        () => {
            fetchIt(`http://localhost:8000/advisors/${advisorId}`).then(set)
        },
        [ advisorId ]  // Above function runs when the value of advisorId change
    )

    return (
        <>
            <section className="experience container">
                <h3 className="advisor__name">{advisor.full_name}</h3>
                <div className="advisor__specialty">Experience: {advisor.experience}</div>
            </section>
        </>
    )
}

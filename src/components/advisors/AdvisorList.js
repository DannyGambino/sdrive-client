import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { fetchIt } from "../../utils/fetchIt"
import "./Advisors.css"

export const AdvisorList = () => {
    const [advisors, changeAdvisors] = useState([])
    const [experience, setExperience] = useState("")

    useEffect(
        () => {
            fetchIt("http://localhost:8000/advisors")
                .then(changeAdvisors)
                .catch(() => changeAdvisors([]))
        },
        []
    )

    useEffect(() => {
        const justExperience = advisors.map(adv => adv.experience)
        setExperience(justExperience.join(", "))
    }, [advisors])


    return (
        <>
            <div className="experience">
                <strong>Team Experience</strong>: { experience }
            </div>
            <h2>Advisor Roster</h2>
            {
                advisors.map(
                    (advisor) => {
                        return <Link key={`advisor--${advisor.id}`} to={`advisors/${advisor.id}`}>
                            <p>{advisor.full_name}</p>
                        </Link>
                    }
                )
            }
        </>
    )
}
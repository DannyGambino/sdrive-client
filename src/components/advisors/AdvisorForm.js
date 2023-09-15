import React, {useState} from "react"
import { useHistory } from "react-router-dom"

export const AdvisorForm = () => {

    const [advisor, change] = useState({
        name: "",
        specialty: ""
    })
    const history = useHistory()

    const hireAdvisor = (evt) => {
        evt.preventDefault()

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: advisor.name,
                specialty: advisor.specialty
            })
        }

        return fetch("http://localhost:8000/advisors", fetchOption)
            .then(() => {
                history.push("/advisors")
            })
    }

    return (
        <form>
            <h2>New Advisor</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = {...advisor}
                                copy.name = evt.target.value
                                change(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Full name"
                         />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = {...advisor}
                                copy.specialty = evt.target.value
                                change(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Technical specialty"
                         />
                </div>
            </fieldset>
            <button onClick={hireAdvisor} className="btn btn-primary">
                Hire Advisor
            </button>
        </form>
    )
}
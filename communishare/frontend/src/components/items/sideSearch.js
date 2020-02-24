import React from 'react'

export default function SideSearch(props) {
    function handelPickOrdering(event) {
        props.setSearchOrder(event.target.value)
        props.setOrder(event.target.value)
    }

    return (
        <ul className="nav flex-column">
            <h4>Order by:</h4>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="availability"
                       value="availability" name='ordering'
                       onChange={handelPickOrdering}/>
                <label className="form-check-label" htmlFor="availability">Availability</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="date" value="date"
                       name='ordering'
                       onChange={handelPickOrdering}/>
                <label className="form-check-label" htmlFor="date">Date</label>
            </div>
        </ul>)
}
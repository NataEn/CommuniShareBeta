import React from 'react'
import {Link} from "react-router-dom";
import Dashboard from "../items/dashboard";

export default function Portfolio(props) {
    const {user, foundItems, setCriteria, setSearchValue, setSearchOrder, setOrder} = props
    return (
        <><h3>{props.user.name[0].toUpperCase() + props.user.name.slice(1)} Portfolio Page</h3>
            <Link className="nav-link" to="/share-item">Share Item</Link>
            {
                props.user.image ? <img className='portfolio-image' src={props.user.image}/> :
                    <img className='portfolio-image' src='/static/frontend/images/samplePortfolio.jpg'/>
            }


            <h4>My Items</h4>
            <Dashboard foundItems={foundItems} setCriteria={setCriteria}
                       setSearchValue={setSearchValue} setSearchOrder={setSearchOrder}
                       setOrder={setOrder}/>
        </>
    )
}
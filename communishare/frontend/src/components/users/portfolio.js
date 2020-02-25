import React from 'react'
import {Link} from "react-router-dom";
import Dashboard from "../items/dashboard";

export default function Portfolio(props) {
    const {user, foundItems, setCriteria, setSearchValue, setSearchOrder, setOrder} = props
    return (
        <><h3>{props.user.name[0].toUpperCase() + props.user.name.slice(1)} Portfolio Page</h3>
            <Link className="nav-link" to="/share-item">Share Item</Link>
            {
                props.user.image ? <img className='portfolio-image img-thumbnail' src={props.user.image}/> :
                    <img className='portfolio-image' src='/static/frontend/images/samplePortfolio.jpg'/>
            }


            <h4>My Items</h4>
            <table className="table table-sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Tags</th>
                    <th>Availability</th>
                    <th>Description</th>
                    <th>Item Page</th>
                    <th>Edit</th>
                    <th>Share</th>

                </tr>
                </thead>
                <tbody>

                {
                    foundItems.map(item => {
                        return (
                            <tr key={item.name}>
                                <th>{item.id}</th>
                                <td className='td-image'><img src={item.images[0]} alt={item.name}
                                                              className="img-thumbnail item-image d-inline-block"/>
                                </td>

                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>Tags</td>
                                <td>{item.availability ? 'Available' : 'Not Available'}</td>
                                <td>{item.description}</td>
                                <td><Link to="/portfolio/:item">Go to item </Link></td>
                                <th><Link to="/share-item">Edit</Link></th>
                                <th>Share</th>
                            </tr>

                        )
                    })
                }

                </tbody>
            </table>

        </>
    )
}
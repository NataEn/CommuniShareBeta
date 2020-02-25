import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {get_item} from "../api_calls";


export default function Items(props) {
    const {foundItems} = props
    let borrowedItem = {}

    // function handelBorrowItem(event, item) {
    //     borrowedItem = get_item(item).then(resp => resp);
    // }


    const item_view = (item, index) => (

        <div className="card col-3" key={index}>

            {item.images.length > 0 ? item.images.map(img => (
                    <img src={img} className="card-img-top" alt={img} key={img}/>)) :
                <div className="no_image card-img-top card-img text-center">No image available</div>}
            <div className="card-body" key={item.name}>
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-truncate">{item.description}</p>
                {item.availability ? <a href="#" className="btn btn-warning">In use</a> :
                    <Link className={'btn btn-primary'} to={{
                        pathname: `/items/${item.id}`,
                        state: {
                            itemId: item.id
                        }
                    }}>
                        Borrow
                    </Link>}
            </div>
        </div>

    );
    return (<div className='row'>
        {foundItems.length > 0 ? foundItems.map((item, index) => item_view(item, index)) :
            <div>no items were found</div>}
    </div>);
};
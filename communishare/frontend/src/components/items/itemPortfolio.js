import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {get_item} from '../api_calls';

export default function ItemPortfolio(props) {
    const {itemId} = props.location.state
    const [item, setItem] = useState({})

    useEffect(() => {
        get_item(itemId).then(resp => {
            setItem(resp)
        });
    }, []);
    return (
        <div>
            Item Portfolio page
            <div>{itemId}</div>

            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {item.images && item.images.length > 0 ? item.images.map((img, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={img}>
                            {img}
                            <img className="d-block w-100" src={img}/>
                        </div>)) : <div className='emptyCarusel'>No Images available</div>}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button"
                   data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button"
                   data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div>message to borrow</div>
            <form onSubmit={(e) => {
                e.preventDefault();
                console.log(e);
            }}>
                <label htmlFor="start">Start date:<input type='date' id='start'/></label>
                <label htmlFor="end">End date:<input type='date' id='end'/></label>
                <button type="submit" className="btn btn-success" value='submit'>Request Item</button>
            </form>
            <button type="button" className="btn btn-info">Save for Later</button>
            {/*<div>{newProp}</div>*/}
        </div>
    )

}
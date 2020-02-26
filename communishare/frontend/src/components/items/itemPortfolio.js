import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {get_item, get_item_schedual} from '../api_calls';

export default function ItemPortfolio(props) {
    const {itemId} = props.location.state
    const [item, setItem] = useState({})
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)

    useEffect(() => {
        get_item(itemId).then(resp => {
            console.log(resp)
            setItem(resp)
        });
    }, []);

    function convertToTimestamp(date) {
        console.log(date)
        let myDate = date.split("-");
        let newDate = myDate[0] + "," + myDate[1] + "," + myDate[2];
        return new Date(newDate).getTime() / 1000;

    }

    function handleChange(event) {
        if (event.target.name === 'start') {
            const date = convertToTimestamp(event.target.value)
            console.log('start', date)
            setStart(date)
        } else if (event.target.name === 'end') {
            const date = convertToTimestamp(event.target.value)
            console.log('end', date)
            setEnd(date)
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (true) {

            const resp = get_item_schedual(item.id, start, end)
            console.log(resp)
        }
    }


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
            <form id='scheduleForm' onSubmit={handleSubmit}>
                <label htmlFor="start">Start date:<input type='date' name='start' onChange={handleChange}/></label>
                <label htmlFor="end">End date:<input type='date' name='end' onChange={handleChange}/></label>
                <button type="submit" className="btn btn-success" value='submit'>Request Item</button>
            </form
            >
            <button type="button" className="btn btn-info">Save for Later</button>
        </div>
    )

}
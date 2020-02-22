import React, {useState} from 'react'


export default function Items(props) {
    const {foundItems} = props
    const item_view = (item) => (
        <div className="card col-3" key={item.name}>
            {item.images.length>0 ? item.images.map(img => (<img src={img} className="card-img-top" alt="Card image cap"/>)) :
                <div className="no_image card-img-top card-img text-center">No image available</div>}
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-truncate">{item.description}</p>
                    {item.available ? <a href="#" className="btn btn-warning">In use</a> :
                        <a href="#" className="btn btn-primary">Borrow</a>}
                </div>
        </div>
    );
    return (<div className='row'>
        {foundItems.map(item => item_view(item))}
    </div>);
};
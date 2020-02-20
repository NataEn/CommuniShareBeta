import React, {Component, useState, useEffect} from 'react'
import {get_all_items, get_current_user} from '../api_calls'

export default function Items(props) {
    const {last_10} = props
    const item_view = (item)  => (
        <li key={item.name}>
            <h2>{item.name}</h2>
            <div>{item.description}</div>
            {item.images.map(img => (<img src={img}/>))}

        </li>
    );
    return (<ul>
        {last_10.map(item => item_view(item))}

    </ul>);

};
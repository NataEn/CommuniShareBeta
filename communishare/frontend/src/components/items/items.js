import React, {Component, useState, useEffect} from 'react'
import {get_all_items, get_current_user} from '../api_calls'

export default function Items(props) {
    const {last_10} = props
    const item_view = (item) => Object.entries(item).map((entry) =>
        <div><p>{entry[0]}</p><p>entry[1]</p></div>
    )

    return (<ul>
        {/*{last_10.map(item => item_view(item))}*/}
        {console.log(last_10)}
    </ul>);

}
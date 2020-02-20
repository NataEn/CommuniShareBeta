import React from 'react'
import Items from "./items";
import AddItem from "./add_item";

export default function Dashboard (props){
    const last_10=props.last_10_items
    return (
        <div>
            <AddItem/>
            <Items last_10={last_10}/>
        </div>
    );

}
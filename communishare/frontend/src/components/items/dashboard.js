import React from 'react'
import Items from "./items";
import AddItem from "./add_item";

export default function Dashboard (props){
    const last10=props.last10
    return (
        <div>
            <AddItem/>
            <Items last10={last10}/>
        </div>
    );

}
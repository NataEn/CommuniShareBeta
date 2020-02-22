import React from 'react'
import Items from "./items";
import AddItem from "./add_item";
import SeachBar from "./searchBar";

export default function Dashboard(props) {
    const {last10, user,foundItems, findItems} = props
    return (
        <div>
            <AddItem/>
            <SeachBar findItems={findItems}/>
            <Items foundItems={foundItems}/>
        </div>
    );

}
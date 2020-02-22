import React from 'react'
import Items from "./items";
import AddItem from "./add_item";
import SeachBar from "./searchBar";

export default function Dashboard(props) {
    const {last10, user} = props
    return (
        <div>
            <AddItem/>
            <SeachBar/>
            <Items last10={last10}/>
        </div>
    );

}
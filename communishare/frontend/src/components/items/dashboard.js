import React from 'react'
import Items from "./items";
import AddItem from "./add_item";

export default function Dashboard (){
    return (
        <div>
            <AddItem/>
            <Items/>
        </div>
    );

}
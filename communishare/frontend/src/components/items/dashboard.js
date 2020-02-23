import React from 'react'
import Items from "./items";
import AddItem from "./add_item";
import SearchBar from "./searchBar";

export default function Dashboard(props) {
    const {last10, user,foundItems, setCriteria,setSearchValue} = props
    return (
        <div>
            <AddItem/>
            <SearchBar setCriteria={setCriteria} setSearchValue={setSearchValue} foundItems={foundItems}/>
            <Items foundItems={foundItems}/>
        </div>
    );

}
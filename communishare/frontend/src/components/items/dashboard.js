import React from 'react'
import Items from "./items";
import AddItem from "./add_item";
import SearchBar from "./searchBar";
import SideSearch from "./sideSearch";

export default function Dashboard(props) {
    const {last10, user, foundItems, setCriteria, setSearchValue, setSearchOrder,setOrder} = props
    return (
        <div>
            <AddItem/>

            <SearchBar setCriteria={setCriteria} setSearchValue={setSearchValue} foundItems={foundItems}/>
            <SideSearch setSearchOrder={setSearchOrder} setOrder={setOrder}/>
            <Items foundItems={foundItems}/>
        </div>
    );

}
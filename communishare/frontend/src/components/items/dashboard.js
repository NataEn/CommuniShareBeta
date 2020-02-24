import React from 'react'
import Items from "./items";

import SearchBar from "./searchBar";
import SideSearch from "./sideSearch";

export default function Dashboard(props) {
    const {user, foundItems, setCriteria, setSearchValue, setSearchOrder,setOrder} = props
    return (
        <div>
            <SearchBar setCriteria={setCriteria} setSearchValue={setSearchValue} foundItems={foundItems}/>
            <SideSearch setSearchOrder={setSearchOrder} setOrder={setOrder}/>
            <Items foundItems={foundItems}/>
        </div>
    );

}
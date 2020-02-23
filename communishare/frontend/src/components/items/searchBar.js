import React, {useEffect, useRef,useState} from 'react'
import {find_items, get_current_user} from "../api_calls";

export default function SearchBar(props) {
    const inputEl = useRef(null);


    function handelSearch(event, criteria) {
        event.preventDefault()
        console.log(criteria)
        switch (criteria) {
            case 'freeSearch':
                props.setSearchValue(inputEl.current.value)
                props.setCriteria(criteria)
                break;
            case 'Home and Garden':
                break;}}

    return (<>

            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <form className="form-inline my-2 my-lg-0" name='searchForm'>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search..."
                           aria-label="Search" name='freeInput' ref={inputEl}/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit"
                            onClick={(event) => handelSearch(event, 'freeSearch')}>Search
                    </button>
                </form>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home and Garden <span
                                className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home and Interior <span
                                className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Family and Kids</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Motors</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Electronics</a>
                        </li>

                    </ul>

                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
        </>
    )
}
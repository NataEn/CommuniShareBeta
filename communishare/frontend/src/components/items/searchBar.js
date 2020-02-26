import React, {useEffect, useRef, useState} from 'react'
import {CATEGORIES} from "../constants";


export default function SearchBar(props) {
    const inputEl = useRef(null);

    function handelSearch(event, criteria) {
        event.preventDefault()
        console.log(criteria)
        console.log(event.target.value)
        if (criteria === 'freeSearch') {
            props.setSearchValue(inputEl.current.value)
            props.setCriteria(criteria)
        }
        else{
             props.setSearchValue(criteria)
            props.setCriteria(criteria)
        }
    }

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
                        {CATEGORIES.map(category => {
                                return (<li className="nav-item" key={category}>
                                    <a className="nav-link" href="#"
                                       onClick={(event) => handelSearch(event, category)}>{category}</a>
                                </li>)
                            }
                        )}

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
import React, {Component, useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Header from "./layout/header";
import Dashboard from './items/dashboard';
import {get_all_items, get_current_user, get_last_10_items, find_items, logoutUser} from './api_calls'


function App() {
    const [last10, setLast10] = useState([])
    const [allItems, setAllItems] = useState([])
    const [user, setUser] = useState({})
    const signout = logoutUser

    useEffect(() => {
        get_last_10_items().then(resp => {
            setLast10(resp);
        });
        get_current_user().then(resp => {
            setUser(resp);
        });
    }, [])

    function signoutUser() {
        signout()
        get_current_user().then(resp => {
            setUser(resp);
        });


    }


    return (
        <>
            <Header user={user} signout={signoutUser}/>
            <div className="container">
                <Dashboard last10={last10} user={user}/>
            </div>

        </>)


}

ReactDOM.render(<App/>, document.getElementById('app'))
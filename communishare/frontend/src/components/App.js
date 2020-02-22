import React, {Component, useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Header from "./layout/header";
import Dashboard from './items/dashboard';
import {get_current_user, find_items, logoutUser} from './api_calls'


function App() {
    const [user, setUser] = useState({})
    const [fountItems, setFountItems] = useState([])
    const signout = logoutUser

    useEffect(() => {
        find_items('all').then(resp => {
            setFountItems(resp);
        });
        get_current_user().then(resp => {
            setUser(resp);
        });
    }, [])

    function findItems(criteria, data) {
        if (criteria === 'all') {
            find_items("all").then(resp => {
                setFountItems(resp);
            });
        } else {
            find_items(data).then(resp => {
                setFountItems(resp)
            })
        }


    }

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
                <Dashboard user={user} findItems={findItems} foundItems={fountItems}/>
            </div>

        </>)


}

ReactDOM.render(<App/>, document.getElementById('app'))
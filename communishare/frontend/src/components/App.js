import React, {Component, useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Header from "./layout/header";
import Dashboard from './items/dashboard';
import {get_current_user, find_items, logoutUser} from './api_calls'


function App() {
    const [user, setUser] = useState({})
    const [foundItems, setFoundItems] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)
    const [criteria, setCriteria] = useState('all')
    const signout = logoutUser

    useEffect(() => {
        find_items('all').then(resp => {
            setFoundItems(resp)
        });
        let user = get_current_user().then(resp => {
            setUser(resp)
        });
        if (user.name) {
            setLoggedIn(true)
        }
    }, [])
    useEffect(() => {
        if (criteria === 'all') {
            find_items("all").then(resp => {
                setFoundItems(resp)
            });
        } else {
            find_items(searchValue).then(resp => {
                setFoundItems(resp)
            })
        }
    }, [searchValue])
    useEffect(() => {
        get_current_user().then(resp => {
            setUser(resp)
        });
    }, [loggedIn])


    function signoutUser() {
        signout()
        get_current_user().then(resp => {
            setUser(resp)
        });
        setLoggedIn(false)
    }


    return (
        <>
            <Header user={user} signout={signoutUser}/>
            <div className="container">
                <Dashboard user={user} foundItems={foundItems} setCriteria={setCriteria}
                           setSearchValue={setSearchValue}/>
            </div>

        </>)


}

ReactDOM.render(<App/>, document.getElementById('app'))
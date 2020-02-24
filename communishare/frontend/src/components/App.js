import React, {Component, useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Header from "./layout/header";
import Dashboard from './items/dashboard';
import Portfolio from "./users/portfolio";
import AddItem from "./items/add_item";
import {get_current_user, find_items, logoutUser} from './api_calls'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function App() {
    const [user, setUser] = useState({})
    const [foundItems, setFoundItems] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)
    const [criteria, setCriteria] = useState('all')
    const [searchOrder, setSearchOrder] = useState('date')
    const [order, setOrder] = useState("")
    const signout = logoutUser
    console.log("order", order)

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
            console.log("in all statemrnt")
            find_items("all", searchOrder).then(resp => {
                setFoundItems(resp)
            });
        } else {
            console.log("in searchorder statement", searchOrder)
            find_items(searchValue, searchOrder).then(resp => {
                setFoundItems(resp)
            })
        }
    }, [searchValue, order])
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
        <Router>
            <>
                <Header user={user} signout={signoutUser}/>
                <Switch>
                    <Route exact path="/">
                        <div className="container">
                            <Dashboard user={user} foundItems={foundItems} setCriteria={setCriteria}
                                       setSearchValue={setSearchValue} setSearchOrder={setSearchOrder}
                                       setOrder={setOrder}/>
                        </div>
                    </Route>
                    <Route path='/share-item'>
                        <AddItem/>
                    </Route>
                    <Route path='/portfolio'>
                        <Portfolio user={user} foundItems={foundItems} setCriteria={setCriteria}
                                   setSearchValue={setSearchValue} setSearchOrder={setSearchOrder}
                                   setOrder={setOrder}/>
                    </Route>
                </Switch>
            </>
        </Router>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'))
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
    const [userItems, setUserItems] = useState({})
    const [foundUserItems, setFoundUserItems] = useState([])
    const [foundItems, setFoundItems] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)
    const [criteria, setCriteria] = useState('all')
    const [searchOrder, setSearchOrder] = useState('date')
    const [order, setOrder] = useState("")
    const signout = logoutUser

    useEffect(() => {
        find_items('all').then(resp => {
            console.log('all items',resp)
            setFoundItems(resp);
        });
        let user = get_current_user().then(resp => {
            console.log('from user',resp)
            setUser(resp)
            // setUserItems(resp.items)
        });
        if (user.name) {
            setLoggedIn(true)
        }
    }, [])
    useEffect(() => {
        if (criteria === 'all' || criteria === '') {
            find_items("all", searchOrder).then(resp => {
                setFoundItems(resp)
            });
        } else {
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
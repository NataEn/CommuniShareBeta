import React, {Component, useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Header from "./layout/header";
import Dashboard from './items/dashboard';
import {get_all_items, get_current_user, get_last_10_items} from './api_calls'


function App() {
    const [last10, setLast10] = useState([])
    const [allItems, setAllItems] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        get_current_user().then(resp => {
            setUser(resp);
        });
    }, [])
    useEffect(() => {
        get_last_10_items().then(resp => {
            setLast10(resp);
        });
    }, [])

    // componentDidMount() {
    //     this.setState({'last_10': get_last_10_items(), allItems: get_all_items(), user: get_current_user()})
    // }


    return (
        <>
            <Header/>
            <div className="container">
                <Dashboard last10={last10} user={user}/>
            </div>

        </>)


}

ReactDOM.render(<App/>, document.getElementById('app'))
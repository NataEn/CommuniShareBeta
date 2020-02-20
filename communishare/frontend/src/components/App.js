import React, {Component, useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Header from "./layout/header";
import Dashboard from './items/dashboard';
import {get_all_items, get_current_user, get_last_10_items} from './api_calls'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            last_10: [],
            allItems: get_all_items(),
            user: get_current_user()
        };


        get_last_10_items().then(resp => {
            this.setState({'last_10':resp});
        })

    }

    // componentDidMount() {
    //     this.setState({'last_10': get_last_10_items(), allItems: get_all_items(), user: get_current_user()})
    // }


    // useEffect(() => {
    //     // Update the document title using the browser API
    //     setAllItems({get_all_items}, [])
    //     setUser({get_current_user}, [])
    //     setLast10({get_last_10_items}, [])
    // });

    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <Dashboard last_10_items={this.state.last_10}/>
                </div>

            </>)


    }
}

ReactDOM.render(<App/>, document.getElementById('app'))
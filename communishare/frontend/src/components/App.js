import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from "./layout/header";
import Dashboard from './items/dashboard';
import {get_all_items, get_current_user,get_last_10_items} from '../api_calls'


class App extends Component {
    componentDidMount() {
        const all=get_all_items()
        const user=get_current_user()
        const last_10=get_last_10_items()
    }

    render() {
        return (<>
            <Header/>
            <div className="container">
                <Dashboard last_10_items={last_10}/>
            </div>

        </>);
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))
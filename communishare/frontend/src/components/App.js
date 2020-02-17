import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from "./layout/header";
import Dashboard from './items/dashboard'

class App extends Component {
    render() {
        return (<>
            <Header/>
            <div className="container">
                <Dashboard/>
            </div>

        </>);
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))
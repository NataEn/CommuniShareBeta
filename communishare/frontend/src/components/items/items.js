import React, {Component} from 'react'
import {get_all_items, get_current_user} from '../api_calls'

export default class Items extends Component {
    componentDidMount() {
        get_all_items()
        get_current_user()
    }

    render() {
        return (<ul>
            <li>all Items</li>
        </ul>);
    }
}
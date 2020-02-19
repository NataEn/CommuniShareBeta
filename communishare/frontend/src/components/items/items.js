import React, {Component} from 'react'

export default class Items extends Component {
    componentDidMount() {
        fetch('http://localhost:8000/api/all_items/')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson);
                console.log('myJson');
            });
    }

    render() {
        return (<ul>
            <li>all Items</li>
        </ul>);
    }
}
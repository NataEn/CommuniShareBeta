import React from 'react'
import {useParams} from 'react-router-dom'

export default function ItemPortfolio(props) {
    let {item} = useParams();
    return (
        <div>
            Item Portfolio page
        </div>
    )

}
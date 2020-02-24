import React, {Component} from 'react'
import {
    Link
} from "react-router-dom";

function Identification(props) {
    if (!props.user.name) {
        return (<li className="nav-item">
            <a className="nav-link d-inline-block" href="/accounts/login" tabIndex="-1" aria-disabled="true">Login</a>
        </li>)
    } else {
        return (<>
            <li className="nav-item">
                <Link className="nav-link" to="/share-item">Share Item</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/portfolio"><span>{props.user.name}</span></Link>
            </li>
            <Link className="nav-item" to='/'>
                <a className="nav-link d-inline-block" href='/' onClick={() => props.signout()} tabIndex="-1"
                   aria-disabled="true">Logout</a>
            </Link>
        </>)
    }
}


export default function Header(props) {


    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <a className="navbar-brand" href="#"><img src="./static/frontend/images/logo.png" className="logo"/></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">About <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">Contact <span className="sr-only">(current)</span></a>
                    </li>
                    <Identification user={props.user} signout={props.signout}/>

                </ul>
            </div>
        </nav>
    )

}
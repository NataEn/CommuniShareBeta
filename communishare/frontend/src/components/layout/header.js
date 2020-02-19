import React, {Component} from 'react'

export default class Header extends Component {
    render() {
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
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Share Item</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Categories
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Family and Kids</a>
                                <a className="dropdown-item" href="#">Home and Garden</a>
                                 <a className="dropdown-item" href="#">Home and Interior</a>
                                <a className="dropdown-item" href="#">Electronics</a>
                                 <a className="dropdown-item" href="#">Motors</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">My Last Search</a>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/" tabIndex="-1"
                               aria-disabled="true">Logout</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/accounts/login" tabIndex="-1"
                               aria-disabled="true">Login</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
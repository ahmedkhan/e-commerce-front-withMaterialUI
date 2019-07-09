import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { signout, isAuthenticated } from "../auth"
import { itemTotal } from "../core/cartHelpers";
import Mainlogo from "../images/logo.png";
import Sigin from "../user/Signin";

import "../core/css/responsive.css";
import "../core/css/responsive.css.map";
import "../core/css/ui.css";
import "../core/css/ui.css.map";
import "../core/css/bootstrap.css";
import "../core/css/bootstrap.css.map";
import Search from "./Search";

const Header = () => {

    return (
        <div className="section-header">
            <section className="header-main">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                            <div className="brand-wrap">
                                <img className="logo" src={Mainlogo} />
                                <h2 className="logo-text">LOGO</h2>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-6">
                        <Search/>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="widgets-wrap d-flex justify-content-end">
                                <div className="widget-header">
                                    <a href="#" className="icontext">
                                        <div className="icon-wrap icon-xs bg2 round text-primary"><i className="fa fa-shopping-cart" /></div>
                                        <div className="text-wrap">
                                            <small>Basket</small>                                            
                                            <small className="badge badge-pill badge-danger">{itemTotal()}</small>
                                            
                                        </div>
                                    </a>
                                </div>
                                <Sigin/>                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default Header;

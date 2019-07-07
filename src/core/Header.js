import React,{Fragment } from "react";
import { Link } from "react-router-dom";
import { signout, isAuthenticated } from "../auth"
import Mainlogo from "../images/logo.png";
import "../core/css/responsive.css";
import "../core/css/ui.css";
import "../core/css/ui.css.map";

const Header = () => {
    
    return (
        <div>
            <section className="header-main">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5-24 col-sm-5 col-4">
                            <div className="brand-wrap">
                                <img className="logo" src={Mainlogo} />
                                <h2 className="logo-text">LOGO</h2>
                            </div> 
                        </div>
                        <div className="col-lg-13-24 col-sm-12 order-3 order-lg-2">
                            <form className="form-inline my-2 my-lg-0">

                                <select className="custom-select" name="category_name">
                                    <option value>All type</option><option value="codex">Special</option>
                                    <option value="comments">Only best</option>
                                    <option value="content">Latest</option>
                                </select>
                                <input type="text" className="form-control mr-sm-2" style={{ width: '60%' }} placeholder="Search" />
                                <button className="btn btn-primary btn-md mr-sm-2" type="submit">
                                    <i className=" fa fa-search" />
                                </button>

                            </form>
                        </div>
                        <div className="col-lg-6-24 col-sm-7 col-8  order-2  order-lg-3">
                            <div className="d-flex justify-content-end">
                                <div className="widget-header">
                                    <small className="title text-muted">Welcome Guest</small>
                                    <div>
                                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                                      <Fragment>
                                       <Link to="/admin/dashboar">My Account</Link>
                                      </Fragment>)}

                                      {!isAuthenticated() && (
                                        <Fragment>
                                          <Link to="/signin">Sign in</Link> <span className="dark-transp"> | </span>
                                          <Link to="/signup"> Register</Link>
                                        </Fragment>)}
                                     
                                    
                                    </div>
                                </div>
                                <Link to="#" className="widget-header border-left pl-3 ml-3">
                                    <div className="icontext">
                                        <div className="icon-wrap icon-sm round border"><i className="fa fa-shopping-cart" /></div>
                                    </div>
                                    <span className="badge badge-pill badge-danger notify">0</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default Header;

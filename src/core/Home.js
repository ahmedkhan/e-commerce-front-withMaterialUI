import React, { useState, useEffect } from "react";
import {  MDBFooter, MDBNavLink } from "mdbreact";
import Card from "./Card";
import App from "../App";
import { getProducts } from "./apiCore";
import Search from "./Search";
import "../core/css/responsive.css";
import "../core/css/ui.css";
import "../core/css/bootstrap.css";

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts("sold").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts("createdAt").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <div>        
        <App/>        
         <span className="d-block p-2 bg-primary text-white"><b>New Arrivals</b></span>
          <br />  
           <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
            <br />
            <span className="d-block p-2 bg-primary text-white"><b>Best Seller's</b></span>
            <br />
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <MDBFooter color="indigo">
          <p className="footer-copyright mb-0 py-3 text-center">
            &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
          </p>
        </MDBFooter>
        </div>
    );
};
export default Home;
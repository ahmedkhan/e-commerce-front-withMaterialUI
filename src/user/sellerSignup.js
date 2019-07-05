import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { sellerSignup } from "../auth";

const Signup = () => {
    const [values, setValues] = useState({
        shopName: "",
        shopEmail: "",
        password: "",
        error: "",
        success: false,
        shopOwnerName :"",
        WareHouseAddress :"",
        ShopPhone : ""
    });

    const { shopName, shopEmail, password, success, error,shopOwnerName,WareHouseAddress,ShopPhone } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickApply = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        sellerSignup({ shopName, shopEmail, password ,shopOwnerName,WareHouseAddress,ShopPhone}).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    shopName: "",
                    shopEmail: "",
                    password: "",
                    error: "",
                    success: true,
                    shopOwnerName :"",
                    WareHouseAddress :"",
                    ShopPhone:""
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Shop Name</label>
                <input
                    onChange={handleChange("shopName")}
                    type="text"
                    className="form-control"
                    value={shopName}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Shop Owner Name</label>
                <input
                    onChange={handleChange("shopOwnerName")}
                    type="text"
                    className="form-control"
                    value={shopOwnerName}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">WearHouse Address</label>
                <input
                    onChange={handleChange("Address")}
                    type="text"
                    className="form-control"
                    value={WareHouseAddress}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Phone Number</label>
                <input
                    onChange={handleChange("Phone")}
                    type="number"
                    className="form-control"
                    value={ShopPhone}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={shopEmail}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickApply} className="btn btn-primary">
                Apply 
            </button>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            New Seller account is Under Review. Please Check your Email Or Login As a User<Link to="/signin">Login</Link>
        </div>
    );

    return (
        <Layout
            title="Seller SignUp"
            description="Seller Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;

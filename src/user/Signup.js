import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        
<div className="card">
<article className="card-body mx-auto" style={{"maxwidth": "400px"}}>
	<h4 className="card-title mt-3 text-center">Create Account</h4>
	<p className="text-center">Get started with your free account</p>	
	<form>
	<div className="form-group input-group">
		<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
		 </div>
        <input value={name} className="form-control" placeholder="Full name" type="text" onChange={handleChange("name")}/>
    </div> 
    <div className="form-group input-group">
    	<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
		 </div>
        <input value={email} className="form-control" placeholder="Email address" type="email" onChange={handleChange("email")}/>
    </div> 
    <div className="form-group input-group">
    	<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
		</div>
		<select className="custom-select" style={{"maxwidth": "120px"}}>
		    <option defaultValue="">+92</option>
		    <option value="1">+972</option>
		    <option value="2">+198</option>
		    <option value="3">+701</option>
		</select>
    	<input name="" className="form-control" placeholder="Phone number" type="text"/>
    </div> 
    <div className="form-group input-group">
    	<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-building"></i> </span>
		</div>
		<select className="form-control">
			<option defaultValue=""> Select job type</option>
			<option>Designer</option>
			<option>Manager</option>
			<option>Accaunting</option>
		</select>
	</div>
    <div className="form-group input-group">
    	<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
		</div>
        <input className="form-control" placeholder="Create password" type="password" onChange={handleChange("password")} value={password}/>
    </div> 
    <div className="form-group input-group">
    	<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
		</div>
        <input className="form-control" placeholder="Repeat password" type="password" onChange={handleChange("password")} value={password}/>
    </div>                                  
    <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block" onClick={clickSubmit}> Create Account  </button>
    </div> 
    <p className="text-center">Have an account? <Link to="/signin" className="nav-Link">Log In</Link> </p>                                                                 
</form>
</article>
</div> 

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
            New account is created. Please <Link to="/signin">Login</Link>
        </div>
    );

    return (
        <div>
            {showSuccess()}
            {showError()}
            <br/>
            {signUpForm()}
        </div> 
    );
};

export default Signup;

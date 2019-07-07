import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (        
      <div className="card">
        <h5 className="card-header info-color white-text text-center py-4">
          <strong>Sign in</strong>z
        </h5>        
        <div className="card-body px-lg-5 pt-0">
         
          <form className="text-center" style={{color: '#757575'}}>
            
            <div className="md-form">
              <input type="email" id="materialLoginFormEmail" className="form-control" value={email} onChange={handleChange("email")}/>
              <label htmlFor="materialLoginFormEmail">E-mail</label>
            </div>
            
            <div className="md-form">
              <input type="password" id="materialLoginFormPassword" className="form-control" value={password} onChange={handleChange("password")}/>
              <label htmlFor="materialLoginFormPassword">Password</label>
            </div>
            <div className="d-flex justify-content-around">
              <div>
               
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="materialLoginFormRemember" />
                  <label className="form-check-label" htmlFor="materialLoginFormRemember">Remember me</label>
                </div>
              </div>
              <div>
               
                <a href>Forgot password?</a>
              </div>
            </div>
           
            <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit" onClick={clickSubmit}>Sign in</button>
            
            <p>Not a member?
              <a href>Register</a>
            </p>
            
            <p>or sign in with:</p>
            <a type="button" className="btn-floating btn-fb btn-sm">
              <i className="fab fa-facebook-f" />
            </a>
            <a type="button" className="btn-floating btn-tw btn-sm">
              <i className="fab fa-twitter" />
            </a>
            <a type="button" className="btn-floating btn-li btn-sm">
              <i className="fab fa-linkedin-in" />
            </a>
            <a type="button" className="btn-floating btn-git btn-sm">
              <i className="fab fa-github" />
            </a>
          </form>
          
        </div>
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

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <div>
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </div>
    );
};

export default Signin



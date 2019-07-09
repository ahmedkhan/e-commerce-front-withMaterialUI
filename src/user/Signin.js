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

  const signInForm = () => (
    <div>
    {!isAuthenticated()? (
      <div className="widget-header dropdown">
      <Link href="#" className="ml-3 icontext" data-toggle="dropdown" data-offset="20,10">
        <div className="icon-wrap icon-xs bg2 round text-primary"><i className="fa fa-user" /></div>
        <div className="text-wrap">
          <small>Hello.Guest</small>
          <span>Login<i className="fa fa-caret-down" /></span>
        </div>
       </Link>
      <div className="dropdown-menu dropdown-menu-right">
        <form className="px-4 py-3">
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="email@example.com"
              value={email} onChange={handleChange("email")} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password"
              value={password} onChange={handleChange("password")} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={clickSubmit}>Sign in</button>
        </form>        
        {showError()}
        {redirectUser()}
        <hr className="dropdown-divider" />
        <Link className="dropdown-item" to="/signup">Have account? Sign up</Link>
        <Link className="dropdown-item" to="/">Forgot password?</Link>
      </div>
    </div>
    ):(
      <div className="widget-header dropdown">
      <Link href="#" className="ml-3 icontext" data-toggle="dropdown" data-offset="20,10">
        <div className="icon-wrap icon-xs bg2 round text-primary"><i className="fa fa-user" /></div>
        <div className="text-wrap">
          <small>Hello.{user.name}</small>
          <span>{user.role === 1 ?("Dashboard"):("Profile")}<i className="fa fa-caret-down" /></span>
        </div>
       </Link>
      <div className="dropdown-menu dropdown-menu-right">
        <form className="px-4 py-3">
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="email@example.com"
              value={email} onChange={handleChange("email")} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password"
              value={password} onChange={handleChange("password")} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={clickSubmit}>Sign in</button>
        </form>        
        {showError()}
        {redirectUser()}
        <hr className="dropdown-divider" />
        <Link className="dropdown-item" to="/signup">Have account? Sign up</Link>
        <Link className="dropdown-item" to="/">Forgot password?</Link>
      </div>
    </div>)}
    
    </div>


  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
      role="alert"
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info" role="alert">
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
      {signInForm()}

    </div>
  );
};

export default Signin



import React, { Component, Fragment } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBFooter, MDBNavLink } from "mdbreact";
import { signout, isAuthenticated } from "../src/auth";
import { itemTotal } from "../src/core/cartHelpers";
import { withRouter } from "react-router-dom";
import Routes from "./Routes";
import Header from "./core/Header";

class App extends Component {

  state = {
    collapseID: ""
  }


  redirectToHome = () => {
    const { history } = this.props;

    if (history) { signout(() => { history.push('/') }) };
  }

  isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { backgroundColor: "#ff9900" };
    } else {
        return { backgroundColor: "#ffffff" };
    }
};
  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () =>
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });

  render() {
    const { history } = this.props;
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );

    const { collapseID } = this.state;

    return (
      <div className="flyout">
        <MDBNavbar color="indigo" dark expand="md" fixed="top" scrolling>
          <MDBNavbarBrand href="/">
            Shopping Hub.com
            </MDBNavbarBrand>


          <MDBNavbarToggler onClick={this.toggleCollapse("mainNavbarCollapse")} />
          <MDBCollapse
            id="mainNavbarCollapse"
            isOpen={this.state.collapseID}
            navbar
          >
            <MDBNavbarNav right>
              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <Fragment>
                  <MDBNavItem>
                    <MDBNavLink
                      exact
                      to="/"
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                       style={this.isActive(history,"/")}
                    >
                      Home
                  </MDBNavLink>
                  </MDBNavItem>

                  <MDBNavItem>
                    <MDBNavLink
                      exact
                      to="/"
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                    >
                      Cart
                  </MDBNavLink>
                  </MDBNavItem>


                  <MDBNavItem>
                    <MDBNavLink
                      exact
                      to="/"
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                    >
                      Dashboard
                  </MDBNavLink>
                  </MDBNavItem>
                </Fragment>
              )}

              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <Fragment>
                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                      to="/"
                    >
                      Home
                  </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                      to="/admin/dashboard"
                    >
                      Dashboard
                  </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                      to="/shop"
                    >
                      Shop
                  </MDBNavLink>
                  </MDBNavItem>
                </Fragment>
              )}

              {!isAuthenticated() && (
                <Fragment>
                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                      to="/"
                    >
                      Home
                  </MDBNavLink>
                  </MDBNavItem>

                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                      to="/sellersignup"
                    >
                      Become a seller
                  </MDBNavLink>
                  </MDBNavItem>

                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                      to="/customercare"
                    >
                      Customer Care
                  </MDBNavLink>
                  </MDBNavItem>

                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                      to="/signin"
                    >
                      Login
                  </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                      to="/signup"
                    >
                      SignUp
                  </MDBNavLink>
                  </MDBNavItem>
                </Fragment>
              )}

              {isAuthenticated() && (
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.redirectToHome}
                    to="/"
                  >
                    SignOut
                  </MDBNavLink>
                </MDBNavItem>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        
        {collapseID && overlay}


        <main style={{ marginTop: "4rem" }}>
         <Header/>
          <Routes />
        </main>


        <MDBFooter color="indigo">
          <p className="footer-copyright mb-0 py-3 text-center">
            &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
          </p>
        </MDBFooter>
      </div>

    );
  }
}


export default withRouter(App);

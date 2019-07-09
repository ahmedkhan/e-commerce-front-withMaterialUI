import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./core/Home";
import Signup from "../src/user/Signup"
import Signin from "../src/user/Signin";
import SearchedPage from "./core/SearchedPage";



class Routes extends React.Component {
  render() {
    return (    

      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/searchedpage" exact component={SearchedPage} />


          <Route
            render={function () {
              return <h1>Not Found</h1>;
            }}
          />
        </Switch>
      </BrowserRouter>
      
    );
  }
}

export default Routes;

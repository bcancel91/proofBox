import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./Pages/Home"
import Header from "./Header";
import DemoContainer from "./demo.body";
import SeneriosContainer from "./senerios.body";
import Login from "./Login";
import InfoContainer from "./info.body";
import StatsContainer from "./stats.body";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Login />
            <DemoContainer />
            <InfoContainer />
            <SeneriosContainer />
            <StatsContainer />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./Pages/Home";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <Router>
        <div>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/index" exact>
              <Index />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change

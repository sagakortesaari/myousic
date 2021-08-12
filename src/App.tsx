import React from "react";
import { HomePage } from "./pages/HomePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { StatsPage } from "./pages/StatsPage";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/stats">
            <StatsPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

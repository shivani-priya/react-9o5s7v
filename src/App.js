import React from "react";
import "./style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Details from "./routes/Details";
import Listing from "./routes/Listing";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Header />
      <div className="main-container">
        <Switch>
          <Route path="/details/:pokeId">
            <Details />
          </Route>
          <Route path="/listing">
            <Listing />
          </Route>
          <Route path="/">
            <div>
              <h1>HOME</h1>
            </div>
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

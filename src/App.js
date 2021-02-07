import React from "react";
import "./style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Details from "./routes/Details";
import Listing from "./routes/Listing";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  const randomId = Math.trunc(Math.random() * 1000 + 1);
  console.log(randomId);
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
              <p className="pokeoftheday">
                <b>Pokemon of the day:</b>
              </p>
              <img
                height="300px"
                width="300px"
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                  randomId +
                  ".png"
                }
              />
            </div>
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

import React, { useState, useEffect } from 'react';
import './style.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Details from './routes/Details';
import Listing from './routes/Listing';
import HomePage from './routes/HomePage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
const randomId = Math.trunc(Math.random() * 1000 + 1);
export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const cardDetails = document.getElementById('card-details');

  //
  //function fetchDetails() {
  fetch('https://pokeapi.co/api/v2/pokemon/' + randomId)
    .then(res => res.json())
    .then(result => {
      setPokemons(result);
      // console.log(pokemons);
      // setIsLoaded(true);
      // console.log(result.game_indices);
    });

  //useEffect(() => fetchDetails(), []);

  console.log(randomId);
  function myFunction(sender, eventArgs) {
    const img = document.getElementById('imag');
    cardDetails.style.opacity = 1;
    img.style.cssText =
      'box-shadow: 0 0 2px 1px rgb(0 0 0 / 50%); margin-left: 5px; width: 400px; background-color: rgba(85, 168, 85, 0.473);border-radius: 500px; position: relative; opacity: 100%;';
  }
  window.addEventListener('beforeunload', function(e) {
    e.preventDefault();
    e.returnValue = '';
  });
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
            <p className="pokeoftheday">
              <b> Click to below to see pokemon of the day:</b>
            </p>
            <div style={{ display: 'flex' }}>
              {/* <h1>HOME</h1> */}
              <br />

              <img
                className="image"
                id="imag"
                onClick={() => myFunction()}
                src={
                  'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' +
                  randomId +
                  '.png'
                }
              />
              {/* <div> */}
              {/* <article className="card">
              
                {
                  <img
                    className="card__img"
                    src={
                      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' +
                      randomId +
                      '.png'
                    }
                  />
                  
                <div class="country__data">
                  <h3 class="country__name">${data.name}</h3>
                  <h4 class="country__region">${data.region}</h4>
                  <p class="country__row">
                    <span>👫</span>${(+data.population / 1000000).toFixed(1)}
                  </p>
                  <p class="country__row">
                    <span>🗣️</span>${data.languages[0].name}
                  </p>
                  <p class="country__row">
                    <span>💰</span>${data.currencies[0].code}
                  </p>
                </div> 
                }
              </article> */}
              <article id="card-details" className="card">
                {/* {pokemons.name}||{pokemons.height}||{pokemons.weight} */}
                <div className="card__data">
                  <h3 className="card__name">Pokemon: {pokemons.name}</h3>
                  <h4 className="card__hw">Height: {pokemons.height}</h4>
                  <h4 className="card__hw">Weight: {pokemons.weight}</h4>
                  {/* <p class="country__row">
                    <span>👫</span>${(+data.population / 1000000).toFixed(1)}
                  </p>
                  <p class="country__row">
                    <span>🗣️</span>${data.languages[0].name}
                  </p>
                  <p class="country__row">
                    <span>💰</span>${data.currencies[0].code}
                  </p> */}
                </div>
              </article>
              {/* </div> */}
            </div>

            {/* <HomePage /> */}
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}
export { randomId };

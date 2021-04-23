import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import App, { randomId } from "./App";

const randomId2 = Math.trunc(Math.random() * 1000 + 1);
console.log(randomId2);
export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  function fetchDetails() {
    // axios.get("https://pokeapi.co/api/v2/pokemon/1").then(result => {
    //   console.log(result.data);
    // });
    fetch("https://pokeapi.co/api/v2/pokemon/" + randomId2)
      // configuration

      .then(response => response.json())
      .then(response => {
        // do something with data
        console.log(response.name);
        //console.log(randomId2);
        setPokemons([...pokemons, ...response.abilities]);
      });
  }
  
  return <div>Home Page Details</div>;
}

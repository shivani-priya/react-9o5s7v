import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import App, { randomId } from "./App";

export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  // axios.get("https://pokeapi.co/api/v2/pokemon/1").then(result => {
  //   console.log(result.data);
  // });
  fetch("https://pokeapi.co/api/v2/pokemon/1")
    // configuration

    .then(response => response.json())
    .then(response => {
      // do something with data
      console.log(response.name);
      // console.log(randomId);
      setPokemons([...pokemons, ...response.results]);
    });
  return <div>Home Page Details</div>;
}

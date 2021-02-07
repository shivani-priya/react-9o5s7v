import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

export default function Listing() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  function fetchPokemons(offset, limit = 20) {
    setIsLoaded(false);
    setPokemons([]);
    fetch(
      "https://pokeapi.co/api/v2/pokemon/?limit=" + limit + "&offset=" + offset
    )
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setPokemons(result.results);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  function loadMore() {
    setOffset(offset + 20);
    fetchPokemons(offset, 20);
  }

  useEffect(() => {
    fetchPokemons(offset, 20);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="listing-container">
          {pokemons.map((pokemon, index) => (
            <Card
              className="listing-card"
              key={pokemon.url.slice(pokemon.url.indexOf("/pokemon/") + 9, -1)}
            >
              <CardContent>
                <Link
                  to={
                    "/details/" +
                    pokemon.url.slice(pokemon.url.indexOf("/pokemon/") + 9, -1)
                  }
                >
                  Id:{" "}
                  {pokemon.url.slice(pokemon.url.indexOf("/pokemon/") + 9, -1)}
                  <br />
                  Name: {pokemon.name}
                  <br />
                  <img
                    src={
                      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                      pokemon.url.slice(
                        pokemon.url.indexOf("/pokemon/") + 9,
                        -1
                      ) +
                      ".png"
                    }
                  />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <button onClick={() => loadMore()}>Load More</button>
      </>
    );
  }
}

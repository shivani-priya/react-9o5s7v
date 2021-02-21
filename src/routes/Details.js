import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default function Details() {
  const { pokeId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [details, setDetails] = useState({});
  const [index, setIndex] = useState(0);

  function transformResponse(response) {
    let pokeDetails = {};
    pokeDetails.name = response.name;
    pokeDetails.height = response.height;
    pokeDetails.weight = response.weight;
    let temp = [];
    response.abilities.forEach(ability => temp.push(ability.ability.name));
    pokeDetails.abilities = temp;
    temp = [];
    response.moves.forEach(move => temp.push(move.move.name));
    pokeDetails.moves = temp;
    temp = [];
    response.types.forEach(type => temp.push(type.type.name));
    pokeDetails.types = temp;
    temp = [];

    response.stats.forEach(stat =>
      temp.push({ base: stat.base_stat, name: stat.stat.name })
    );
    pokeDetails.stats = temp;
    temp = [];
    temp.push(
      response.sprites.front_default,
      response.sprites.back_default,
      response.sprites.front_shiny,
      response.sprites.back_shiny
    );
    pokeDetails.sprites = temp;
    //console.log(temp);
    return pokeDetails;
  }
  function fetchDetails() {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokeId)
      .then(res => res.json())
      .then(result => {
        setDetails(transformResponse(result));
        setIsLoaded(true);
        // console.log(result.game_indices);
      });
  }
  useEffect(() => {
    fetchDetails();
  }, []);
  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h1>Details</h1>

        <div className="pokemon-title-name">
          <b>
            {JSON.stringify(details.name)
              .replace(/['"]+/g, "")
              .charAt(0)
              .toUpperCase() + details.name.slice(1)}
          </b>
        </div>
        <img width="300px" height="300px" src={details.sprites[index]} />
        <br />
        {details.sprites.map((sprite, index) => (
          <img
            onClick={() => setIndex(index)}
            src={sprite}
            style={{ cursor: "pointer" }}
          />
        ))}

        <div className="poke-deatils1">
          <p>lorem100</p>
        </div>
        <h2>Loading details for Pokemon: {pokeId}</h2>
        <Card className="listing-Card">
          <CardContent>
            Height: {details.height}
            <br />
            Weight: {details.weight}
            <br />
            Abilities:{" "}
            {details.abilities.map((ability, index) => (
              <div>{ability}</div>
            ))}
            <br />
            Moves:{" "}
            {details.moves.map((move, index) => (
              <div>{move}</div>
            ))}
            <br />
            Types:{" "}
            {details.types.map((type, index) => (
              <div>{type}</div>
            ))}
            <br />
            Stats:{" "}
            <div>
              <table className="table" border="2px">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Base</th>
                  </tr>
                </thead>
                {details.stats.map((stat, index) => (
                  <tbody>
                    <tr>
                      <td>{stat.name}:</td>
                      <td>{stat.base}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}

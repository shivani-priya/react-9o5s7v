import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default function Details() {
  const { pokeId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [details, setDetails] = useState([]);
  function fetchDetails() {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokeId)
      .then(res => res.json())
      .then(result => {
        setIsLoaded(true);
        setDetails(result.game_indices);
        // console.log(result.game_indices);
      });
  }
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <>
      <h1>Details</h1>
      <div className="listing-container" />
      <img
        src={
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
          pokeId +
          ".png"
        }
      />
      <br />
      <h2>Loading details for Pokemon: {pokeId}</h2>
      <Card className="listing-Card">
        {details.map(details => (
          <CardContent key={details.game_indices}>
            Name: {details.version.name}
          </CardContent>
        ))}
      </Card>
    </>
  );
}

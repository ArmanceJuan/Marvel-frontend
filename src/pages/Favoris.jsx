import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Favoris = ({ handleToken, favoritesUser }) => {
  return (
    <div>
      <h1>FAVORIS</h1>
      <div>
        <h2>CHARACTERS FAVORIS</h2>
        <div>
          {JSON.parse(decodeURIComponent(favoritesUser)).map((character) => (
            <div key={character._id}>
              <Link to={`/character/${character._id}`}>
                <article>
                  <h2>{character.name}</h2>
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                    alt=""
                  />
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Favoris;

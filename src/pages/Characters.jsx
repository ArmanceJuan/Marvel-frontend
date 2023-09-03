// CSS
import "../assets/css/characters.css";
import "../assets/css/searchbar.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = ({ favoritesUser, handleFavoritesUser }) => {
  const [dataCharacters, setDataCharacters] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [staticDataCharacters, setStaticDataCharacters] = useState({});
  const [skipPage, setSkipPage] = useState(1);
  const charactersPage = 100;

  useEffect(() => {
    const fetchData = async () => {
      const skip = (skipPage - 1) * charactersPage;
      try {
        const response = await axios.get(
          `https://site--marvel--w4dbxbb5f42j.code.run/characters/${skip}`
        );
        setDataCharacters(response.data);
        setStaticDataCharacters(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [skipPage]);

  const handleSkipPage = (newPage) => {
    setSkipPage(newPage);
  };

  const handleSearchChange = (event) => {
    const dataCharactersCopy = { ...staticDataCharacters };
    dataCharactersCopy.results = staticDataCharacters.results.filter(
      (character) => {
        return (
          character.name.startsWith(event.target.value) ||
          event.target.value === ""
        );
      }
    );
    setDataCharacters(dataCharactersCopy);
  };
  console.log(favoritesUser);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <input
        type="text"
        onChange={handleSearchChange}
        className="searchbar"
        placeholder="Search"
      />
      <div>
        <div className="page-container">
          <div className="fixed-button">
            <div className="skip">
              <button onClick={() => handleSkipPage(skipPage - 1)}>
                <FontAwesomeIcon icon="caret-left" />
              </button>
            </div>
            <div className="skip">
              <button onClick={() => handleSkipPage(skipPage + 1)}>
                <FontAwesomeIcon icon="caret-right" />
              </button>
            </div>
          </div>
          <div className="container">
            {dataCharacters &&
              dataCharacters.results.map((character) => {
                // const characterIsNotFavorite = !favoritesUser[character._id];

                return (
                  <div key={character._id}>
                    <Link to={`/character/${character._id}`}>
                      <article className="characters-info">
                        <h2>{character.name}</h2>
                        <img
                          src={
                            character.thumbnail.path +
                            "." +
                            character.thumbnail.extension
                          }
                          alt=""
                        />
                        <p>{character.description}</p>
                        <button
                          onClick={() => {
                            if (characterIsNotFavorite) {
                              handleFavoritesUser(character);
                            }
                          }}
                        >
                          <FontAwesomeIcon icon="star" />
                        </button>
                      </article>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Characters;

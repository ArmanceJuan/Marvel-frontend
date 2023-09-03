// CSS
import "../assets/css/character.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Character = () => {
  const [dataCharacter, setDataCharacter] = useState({});
  const [isLoadingCharacter, setIsLoadingCharacter] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCharacter = await axios.get(
          "https://site--marvel--w4dbxbb5f42j.code.run/character/" + id
        );
        setDataCharacter(responseCharacter.data);
        setIsLoadingCharacter(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoadingCharacter ? (
    <p>Loading...</p>
  ) : (
    <div>
      <article className="character-article">
        <div className="character">
          <img
            src={
              dataCharacter.thumbnail.path +
              "." +
              dataCharacter.thumbnail.extension
            }
            alt=""
          />
        </div>
        <div>
          <h3>COMICS CHARACTER</h3>
          <div className="comics-character">
            {dataCharacter.comics.map((comic) => {
              console.log(comic);
              return (
                <div>
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
          <div>
            <h1>{dataCharacter.name}</h1>
            <p>{dataCharacter.description}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Character;

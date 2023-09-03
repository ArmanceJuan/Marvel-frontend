import "../assets/css/character.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comic = () => {
  const [dataComic, setDataComic] = useState({});
  const [isLoadingComic, setIsLoadingComics] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseComic = await axios.get(
          "https://site--marvel--w4dbxbb5f42j.code.run/comic/" + id
        );
        console.log(responseComic.data);
        setDataComic(responseComic.data);
        setIsLoadingComics(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoadingComic ? (
    <p>Loading...</p>
  ) : (
    <div>
      <article className="character-article">
        <div className="character">
          <img
            src={dataComic.thumbnail.path + "." + dataComic.thumbnail.extension}
            alt=""
          />
        </div>
        <div>
          <h1>{dataComic.title}</h1>
          <p>{dataComic.description}</p>
        </div>
      </article>
    </div>
  );
};

export default Comic;

// CSS
import "../assets/css/characters.css";
import "../assets/css/searchbar.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Comics = () => {
  const [dataComics, setDataComics] = useState({});
  const [isLoadingComics, setIsLoadingComics] = useState(true);
  const [staticDataComics, setStaticDataComics] = useState({});
  const [skipPage, setSkipPage] = useState(1);
  const comicsPage = 100;

  useEffect(() => {
    const fetchData = async () => {
      const skip = (skipPage - 1) * comicsPage;
      try {
        const responseComics = await axios.get(
          `https://site--marvel--w4dbxbb5f42j.code.run/comics/${skip}`
        );
        // const sortedDataComics = responseComics.data.results.sort((a, b) => {
        //   if (a.title < b.title) {
        //     return -1;
        //   } else {
        //     return 1;
        //   }
        // });
        setDataComics(responseComics.data);
        setStaticDataComics(responseComics.data);
        setIsLoadingComics(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [skipPage]);

  const handleSkipPage = (newPage) => {
    setSkipPage(newPage);
  };

  const handleSearchChange = (event) => {
    const dataComicsCopy = { ...staticDataComics };
    dataComicsCopy.results = staticDataComics.results.filter((comic) => {
      return (
        comic.name.startsWith(event.target.value) || event.target.value === ""
      );
    });
    setDataComics(dataComicsCopy);
  };

  return isLoadingComics ? (
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
            {dataComics &&
              dataComics.results.map((comic) => {
                return (
                  <div key={comic._id}>
                    <Link to={`/comic/${comic._id}`}>
                      <article className="characters-info">
                        <h2>{comic.title}</h2>
                        <img
                          src={
                            comic.thumbnail.path +
                            "." +
                            comic.thumbnail.extension
                          }
                          alt=""
                        />
                        <p>{comic.description}</p>
                        <button>
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

export default Comics;

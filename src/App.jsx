import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretLeft,
  faCaretRight,
  faStar,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
library.add(faCaretLeft, faCaretRight, faStar);

// PAGES & COMPONENTS
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Character from "./pages/Character";
import Comic from "./pages/Comic";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favoris from "./pages/Favoris";

import Header from "./components/Header";

function App() {
  // User
  const [userToken, setUserToken] = useState(
    Cookies.get("userTokenMarvel") || null
  );

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userTokenMarvel", token, { expires: 14 });
      setUserToken(token);
    } else {
      Cookies.remove("userTokenMarvel");
      setUserToken(null);
    }
  };

  // Cookies Favoris
  const [favoritesUser, setFavoritesUser] = useState(
    Cookies.get("favoritesUser") ?? "[]"
  );

  const handleFavoritesUser = (character) => {
    const addFavorites = [...JSON.parse(decodeURIComponent(favoritesUser))];
    addFavorites.push({ [character._id]: character });
    setFavoritesUser(addFavorites);
  };

  useEffect(() => {
    if (favoritesUser) {
      Cookies.set("favoritesUser", JSON.stringify(favoritesUser), {
        expires: 100,
      });
    }
  }, [favoritesUser]);

  return (
    <Router>
      <Header handleToken={handleToken} userToken={userToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/characters/:page"
          element={
            <Characters
              handleToken={handleToken}
              favoritesUser={favoritesUser}
              handleFavoritesUser={handleFavoritesUser}
            />
          }
        />
        <Route
          path="/comics/:page"
          element={<Comics handleToken={handleToken} />}
        />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/comic/:id" element={<Comic />} />
        <Route
          path="/favoris"
          element={
            <Favoris handleToken={handleToken} favoritesUser={favoritesUser} />
          }
        />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
      </Routes>
    </Router>
  );
}

export default App;

import "../assets/css/home.css";

import { Link } from "react-router-dom";

const Home = ({ handleToken }) => {
  return (
    <div className="home-background">
      <div className="home">
        <Link to="/characters/1">
          <h1>CHARACTERS</h1>
        </Link>
        <Link>
          <h1 to="/comics/1">COMICS</h1>
        </Link>
      </div>
    </div>
  );
};
export default Home;

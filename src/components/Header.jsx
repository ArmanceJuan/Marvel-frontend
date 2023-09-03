// CSS
import "../assets/css/header.css";
import logo from "../assets/img/logo.png";

//
import { Link } from "react-router-dom";

const Header = ({ handleToken, userToken }) => {
  return (
    <div>
      <header>
        <div className="container">
          <Link to="/characters/1">
            <button>CHARACTERS</button>
          </Link>
          <Link to="/comics/1">
            <button>COMICS</button>
          </Link>
          <Link to="/">
            <img src={logo} alt="marvel logo" />
          </Link>
          {!userToken ? (
            <>
              <Link to="/signup">
                <button>SIGNUP</button>
              </Link>
              <Link to="/login">
                <button>LOGIN</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/favoris">
                <button>FAVORIS</button>
              </Link>
              <button
                onClick={() => {
                  handleToken();
                }}
              >
                DECONNEXION
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;

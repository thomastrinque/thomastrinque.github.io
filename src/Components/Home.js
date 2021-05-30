import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "../Assets/Sass/main.scss";
import "semantic-ui-css/semantic.min.css";
import Tables from "../Components/Tables";

const Home = () => {
  return (
      <Router>
        <div className="App">
            <h1>Welcome to Bet App</h1>
        <ul>
            <li>
                <Link to="/">Home Page</Link>
            </li>
            <li>
                <Link to="/bet">Bet Page</Link>
            </li>
            </ul>
            <Route exact path="/" component={Home} />
            <Route path="/bet" component={Tables} />
        <h1>Bet App</h1>
        </div>
    </Router>
  );
}

export default Home;

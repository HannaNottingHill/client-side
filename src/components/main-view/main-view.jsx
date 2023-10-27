import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }

    if (!token) {
      return;
    }

    fetch("http://localhost:8080/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

  /*if (!user) {
    return (
      <Row className="justify-content-md-center">
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      </Row>
    );
  }
*/
  if (selectedMovie) {
    console.log(selectedMovie);
    const similarMovies = movies.filter(
      (movie) =>
        movie.genre === selectedMovie.genre && movie.id !== selectedMovie.id
    );

    return (
      <Row>
        <Col md={8} style={{ border: "1px solid black" }}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
        <h2>Similar Movies: </h2>
        <div>
          {similarMovies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={(selectedMovie) => setSelectedMovie(selectedMovie)}
              />
            </Col>
          ))}
        </div>
        <div>
          <button
            onClick={() => {
              setUser(null);
              setToken(null);
            }}
          >
            Logout
          </button>
        </div>
      </Row>
    );
  }

  /*if (movies.length === 0) {
    return <Row className="justify-content-md-center">The list is empty</Row>;
  }
*/
  return (
    <Row className="justify-content-md-center">
      {movies.map((movie) => (
        <Col className="mb-5" key={movie.id} md={3}>
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={(selectedMovie) => setSelectedMovie(selectedMovie)}
          />
        </Col>
      ))}
    </Row>
  );
};

MainView.propTypes = {
  selectedMovie: PropTypes.object.isRequired,
};

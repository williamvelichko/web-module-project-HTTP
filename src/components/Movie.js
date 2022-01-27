import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import axios from "axios";

import DeleteMovieModal from "./DeleteMovieModal";

const Movie = (props) => {
  const { addToFavorites, deleteMovie } = props;

  const [movie, setMovie] = useState("");

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:9000/api/movies/${id}`).then((resp) => {
      deleteMovie(resp.data);
      push("/movies");
    });
    //  deleteMovie(resp.data);
  };

  const handleAddFavorite = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:9000/api/movies/${id}`)
      .then((resp) => {
        //console.log(resp);
        addToFavorites(resp.data);
        push("/movies");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="modal-page col">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{movie.title} Details</h4>
          </div>
          <div className="modal-body">
            <div className="flexContainer">
              <section className="movie-details">
                <div>
                  <label>
                    Title: <strong>{movie.title}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Director: <strong>{movie.director}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Genre: <strong>{movie.genre}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Metascore: <strong>{movie.metascore}</strong>
                  </label>
                </div>
                <div>
                  <label>Description:</label>
                  <p>
                    <strong>{movie.description}</strong>
                  </p>
                </div>
              </section>

              <section>
                <span onClick={handleAddFavorite} className="m-2 btn btn-dark">
                  Favorite
                </span>
                <Link
                  to={`/movies/edit/${movie.id}`}
                  className="m-2 btn btn-success"
                >
                  Edit
                </Link>
                <Link to={`/movies/edit/deletemovie/${id}`}>
                  <span className="delete">
                    <input
                      type="button"
                      className="m-2 btn btn-danger"
                      value="Delete"
                      //onClick={<DeleteMovieModal />}
                    />
                  </span>
                </Link>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;

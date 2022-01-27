import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const DeleteMovieModal = (props) => {
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

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:9000/api/movies/${id}`).then((resp) => {
      props.deleteMovie(resp.data);
      push("/movies");
    });
  };

  const handleCancel = () => {
    //console.log("cancleing");
    push(`/movies/${id}`);
  };

  return (
    <div id="deleteEmployeeModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <h4 className="modal-title">
                Delete <strong>"{movie.title}"</strong>
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete these Records?</p>
              <p className="text-warning">
                <small>This action cannot be undone.</small>
              </p>
            </div>
            <div className="modal-footer">
              <input
                onClick={handleCancel}
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                value="Cancel"
              />
              <input
                onClick={handleDelete}
                type="submit"
                className="btn btn-danger"
                value="Delete"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteMovieModal;

import { Link } from "react-router-dom";

function MovieTable({
    movies,
    onDelete
}) {

    return (

        <div className="admin-table-card">

            <div className="admin-table-header">

                <div>

                    <h2 className="admin-table-title">

                        🎬 Movie Library

                    </h2>

                    <p className="admin-table-subtitle">

                        Manage all available movies.

                    </p>

                </div>

                <div className="admin-count-pill">

                    {movies.length} Movies

                </div>

            </div>

            <div className="admin-table-wrapper">

                <table className="admin-table">

                    <thead>

                        <tr>

                            <th>Poster</th>

                            <th>Movie</th>

                            <th>Genre</th>

                            <th>Language</th>

                            <th>Duration</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            movies.map(movie => (

                                <tr key={movie.id}>

                                    <td>

                                        <img
                                            src={
                                                movie.posterUrl ||
                                                "https://placehold.co/120x180?text=Movie"
                                            }
                                            alt={movie.title}
                                            className="movie-table-poster"
                                        />

                                    </td>

                                    <td>

                                        <h3 className="movie-name">

                                            {movie.title}

                                        </h3>

                                        <p className="movie-id">

                                            ID #{movie.id}

                                        </p>

                                    </td>

                                    <td>

                                        <span className="movie-badge">

                                            {movie.genre}

                                        </span>

                                    </td>

                                    <td>

                                        {movie.language}

                                    </td>

                                    <td>

                                        {movie.duration} mins

                                    </td>

                                    <td>

                                        <div className="movie-action-buttons">

                                            <Link
                                                to={`/admin/edit/${movie.id}`}
                                                className="movie-edit-btn"
                                            >

                                                Edit

                                            </Link>

                                            <button
                                                onClick={() => onDelete(movie.id)}
                                                className="movie-delete-btn"
                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default MovieTable;
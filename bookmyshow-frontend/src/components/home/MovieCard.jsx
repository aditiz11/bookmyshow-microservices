import { Link } from "react-router-dom";

function MovieCard({ movie }) {

    return (

        <Link
            to={`/movies/${movie.id}`}
            className="movie-card-link"
        >

            <div className="movie-card">

                <div className="movie-card-image-wrapper">

                    <img
                        src={
                            movie.posterUrl ||
                            "https://placehold.co/400x600?text=No+Poster"
                        }
                        alt={movie.title}
                        className="movie-card-image"
                    />

                </div>

                <div className="movie-card-content">

                    <h2 className="movie-card-title">

                        {movie.title}

                    </h2>

                    <p className="movie-card-genre">

                        {movie.genre}

                    </p>

                    <div className="movie-card-info">

                        <span>
                            {movie.language}
                        </span>

                        <span>
                            {movie.duration} mins
                        </span>

                    </div>

                </div>

            </div>

        </Link>

    );

}

export default MovieCard;
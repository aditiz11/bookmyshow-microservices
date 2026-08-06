import { useNavigate } from "react-router-dom";

import MovieForm from "../components/admin/MovieForm";
import { createMovie } from "../api/movieApi";

function AddMovie() {

    const navigate = useNavigate();

    const handleCreate = async (movie) => {

        try {

            await createMovie(movie);

            navigate("/admin/movies");

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-5xl font-black">
                    Add Movie 🎬
                </h1>

                <p className="text-gray-400 mt-2">
                    Add a new movie to your cinema collection
                </p>

            </div>


            <MovieForm
                onSubmit={handleCreate}
                buttonText="Add Movie"
            />

        </div>

    );

}

export default AddMovie;
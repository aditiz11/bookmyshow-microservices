import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MovieForm from "../components/admin/MovieForm";

import {
    getMovieById,
    updateMovie
} from "../api/movieApi";


function EditMovie() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);



    useEffect(() => {

        loadMovie();

    }, []);



    const loadMovie = async () => {

        try {

            const data = await getMovieById(id);

            setMovie(data);

        } catch (err) {

            console.error(err);

        }

    };



    const handleUpdate = async (updatedMovie) => {

        try {

            await updateMovie(id, updatedMovie);

            navigate("/admin/movies");

        } catch (err) {

            console.error(err);

        }

    };



    if (!movie) {

        return (

            <div
                className="
                    min-h-[60vh]
                    flex
                    items-center
                    justify-center
                "
            >

                <div
                    className="
                        bg-[#18181b]
                        border
                        border-gray-800
                        rounded-2xl
                        px-8
                        py-6
                        shadow-xl
                    "
                >

                    Loading movie details...

                </div>

            </div>

        );

    }



    return (

        <div className="space-y-8">


            <div>

                <h1 className="text-5xl font-black">
                    Edit Movie ✏️
                </h1>

                <p className="text-gray-400 mt-2">
                    Update movie information and poster
                </p>

            </div>



            <MovieForm

                initialData={movie}

                onSubmit={handleUpdate}

                buttonText="Update Movie"

            />


        </div>

    );

}


export default EditMovie;
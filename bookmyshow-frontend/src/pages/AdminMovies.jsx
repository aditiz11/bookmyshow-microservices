import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllMovies, deleteMovie } from "../api/movieApi";

import MovieTable from "../components/admin/MovieTable";


function AdminMovies() {

    const [movies, setMovies] = useState([]);


    useEffect(() => {

        loadMovies();

    }, []);



    const loadMovies = async () => {

        try {

            const data = await getAllMovies();

            setMovies(data);

        } catch (err) {

            console.error(err);

        }

    };



    const handleDelete = async (id) => {


        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this movie?"
            );


        if (!confirmDelete)
            return;



        try {

            await deleteMovie(id);

            loadMovies();

        } catch(err) {

            console.error(err);

        }

    };



    return (

        <div className="space-y-8">


            {/* Header */}

            <div
                className="
                    flex
                    justify-between
                    items-center
                    flex-wrap
                    gap-4
                "
            >

                <div>

                    <h1
                        className="
                            text-5xl
                            font-black
                        "
                    >
                        Movies
                    </h1>


                    <p
                        className="
                            text-gray-400
                            mt-2
                        "
                    >
                        Manage your movie collection
                    </p>


                </div>



                <Link
                    to="/admin/add-movie"
                    className="
                        bg-red-600
                        hover:bg-red-700
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                        shadow-lg
                        shadow-red-600/30
                        transition
                    "
                >

                    + Add Movie

                </Link>


            </div>





            {/* Table Container */}

            <div
                className="
                    bg-[#18181b]
                    border
                    border-gray-800
                    rounded-2xl
                    overflow-hidden
                    shadow-xl
                "
            >

                <MovieTable
                    movies={movies}
                    onDelete={handleDelete}
                />


            </div>


        </div>

    );

}


export default AdminMovies;
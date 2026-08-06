import { useEffect,useState } from "react";

import { getAllMovies } from "../api/movieApi";

import MovieCard from "../components/home/MovieCard";

function Movies(){

    const [movies,setMovies]=useState([]);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        loadMovies();

    },[]);

    const loadMovies=async()=>{

        try{

            const data=await getAllMovies();

            setMovies(data);

        }
        catch(error){

            console.error(error);

        }
        finally{

            setLoading(false);

        }

    };

    if(loading){

        return(

            <div className="loading-page">

                Loading Movies...

            </div>

        );

    }

    return(

        <div className="movies-page">

            <div className="movies-header">

                <h1 className="movies-title">

                    Now Showing

                </h1>

                <p className="movies-subtitle">

                    Experience the latest blockbusters on the big screen.

                </p>

            </div>

            <div className="movies-grid">

                {

                    movies.map(movie=>(

                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />

                    ))

                }

            </div>

        </div>

    );

}

export default Movies;
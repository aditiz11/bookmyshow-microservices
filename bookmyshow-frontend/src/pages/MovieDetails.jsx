import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieById } from "../api/movieApi";

import MovieHero from "../components/movie/MovieHero";
import MovieInfo from "../components/movie/MovieInfo";
import BookButton from "../components/movie/BookButton";

function MovieDetails() {

    const { id } = useParams();

    const [movie,setMovie] = useState(null);

    const [loading,setLoading] = useState(true);

    useEffect(()=>{

        loadMovie();

    },[id]);


    async function loadMovie(){

        try{

            const data = await getMovieById(id);

            setMovie(data);

        }
        catch(error){

            console.error(error);

        }
        finally{

            setLoading(false);

        }

    }


    if(loading){

        return(

            <div className="loading-page">

                Loading Movie...

            </div>

        );

    }


    if(!movie){

        return(

            <div className="empty-page">

                Movie Not Found

            </div>

        );

    }


    return(

        <div className="movie-details-page">

            <MovieHero movie={movie}/>

            <div className="movie-details-wrapper">

                <div className="movie-info-card">

                    <MovieInfo movie={movie}/>

                    <div className="book-button-wrapper">

                        <BookButton movieId={movie.id}/>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default MovieDetails;
import { useEffect, useState } from "react";
import HeroBanner from "../components/home/HeroBanner";
import MovieSection from "../components/home/MovieSection";
import { getAllMovies } from "../api/movieApi";

function Home() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        try {
            const data = await getAllMovies();
            setMovies(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center text-2xl font-semibold text-gray-300">
                Loading movies...
            </div>
        );
    }

    return (
        <div className="bg-[#09090b]">
            <HeroBanner movies={movies} />
            <MovieSection
                title="Recommended Movies"
                movies={movies}
            />
        </div>
    );

}

export default Home;
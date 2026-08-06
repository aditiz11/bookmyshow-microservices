function MovieInfo({ movie }) {

    return (

        <div className="glass rounded-3xl p-8">


            <h1 className="
                text-4xl
                font-black
            ">
                {movie.title}
            </h1>


            <div className="flex flex-wrap gap-4 mt-6">


                <span className="
                    bg-red-600/20
                    text-red-400
                    px-5
                    py-2
                    rounded-full
                ">
                    {movie.genre}
                </span>


                <span className="
                    bg-white/10
                    px-5
                    py-2
                    rounded-full
                ">
                    {movie.language}
                </span>


                <span className="
                    bg-white/10
                    px-5
                    py-2
                    rounded-full
                ">
                    {movie.duration} mins
                </span>


            </div>


            <p className="
                mt-8
                text-gray-300
                text-lg
                leading-relaxed
            ">
                {movie.description}
            </p>


        </div>

    );

}

export default MovieInfo;
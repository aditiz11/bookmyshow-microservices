function MovieHero({ movie }) {

    return (

        <section className="relative w-full h-[650px] overflow-hidden">


            <img
                src={
                    movie.posterUrl ||
                    "https://placehold.co/500x750?text=No+Poster"
                }
                alt={movie.title}
                className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                opacity-40
                "
            />


            <div className="
                absolute
                inset-0
                bg-gradient-to-r
                from-black
                via-black/70
                to-transparent
            "></div>



            <div className="
                relative
                h-full
                flex
                items-center
                px-10
            ">


                <div className="max-w-3xl">


                    <h1 className="
                        text-6xl
                        font-black
                        mb-6
                    ">
                        {movie.title}
                    </h1>


                    <p className="
                        text-gray-300
                        text-xl
                        leading-relaxed
                    ">
                        {movie.description}
                    </p>


                </div>


            </div>


        </section>

    );

}

export default MovieHero;
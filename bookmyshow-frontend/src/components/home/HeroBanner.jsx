import ReactSlick from "react-slick";

const Slider = ReactSlick.default ?? ReactSlick;

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeroBanner({ movies }) {

    const settings = {
        dots:true,
        infinite:true,
        autoplay:true,
        autoplaySpeed:3000,
        speed:700,
        slidesToShow:1,
        slidesToScroll:1,
        arrows:false
    };

    const bannerMovies = movies.slice(0,5);

    return (

        <div className="hero-banner">

            <Slider {...settings}>

                {
                    bannerMovies.map(movie => (

                        <div key={movie.id}>

                            <div className="hero-slide">

                                <img
                                    src={
                                        movie.posterUrl ||
                                        "https://placehold.co/1200x600?text=No+Poster"
                                    }
                                    alt={movie.title}
                                    className="hero-image"
                                />

                                <div className="hero-overlay"></div>

                                <div className="hero-content">

                                    <h1 className="hero-title">
                                        {movie.title}
                                    </h1>

                                    <p className="hero-details">

                                        {movie.language}
                                        {" • "}
                                        {movie.genre}
                                        {" • "}
                                        {movie.duration} mins

                                    </p>

                                </div>

                            </div>

                        </div>

                    ))
                }

            </Slider>

        </div>

    );

}

export default HeroBanner;
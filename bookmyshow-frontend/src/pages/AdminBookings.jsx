import { useEffect, useState } from "react";

import { getAllBookings } from "../api/bookingApi";
import { getAllMovies } from "../api/movieApi";

import BookingTable from "../components/admin/BookingTable";


function AdminBookings() {

    const [bookings, setBookings] = useState([]);



    useEffect(() => {

        loadBookings();

    }, []);




    const loadBookings = async () => {

        try {

            const [
                bookingsData,
                movies
            ] = await Promise.all([
                getAllBookings(),
                getAllMovies()
            ]);



            const movieMap = {};


            movies.forEach(movie => {

                movieMap[movie.id] = movie;

            });



            const updatedBookings =
                bookingsData.map(booking => ({

                    ...booking,

                    movie:
                        movieMap[booking.movieId]

                }));



            setBookings(updatedBookings);



        } catch(err) {

            console.error(err);

        }

    };




    return (

        <div className="space-y-8">


            <div>


                <h1
                    className="
                        text-5xl
                        font-black
                    "
                >

                    Bookings

                </h1>



                <p
                    className="
                        text-gray-400
                        mt-2
                    "
                >

                    Monitor customer movie tickets

                </p>


            </div>





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

                <BookingTable
                    bookings={bookings}
                />


            </div>



        </div>

    );

}


export default AdminBookings;
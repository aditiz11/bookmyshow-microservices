import { useEffect,useState } from "react";

import { getMyBookings } from "../api/bookingApi";
import { getMovieById } from "../api/movieApi";
import { getUserIdFromToken } from "../utils/jwt";
import { getPaymentByBookingId } from "../api/paymentApi";

import BookingCard from "../components/booking/BookingCard";

function MyBookings(){

    const [bookings,setBookings]=useState([]);

    const [loading,setLoading]=useState(true);


    useEffect(()=>{

        loadBookings();

    },[]);


    const loadBookings=async()=>{

        try{

            const bookingList = await getMyBookings();


            const bookingsWithMovies = await Promise.all(

                bookingList.map(async (booking) => {

                    const movie = await getMovieById(
                        booking.movieId
                    );

                    const payment =
                        await getPaymentByBookingId(
                            booking.id
                        );

                    return {
                        ...booking,
                        movie,
                        payment
                    };

                })

            );


            setBookings(bookingsWithMovies);

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

            <div className="my-bookings-loading">

                Loading Bookings...

            </div>

        );

    }


    return(

        <div className="my-bookings-page">

            <div className="my-bookings-wrapper">

                <h1 className="my-bookings-heading">

                    🎟 My Bookings

                </h1>


                {
                    bookings.length===0 ? (

                        <div className="my-bookings-empty">

                            <h2>
                                No Bookings Yet
                            </h2>

                            <p>
                                Your booked movies will appear here.
                            </p>

                        </div>

                    ):(

                        <div className="my-bookings-list">

                            {
                                bookings.map(booking=>(

                                    <BookingCard
                                        key={booking.id}
                                        booking={booking}
                                        onCancel={loadBookings}
                                    />

                                ))
                            }

                        </div>

                    )
                }

            </div>

        </div>

    );

}

export default MyBookings;
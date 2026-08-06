import { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

import { getMovieById } from "../api/movieApi";
import { createBooking,getBooking,getAllBookings } from "../api/bookingApi";

import BookingHeader from "../components/booking/BookingHeader";
import BookingTimer from "../components/booking/BookingTimer";
import Screen from "../components/booking/Screen";
import SeatGrid from "../components/booking/SeatGrid";
import SeatLegend from "../components/booking/SeatLegend";
import SeatTypeLegend from "../components/booking/SeatTypeLegend";
import PriceCard from "../components/booking/PriceCard";
import BookingSummary from "../components/booking/BookingSummary";

function SelectSeats(){

    const { movieId } = useParams();

    const navigate = useNavigate();

    const [movie,setMovie] = useState(null);

    const [selectedSeats,setSelectedSeats] = useState([]);

    const [bookedSeats,setBookedSeats] = useState([]);

    useEffect(()=>{

        loadMovie();

        loadBookedSeats();

    },[]);


    async function loadMovie(){

        try{

            const data = await getMovieById(movieId);

            setMovie(data);

        }catch(error){

            console.error(error);

        }

    }


    async function loadBookedSeats(){

        try{

            const bookings = await getAllBookings();

            const booked = bookings
                .filter(
                    booking =>
                        booking.movieId === Number(movieId) &&
                        booking.status !== "CANCELLED"
                )
                .map(
                    booking =>
                        booking.seatNumber
                );


            setBookedSeats(booked);

        }catch(error){

            console.error(
                "Failed to load booked seats",
                error
            );

        }

    }


    function toggleSeat(seat){

        if(bookedSeats.includes(seat)){
            return;
        }


        if(selectedSeats.includes(seat)){

            setSelectedSeats(
                selectedSeats.filter(
                    s=>s!==seat
                )
            );

        }else{

            setSelectedSeats([
                ...selectedSeats,
                seat
            ]);

        }

    }


    async function handleBooking(){

        if(selectedSeats.length===0){

            alert(
                "Please select at least one seat."
            );

            return;

        }


        try{

            const bookings=[];


            for(const seat of selectedSeats){

                const response = await createBooking({
                    movieId: Number(movieId),
                    seatNumber: seat
                });


                await new Promise(
                    resolve=>setTimeout(resolve,1000)
                );


                const updatedBooking =
                    await getBooking(response.id);


                bookings.push(updatedBooking);

            }


            navigate(
                "/booking-success",
                {
                    state:{
                        movie,
                        bookings
                    }
                }
            );


        }catch(error){

            console.error(error);

            alert(
                "Booking failed"
            );

        }

    }


    if(!movie){

        return(
            <div className="loading-page">
                Loading...
            </div>
        );

    }


    return(

        <div className="booking-page">

            <BookingHeader movie={movie}/>

            <BookingTimer/>

            <div className="booking-layout">

                <div className="booking-seats-area">

                    <Screen/>

                    <SeatGrid
                        selectedSeats={selectedSeats}
                        bookedSeats={bookedSeats}
                        toggleSeat={toggleSeat}
                    />

                    <SeatLegend/>

                    <SeatTypeLegend/>

                </div>


                <div className="booking-sidebar">

                    <PriceCard
                        selectedSeats={selectedSeats}
                    />

                    <BookingSummary
                        selectedSeats={selectedSeats}
                        onBook={handleBooking}
                    />

                </div>

            </div>

        </div>

    );

}

export default SelectSeats;
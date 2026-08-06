import { Link,useLocation } from "react-router-dom";
import SuccessAnimation from "../components/booking/SuccessAnimation";
import TicketCard from "../components/booking/TicketCard";

function BookingSuccess(){

    const {state}=useLocation();

    const bookings=state?.bookings;

    if(!bookings||bookings.length===0){

        return(

            <div className="booking-success-page">

                <div className="booking-empty-card">

                    <h1>
                        No Booking Found
                    </h1>

                    <Link
                        to="/movies"
                        className="success-primary-button"
                    >
                        Browse Movies
                    </Link>

                </div>

            </div>

        );

    }

    return(

        <div className="booking-success-page">

            <div className="booking-success-container">

                <SuccessAnimation/>

                <h1 className="success-title">
                    Booking Successful 🎉
                </h1>

                <p className="success-subtitle">
                    Your movie tickets have been confirmed. Enjoy your show!
                </p>

                <div className="ticket-list">

                    {bookings.map(booking=>(

                        <TicketCard
                            key={booking.id}
                            booking={booking}
                        />

                    ))}

                </div>

                <div className="success-actions">

                    <Link
                        to="/movies"
                        className="success-primary-button"
                    >
                        Book Another Movie
                    </Link>

                    <Link
                        to="/my-bookings"
                        className="success-secondary-button"
                    >
                        My Bookings
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default BookingSuccess;
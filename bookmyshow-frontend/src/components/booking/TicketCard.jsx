import { getSeatPrice } from "../../utils/seatPricing";

function TicketCard({

    booking

}) {


    return (

        <div className="ticket-card">


            <div className="ticket-header">


                <div>

                    <h2>

                        {booking.movieTitle}

                    </h2>


                    <p>

                        Booking Confirmed

                    </p>


                </div>


                <div className="ticket-brand">

                    BookMyShow

                </div>


            </div>



            <div className="ticket-details">


                <div>

                    <p>
                        Booking ID
                    </p>

                    <h3>
                        #{booking.id}
                    </h3>

                </div>


                <div>

                    <p>
                        Seat
                    </p>

                    <h3>
                        {booking.seatNumber}
                    </h3>

                </div>


                <div>

                    <p>
                        Status
                    </p>


                    <span className="ticket-status">

                        {booking.status}

                    </span>


                </div>


                <div>

                    <p>
                        Amount
                    </p>

                    <h3>

                        ₹{getSeatPrice(booking.seatNumber)}

                    </h3>

                </div>


            </div>


        </div>

    );

}

export default TicketCard;
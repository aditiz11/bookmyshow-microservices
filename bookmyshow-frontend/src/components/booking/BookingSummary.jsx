function BookingSummary({

    selectedSeats,
    onBook

}) {


    return (

        <div className="booking-summary-card">

            <h2 className="booking-card-title">

                Selected Seats

            </h2>


            <div className="selected-seat-box">

                {
                    selectedSeats.length === 0

                    ?

                    (

                        <span>

                            No seats selected

                        </span>

                    )

                    :

                    (

                        <span className="selected-seat-text">

                            {selectedSeats.join(", ")}

                        </span>

                    )

                }

            </div>


            <button

                disabled={
                    selectedSeats.length === 0
                }

                onClick={onBook}

                className="booking-pay-button"

            >

                Proceed To Pay

            </button>


        </div>

    );

}

export default BookingSummary;
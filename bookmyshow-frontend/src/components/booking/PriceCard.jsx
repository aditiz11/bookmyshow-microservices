import { getSeatPrice } from "../../utils/seatPricing";

function PriceCard({ selectedSeats }) {

    const total = selectedSeats.reduce(
        (sum, seat) =>
            sum + getSeatPrice(seat),
        0
    );


    return (

        <div className="booking-price-card">

            <h2 className="booking-card-title">

                Price Details

            </h2>


            {
                selectedSeats.length === 0 ? (

                    <p className="booking-empty-text">

                        Select seats to see price

                    </p>

                ) : (

                    <div className="price-list">

                        {
                            selectedSeats.map(seat => (

                                <div
                                    key={seat}
                                    className="price-item"
                                >

                                    <span>
                                        {seat}
                                    </span>


                                    <span>
                                        ₹{getSeatPrice(seat)}
                                    </span>

                                </div>

                            ))
                        }


                        <div className="price-divider"></div>


                        <div className="price-total">

                            <span>
                                Total
                            </span>

                            <span>
                                ₹{total}
                            </span>

                        </div>


                    </div>

                )
            }


        </div>

    );

}

export default PriceCard;
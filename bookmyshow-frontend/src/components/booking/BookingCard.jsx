import { cancelBooking } from "../../api/bookingApi";
import { getSeatPrice } from "../../utils/seatPricing";

function BookingCard({ booking, onCancel }) {

    const statusClass = {
        CONFIRMED: "booking-status-confirmed",
        PENDING: "booking-status-pending",
        CANCELLED: "booking-status-cancelled"
    };

    async function handleCancel() {

        if (!window.confirm("Cancel this booking?")) {
            return;
        }

        try {

            await cancelBooking(booking.id);

            alert("Booking cancelled successfully.");

            onCancel();

        } catch (error) {

            console.error(error);

            alert("Unable to cancel booking.");

        }

    }

    return (

        <div className="movie-booking-card">

            <div className="movie-booking-main">

                <img
                    src={
                        booking.movie.posterUrl ||
                        "https://placehold.co/300x450?text=Movie"
                    }
                    alt={booking.movie.title}
                    className="booking-movie-poster"
                />

                <div className="booking-movie-details">

                    <h2>{booking.movie.title}</h2>

                    <p>{booking.movie.language}</p>

                    <p>{booking.movie.genre}</p>

                    <p className="booking-id">
                        Booking #{booking.id}
                    </p>

                </div>

                <span
                    className={`booking-status ${statusClass[booking.status]}`}
                >
                    {booking.status}
                </span>

            </div>

            <div className="booking-information">

                <div>
                    <span>Seat</span>
                    <strong>{booking.seatNumber}</strong>
                </div>

                <div>
                    <span>Amount</span>
                    <strong>₹{getSeatPrice(booking.seatNumber)}</strong>
                </div>

                <div>
                    <span>Booking ID</span>
                    <strong>#{booking.id}</strong>
                </div>

            </div>

            <div className="booking-footer">

                <div className="payment-section">

                    <span className="payment-label">
                        Payment Status
                    </span>

                    <span
                        className={`booking-status ${
                            booking.payment?.status === "COMPLETED"
                                ? "booking-status-confirmed"
                                : booking.payment?.status === "REFUNDED"
                                ? "booking-status-cancelled"
                                : "booking-status-pending"
                        }`}
                    >
                        {booking.payment?.status || "PENDING"}
                    </span>

                </div>

                {
                    booking.status !== "CANCELLED" && (

                        <button
                            onClick={handleCancel}
                            className="cancel-booking-btn"
                        >

                            Cancel Booking

                        </button>

                    )
                }

            </div>

        </div>

    );

}

export default BookingCard;
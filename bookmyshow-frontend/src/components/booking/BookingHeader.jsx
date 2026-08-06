import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";

function BookingHeader({ movie }) {

    return (

        <div className="booking-header-card">

            <h1 className="booking-header-title">

                {movie.title}

            </h1>


            <div className="booking-header-details">

                <div className="booking-detail-item">

                    <FaMapMarkerAlt/>

                    <span>
                        PVR Cinemas • Mumbai
                    </span>

                </div>


                <div className="booking-detail-item">

                    <MdAccessTimeFilled/>

                    <span>
                        Today • 7:30 PM
                    </span>

                </div>


                <div className="booking-detail-item">

                    {movie.genre}

                </div>

            </div>

        </div>

    );

}

export default BookingHeader;
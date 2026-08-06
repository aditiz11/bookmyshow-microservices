import { useNavigate } from "react-router-dom";

function BookButton({ movieId }) {

    const navigate = useNavigate();

    return (

        <button
            onClick={() => navigate(`/select-seats/${movieId}`)}
            className="book-ticket-button"
        >

            🎟 Book Tickets

        </button>

    );

}

export default BookButton;
function Seat({

    seat,
    selected,
    booked,
    premium,
    executive,
    onClick

}) {


    let seatClass = "seat-button";


    if(booked) {

        seatClass += " seat-booked";

    }
    else if(selected) {

        seatClass += " seat-selected";

    }
    else if(premium) {

        seatClass += " seat-premium";

    }
    else if(executive) {

        seatClass += " seat-executive";

    }
    else {

        seatClass += " seat-regular";

    }


    return (

        <button

            disabled={booked}

            onClick={onClick}

            className={seatClass}

        >

            {seat.substring(1)}

        </button>

    );

}

export default Seat;
import Seat from "./Seat";

function SeatRow({

    row,
    selectedSeats,
    bookedSeats,
    toggleSeat

}) {


    const letter = row[0][0];


    const premium =
        ["A","B","C"].includes(letter);


    const executive =
        ["D","E","F","G"].includes(letter);


    return (

        <div className="seat-row">


            <div className="seat-row-label">

                {letter}

            </div>


            <div className="seat-block">

                {
                    row.slice(0,3)
                    .map(seat => (

                        <Seat

                            key={seat}

                            seat={seat}

                            selected={
                                selectedSeats.includes(seat)
                            }

                            booked={
                                bookedSeats.includes(seat)
                            }

                            premium={premium}

                            executive={executive}

                            onClick={() =>
                                toggleSeat(seat)
                            }

                        />

                    ))
                }

            </div>



            <div className="seat-gap"></div>



            <div className="seat-block">

                {
                    row.slice(3,5)
                    .map(seat => (

                        <Seat

                            key={seat}

                            seat={seat}

                            selected={
                                selectedSeats.includes(seat)
                            }

                            booked={
                                bookedSeats.includes(seat)
                            }

                            premium={premium}

                            executive={executive}

                            onClick={() =>
                                toggleSeat(seat)
                            }

                        />

                    ))
                }

            </div>



            <div className="seat-gap"></div>



            <div className="seat-block">

                {
                    row.slice(5)
                    .map(seat => (

                        <Seat

                            key={seat}

                            seat={seat}

                            selected={
                                selectedSeats.includes(seat)
                            }

                            booked={
                                bookedSeats.includes(seat)
                            }

                            premium={premium}

                            executive={executive}

                            onClick={() =>
                                toggleSeat(seat)
                            }

                        />

                    ))
                }

            </div>



            <div className="seat-row-label">

                {letter}

            </div>


        </div>

    );

}

export default SeatRow;
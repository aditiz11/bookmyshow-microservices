import SeatRow from "./SeatRow";

function SeatGrid({
    selectedSeats,
    bookedSeats,
    toggleSeat
}) {

    const createRow = (letter) =>

        Array.from(
            {length:12},
            (_,i)=>`${letter}${i+1}`
        );


    const rows = [

        createRow("A"),
        createRow("B"),
        createRow("C"),
        createRow("D"),
        createRow("E"),
        createRow("F"),
        createRow("G"),
        createRow("H"),
        createRow("I"),
        createRow("J")

    ];


    return (

        <div className="seat-grid">

            {
                rows.map(row => (

                    <SeatRow

                        key={row[0]}

                        row={row}

                        selectedSeats={selectedSeats}

                        bookedSeats={bookedSeats}

                        toggleSeat={toggleSeat}

                    />

                ))
            }

        </div>

    );

}

export default SeatGrid;
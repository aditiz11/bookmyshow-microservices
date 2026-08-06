function SeatTypeLegend() {

    return (

        <div className="seat-type-container">


            <div className="seat-type-card premium-card">

                <h3>
                    Premium
                </h3>

                <p>
                    Rows A-C
                </p>

                <strong>
                    ₹350
                </strong>

            </div>



            <div className="seat-type-card executive-card">

                <h3>
                    Executive
                </h3>

                <p>
                    Rows D-G
                </p>

                <strong>
                    ₹250
                </strong>

            </div>



            <div className="seat-type-card regular-card">

                <h3>
                    Regular
                </h3>

                <p>
                    Rows H-J
                </p>

                <strong>
                    ₹180
                </strong>

            </div>


        </div>

    );

}

export default SeatTypeLegend;
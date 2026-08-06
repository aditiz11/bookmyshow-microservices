function SeatLegend() {

    return (

        <div className="seat-legend-card">

            <h2 className="booking-card-title">

                Seat Information

            </h2>


            <div className="seat-legend-grid">


                <div className="legend-item">

                    <div className="legend-box legend-premium"></div>

                    <div>

                        <p>
                            Premium
                        </p>

                        <span>
                            ₹350
                        </span>

                    </div>

                </div>



                <div className="legend-item">

                    <div className="legend-box legend-executive"></div>

                    <div>

                        <p>
                            Executive
                        </p>

                        <span>
                            ₹250
                        </span>

                    </div>

                </div>



                <div className="legend-item">

                    <div className="legend-box legend-regular"></div>

                    <div>

                        <p>
                            Economy
                        </p>

                        <span>
                            ₹180
                        </span>

                    </div>

                </div>



                <div className="legend-item">

                    <div className="legend-box legend-booked"></div>

                    <div>

                        <p>
                            Booked
                        </p>

                        <span>
                            Unavailable
                        </span>

                    </div>

                </div>


            </div>


            <div className="legend-divider"></div>



            <div className="seat-state-list">


                <div>

                    <div className="state-box state-selected"></div>

                    <span>
                        Selected
                    </span>

                </div>


                <div>

                    <div className="state-box state-booked"></div>

                    <span>
                        Booked
                    </span>

                </div>


                <div>

                    <div className="state-box state-premium"></div>

                    <span>
                        Premium
                    </span>

                </div>


                <div>

                    <div className="state-box state-executive"></div>

                    <span>
                        Executive
                    </span>

                </div>


                <div>

                    <div className="state-box state-regular"></div>

                    <span>
                        Economy
                    </span>

                </div>


            </div>


        </div>

    );

}

export default SeatLegend;
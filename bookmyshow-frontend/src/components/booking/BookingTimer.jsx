import { useEffect, useState } from "react";

function BookingTimer() {

    const [seconds,setSeconds] = useState(300);


    useEffect(()=>{

        if(seconds <= 0) return;


        const timer = setInterval(()=>{

            setSeconds(
                prev => prev - 1
            );

        },1000);


        return ()=>clearInterval(timer);


    },[seconds]);


    const minutes =
        String(Math.floor(seconds / 60))
        .padStart(2,"0");


    const remaining =
        String(seconds % 60)
        .padStart(2,"0");


    return (

        <div className="booking-timer">

            <h2>

                Complete your booking in

            </h2>


            <p>

                {minutes}:{remaining}

            </p>

        </div>

    );

}

export default BookingTimer;
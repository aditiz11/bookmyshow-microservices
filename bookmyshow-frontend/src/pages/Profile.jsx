import { useEffect,useState } from "react";

import { getProfile } from "../api/userApi";

function Profile(){

    const [user,setUser]=useState(null);

    const [loading,setLoading]=useState(true);


    useEffect(()=>{

        loadProfile();

    },[]);



    const loadProfile=async()=>{

        try{

            const data=await getProfile();

            setUser(data);

        }
        catch(error){

            console.error(
                "Profile error:",
                error
            );

        }
        finally{

            setLoading(false);

        }

    };



    if(loading){

        return(

            <div className="profile-loading">

                Loading Profile...

            </div>

        );

    }



    if(!user){

        return(

            <div className="profile-loading">

                Unable to load profile

            </div>

        );

    }



    return(

        <div className="profile-page">


            <div className="profile-container">


                <div className="profile-avatar">

                    {
                        user.name
                        ?.charAt(0)
                        .toUpperCase()
                    }

                </div>



                <h1 className="profile-title">

                    {user.name}

                </h1>



                <p className="profile-subtitle">

                    Your BookMyShow account

                </p>



                <div className="profile-details">


                    <div className="profile-card">

                        <span>

                            Full Name

                        </span>

                        <h3>

                            {user.name}

                        </h3>

                    </div>



                    <div className="profile-card">

                        <span>

                            Email Address

                        </span>

                        <h3>

                            {user.email}

                        </h3>

                    </div>






                </div>


            </div>


        </div>

    );

}

export default Profile;
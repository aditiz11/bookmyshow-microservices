import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar(){

    const {
        isAuthenticated,
        role,
        logout
    } = useAuth();

    const navigate = useNavigate();

    const navClass=({isActive}) =>
        isActive
        ? "navbar-link navbar-link-active"
        : "navbar-link";

    const handleLogout=()=>{

        logout();

        navigate("/");

    };

    return(

        <nav className="navbar">

            <div className="navbar-container">

                <Link
                    to="/"
                    className="navbar-logo"
                >
                    🎬 BookMyShow
                </Link>

                <div className="navbar-menu">

                    <NavLink
                        to="/"
                        className={navClass}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/movies"
                        className={navClass}
                    >
                        Movies
                    </NavLink>

                    {
                        isAuthenticated && (
                            <NavLink
                                to="/my-bookings"
                                className={navClass}
                            >
                                My Bookings
                            </NavLink>
                        )
                    }

                    {
                        role==="ROLE_ADMIN" && (
                            <NavLink
                                to="/admin"
                                className={navClass}
                            >
                                Admin
                            </NavLink>
                        )
                    }

                </div>

                <div className="navbar-actions">

                    {
                        !isAuthenticated ? (
                            <>
                                <NavLink
                                    to="/login"
                                    className={({isActive}) =>
                                        `navbar-auth-link ${isActive ? "navbar-auth-active" : ""}`
                                    }
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/register"
                                    className={({isActive}) =>
                                        `navbar-auth-link ${isActive ? "navbar-auth-active" : ""}`
                                    }
                                >
                                    Register
                                </NavLink>
                            </>
                        )
                        :
                        (
                            <>
                                <Link
                                    to="/profile"
                                    className="navbar-profile"
                                >
                                    👤 Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="navbar-logout"
                                >
                                    Logout
                                </button>
                            </>
                        )
                    }

                </div>

            </div>

        </nav>

    );

}

export default Navbar;
import { NavLink, Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function AdminSidebar() {

    const {
        logout
    } = useAuth();

    const navigate = useNavigate();

    const menu = [
        {
            name:"Dashboard",
            path:"/admin",
            icon:"📊"
        },
        {
            name:"Movies",
            path:"/admin/movies",
            icon:"🎬"
        },
        {
            name:"Bookings",
            path:"/admin/bookings",
            icon:"🎟️"
        },
        {
            name:"Payments",
            path:"/admin/payments",
            icon:"💳"
        },
        {
            name:"Add Movie",
            path:"/admin/add-movie",
            icon:"➕"
        }
    ];

    function handleLogout(){

        logout();

        navigate("/");

    }

    return(
        <aside className="admin-sidebar">

            <div>

                <div className="admin-sidebar-brand">

                    <h1 className="admin-sidebar-logo">
                        🎬 CineAdmin
                    </h1>

                    <p className="admin-sidebar-subtitle">
                        Movie Management System
                    </p>

                </div>

                <nav className="admin-sidebar-nav">

                    {
                        menu.map(item=>(
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path==="/admin"}
                                className={({isActive}) =>
                                    isActive
                                    ? "admin-nav-link active"
                                    : "admin-nav-link"
                                }
                            >

                                <span className="admin-nav-icon">
                                    {item.icon}
                                </span>

                                <span>
                                    {item.name}
                                </span>

                            </NavLink>
                        ))
                    }

                    <Link
                        to="/"
                        className="admin-nav-link"
                    >

                        <span className="admin-nav-icon">
                            🏠
                        </span>

                        <span>
                            Back to Website
                        </span>

                    </Link>

                </nav>

            </div>

            <div className="admin-profile-card">

                <p className="admin-profile-label">
                    Logged in as
                </p>

                <h3 className="admin-profile-name">
                    👤 Administrator
                </h3>

                <div className="admin-online-status">

                    <span className="admin-online-dot"></span>

                    Online

                </div>

                <button
                    onClick={handleLogout}
                    className="admin-logout-btn"
                >
                    Logout
                </button>

            </div>

        </aside>
    );

}

export default AdminSidebar;
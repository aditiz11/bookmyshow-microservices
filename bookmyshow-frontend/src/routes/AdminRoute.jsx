import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AdminRoute({ children }) {

    const {
        loading,
        isAuthenticated,
        role
    } = useAuth();

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                Loading...

            </div>

        );

    }

    if (!isAuthenticated) {

        return <Navigate to="/login" replace />;

    }

    if (role !== "ROLE_ADMIN") {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default AdminRoute;
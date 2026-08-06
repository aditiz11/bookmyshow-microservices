import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Booking from "../pages/Booking";
import BookingSuccess from "../pages/BookingSuccess";
import SelectSeats from "../pages/SelectSeats";
import MyBookings from "../pages/MyBookings";
import Profile from "../pages/Profile";
import AdminMovies from "../pages/AdminMovies";

import AdminDashboard from "../pages/AdminDashboard";
import AddMovie from "../pages/AddMovie";
import EditMovie from "../pages/EditMovie";
import AdminBookings from "../pages/AdminBookings";
import AdminPayments from "../pages/AdminPayments";

import NotFound from "../pages/NotFound";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

function AppRoutes() {

    return (

        <Routes>

            <Route element={<MainLayout />}>

                <Route path="/" element={<Home />} />

                <Route path="/movies" element={<Movies />} />

                <Route path="/movies/:id" element={<MovieDetails />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/select-seats/:movieId"
                    element={
                        <PrivateRoute>
                            <SelectSeats />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/booking-success"
                    element={
                        <PrivateRoute>

                            <BookingSuccess />

                        </PrivateRoute>
                    }
                />

                <Route
                    path="/my-bookings"
                    element={
                        <PrivateRoute>

                            <MyBookings />

                        </PrivateRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>

                            <Profile />

                        </PrivateRoute>
                    }
                />
            </Route>

            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                }
            >

                <Route index element={<AdminDashboard />} />

                <Route path="movies" element={<AdminMovies />} />

                <Route path="bookings" element={<AdminBookings />} />

                <Route path="payments" element={<AdminPayments />} />

                <Route path="add-movie" element={<AddMovie />} />

                <Route path="edit/:id" element={<EditMovie />} />

            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>

    );

}

export default AppRoutes;
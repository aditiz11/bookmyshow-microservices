import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getDashboardStats } from "../api/dashboardApi";

function AdminDashboard(){

    const [stats,setStats]=useState(null);

    useEffect(()=>{

        loadDashboard();

    },[]);

    const loadDashboard=async()=>{

        try{

            const data=await getDashboardStats();

            setStats(data);

        }
        catch(err){

            console.error(err);

        }

    };

    if(!stats){

        return(

            <div className="admin-loading">

                <div className="admin-loading-card">

                    Loading Dashboard...

                </div>

            </div>

        );

    }

    return(

        <div className="admin-dashboard">

            <div className="admin-dashboard-header">

                <h1 className="admin-dashboard-title">
                    Admin Dashboard
                </h1>

                <p className="admin-dashboard-subtitle">
                    Manage movies, bookings and payments
                </p>

            </div>


            <div className="dashboard-stats-grid">

                <div className="dashboard-stat-card">
                    <div className="dashboard-stat-top"></div>
                    <div className="dashboard-stat-icon">🎬</div>

                    <div className="dashboard-stat-content">
                        <p className="dashboard-stat-title">
                            Movies
                        </p>

                        <h2 className="dashboard-stat-value">
                            {stats.totalMovies}
                        </h2>
                    </div>
                </div>


                <div className="dashboard-stat-card">
                    <div className="dashboard-stat-top"></div>
                    <div className="dashboard-stat-icon">🎟️</div>

                    <div className="dashboard-stat-content">
                        <p className="dashboard-stat-title">
                            Bookings
                        </p>

                        <h2 className="dashboard-stat-value">
                            {stats.totalBookings}
                        </h2>
                    </div>
                </div>


                <div className="dashboard-stat-card">
                    <div className="dashboard-stat-top"></div>
                    <div className="dashboard-stat-icon">💳</div>

                    <div className="dashboard-stat-content">
                        <p className="dashboard-stat-title">
                            Payments
                        </p>

                        <h2 className="dashboard-stat-value">
                            {stats.totalPayments}
                        </h2>
                    </div>
                </div>


                <div className="dashboard-stat-card">
                    <div className="dashboard-stat-top"></div>
                    <div className="dashboard-stat-icon">💰</div>

                    <div className="dashboard-stat-content">
                        <p className="dashboard-stat-title">
                            Revenue
                        </p>

                        <h2 className="dashboard-stat-value">
                            ₹{stats.revenue}
                        </h2>
                    </div>
                </div>


            </div>


            <div className="booking-overview">

                <h2 className="booking-overview-title">
                    Booking Overview
                </h2>


                <div className="booking-status-grid">

                    <div className="booking-status-card booking-confirmed">

                        <p className="booking-status-label">
                            Confirmed
                        </p>

                        <h3 className="booking-status-value">
                            {stats.confirmed}
                        </h3>

                    </div>


                    <div className="booking-status-card booking-pending">

                        <p className="booking-status-label">
                            Pending
                        </p>

                        <h3 className="booking-status-value">
                            {stats.pending}
                        </h3>

                    </div>


                    <div className="booking-status-card booking-cancelled">

                        <p className="booking-status-label">
                            Cancelled
                        </p>

                        <h3 className="booking-status-value">
                            {stats.cancelled}
                        </h3>

                    </div>

                </div>

            </div>


            <div className="quick-actions-section">

                <h2 className="quick-actions-title">
                    Quick Actions
                </h2>


                <div className="quick-actions">

                    <Link
                        to="/admin/add-movie"
                        className="quick-action-btn quick-action-primary"
                    >
                        ➕ Add Movie
                    </Link>


                    <Link
                        to="/admin/movies"
                        className="quick-action-btn quick-action-secondary"
                    >
                        🎬 Manage Movies
                    </Link>


                    <Link
                        to="/admin/bookings"
                        className="quick-action-btn quick-action-secondary"
                    >
                        🎟 View Bookings
                    </Link>


                    <Link
                        to="/admin/payments"
                        className="quick-action-btn quick-action-secondary"
                    >
                        💳 Payments
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;
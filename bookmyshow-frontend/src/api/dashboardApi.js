import { getAllMovies } from "./movieApi";
import { getAllBookings } from "./bookingApi";
import { getAllPayments } from "./paymentApi";

export const getDashboardStats = async () => {

    const [movies, bookings, payments] = await Promise.all([
        getAllMovies(),
        getAllBookings(),
        getAllPayments()
    ]);

    const confirmed =
        bookings.filter(b => b.status === "CONFIRMED").length;

    const pending =
        bookings.filter(b => b.status === "PENDING").length;

    const cancelled =
        bookings.filter(b => b.status === "CANCELLED").length;

    const revenue =
        payments
            .filter(p => p.status === "COMPLETED")
            .reduce((sum, p) => sum + p.amount, 0);

    return {

        totalMovies: movies.length,

        totalBookings: bookings.length,

        totalPayments: payments.length,

        confirmed,

        pending,

        cancelled,

        revenue

    };

};
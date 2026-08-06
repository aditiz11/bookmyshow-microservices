function BookingTable({ bookings }) {

    const statusStyle = {
        CONFIRMED: "bg-green-500/10 text-green-400 border-green-500/30",
        PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
        CANCELLED: "bg-red-500/10 text-red-400 border-red-500/30"
    };

    return (
        <div className="bg-gradient-to-br from-[#111827] to-[#0f172a] rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">

            <div className="px-8 py-6 border-b border-gray-800 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black">
                        🎟 Booking Management
                    </h2>
                    <p className="text-gray-400 mt-1 text-sm">
                        Monitor all customer bookings
                    </p>
                </div>

                <div className="bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm font-bold">
                    {bookings.length} Bookings
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">

                    <thead>
                        <tr className="bg-black/30 text-gray-400 text-sm">
                            <th className="px-8 py-5 text-left">Booking</th>
                            <th className="px-8 py-5 text-left">User</th>
                            <th className="px-8 py-5 text-left">Movie</th>
                            <th className="px-8 py-5 text-left">Seats</th>
                            <th className="px-8 py-5 text-left">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking) => {

                            const seats =
                                booking.seats ||
                                booking.seatNumbers ||
                                booking.selectedSeats ||
                                (booking.seatNumber ? [booking.seatNumber] : []);

                            return (
                                <tr
                                    key={booking.id}
                                    className="border-t border-gray-800 hover:bg-white/5 transition-all duration-300"
                                >

                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center">
                                                🎟️
                                            </div>

                                            <div>
                                                <p className="font-bold">
                                                    #{booking.id}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    Booking ID
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-8 py-6 text-gray-300">
                                        <div className="bg-gray-800 inline-block px-4 py-2 rounded-xl">
                                            👤 {booking.userId}
                                        </div>
                                    </td>

                                    <td className="px-8 py-6">
                                        <p className="font-semibold">
                                            {booking.movie?.title || "Unknown Movie"}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            🎬 Movie Ticket
                                        </p>
                                    </td>

                                    <td className="px-8 py-6">
                                        <div className="flex flex-wrap gap-2">
                                            {seats.length > 0 ? (
                                                seats.map((seat) => (
                                                    <span
                                                        key={seat}
                                                        className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-lg font-bold text-sm"
                                                    >
                                                        {seat}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-500">
                                                    No Seat
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-8 py-6">
                                        <span
                                            className={`
                                                px-5 py-2 rounded-full border text-sm font-bold
                                                ${statusStyle[booking.status] || statusStyle.PENDING}
                                            `}
                                        >
                                            {booking.status || "PENDING"}
                                        </span>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>

        </div>
    );
}

export default BookingTable;
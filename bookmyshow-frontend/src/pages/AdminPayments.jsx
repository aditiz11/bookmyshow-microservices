import { useEffect, useState } from "react";
import { getAllPayments } from "../api/paymentApi";

function AdminPayments() {

    const [payments, setPayments] = useState([]);

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {
        try {
            const data = await getAllPayments();
            setPayments(data);
        } catch (err) {
            console.error(err);
        }
    };

    const statusStyle = {
        SUCCESS: "bg-green-500/10 text-green-400 border-green-500/30",
        PAID: "bg-green-500/10 text-green-400 border-green-500/30",
        PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
        FAILED: "bg-red-500/10 text-red-400 border-red-500/30"
    };

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-5xl font-black">
                    Payments
                </h1>

                <p className="text-gray-400 mt-2">
                    Track all payment transactions
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-[#18181b] border border-gray-800 rounded-2xl p-6 shadow-xl">
                    <p className="text-gray-400">
                        Total Transactions
                    </p>

                    <h2 className="text-4xl font-black mt-3">
                        {payments.length}
                    </h2>
                </div>

                <div className="bg-[#18181b] border border-gray-800 rounded-2xl p-6 shadow-xl">
                    <p className="text-gray-400">
                        Revenue
                    </p>

                    <h2 className="text-4xl font-black mt-3 text-green-400">
                        ₹
                        {
                            payments
                                .reduce(
                                    (total, payment) =>
                                        total + (payment.amount || 0),
                                    0
                                )
                        }
                    </h2>
                </div>

                <div className="bg-[#18181b] border border-gray-800 rounded-2xl p-6 shadow-xl">
                    <p className="text-gray-400">
                        Successful
                    </p>

                    <h2 className="text-4xl font-black mt-3 text-red-400">
                        {
                            payments.filter(
                                payment =>
                                    payment.status === "SUCCESS" ||
                                    payment.status === "PAID"
                            ).length
                        }
                    </h2>
                </div>

            </div>


            <div className="bg-gradient-to-br from-[#111827] to-[#0f172a] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">

                <div className="px-8 py-6 border-b border-gray-800">
                    <h2 className="text-2xl font-black">
                        💳 Transaction History
                    </h2>

                    <p className="text-gray-400 text-sm mt-1">
                        All customer payments
                    </p>
                </div>


                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>
                            <tr className="bg-black/30 text-gray-400 text-sm">
                                <th className="px-8 py-5 text-left">
                                    Payment ID
                                </th>

                                <th className="px-8 py-5 text-left">
                                    Booking
                                </th>

                                <th className="px-8 py-5 text-left">
                                    Amount
                                </th>

                                <th className="px-8 py-5 text-left">
                                    Status
                                </th>
                            </tr>
                        </thead>


                        <tbody>

                            {
                                payments.map(payment => (

                                    <tr
                                        key={payment.id}
                                        className="border-t border-gray-800 hover:bg-white/5 transition"
                                    >

                                        <td className="px-8 py-6 font-bold">
                                            #{payment.id}
                                        </td>


                                        <td className="px-8 py-6 text-gray-300">
                                            🎟 {payment.bookingId}
                                        </td>


                                        <td className="px-8 py-6 font-bold text-green-400">
                                            ₹{payment.amount}
                                        </td>


                                        <td className="px-8 py-6">

                                            <span
                                                className={`
                                                    px-4 py-2 rounded-full border text-sm font-bold
                                                    ${statusStyle[payment.status] || statusStyle.PENDING}
                                                `}
                                            >
                                                {payment.status || "PENDING"}
                                            </span>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default AdminPayments;
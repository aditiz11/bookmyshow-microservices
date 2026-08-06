function PaymentTable({ payments }) {

    const statusStyle = {
        SUCCESS: "payment-status-success",
        FAILED: "payment-status-failed",
        PENDING: "payment-status-pending"
    };

    return (

        <div className="admin-table-card">

            <div className="admin-table-header">

                <div>

                    <h2 className="admin-table-title">
                        💳 Payment Management
                    </h2>

                    <p className="admin-table-subtitle">
                        Monitor all customer transactions
                    </p>

                </div>

                <div className="admin-table-count">
                    {payments.length} Payments
                </div>

            </div>

            <div className="admin-table-wrapper">

                <table className="admin-table">

                    <thead>

                        <tr>

                            <th>Payment ID</th>

                            <th>Booking</th>

                            <th>Amount</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            payments.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="admin-table-empty"
                                    >

                                        No Payments Found

                                    </td>

                                </tr>

                            ) : (

                                payments.map(payment => (

                                    <tr
                                        key={payment.id}
                                    >

                                        <td>

                                            <div className="admin-table-id">

                                                <div className="admin-table-icon">
                                                    💳
                                                </div>

                                                <div>

                                                    <p className="admin-table-primary">
                                                        #{payment.id}
                                                    </p>

                                                    <p className="admin-table-secondary">
                                                        Payment ID
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            #{payment.bookingId}

                                        </td>

                                        <td className="payment-amount">

                                            ₹{payment.amount}

                                        </td>

                                        <td>

                                            <span
                                                className={`payment-status ${statusStyle[payment.status] || statusStyle.PENDING}`}
                                            >

                                                {payment.status}

                                            </span>

                                        </td>

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default PaymentTable;
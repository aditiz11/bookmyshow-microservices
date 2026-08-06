import api from "./axios";

export const getAllPayments = async () => {

    const response = await api.get("/api/payments");

    return response.data;
};

export const getPaymentByBookingId = async (bookingId) => {

    const response = await api.get(
        `/api/payments/booking/${bookingId}`
    );

    return response.data;
};
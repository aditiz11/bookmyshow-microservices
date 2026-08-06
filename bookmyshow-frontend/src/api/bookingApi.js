import api from "./axios";

export const createBooking = async (booking) => {

    const response = await api.post(
        "/api/bookings",
        booking
    );

    return response.data;
};

export const getBooking = async (id) => {

    const response = await api.get(
        `/api/bookings/${id}`
    );

    return response.data;

};

export const getMyBookings = async () => {

    const response = await api.get(
        "/api/bookings/my"
    );

    return response.data;

};

export const getAllBookings = async () => {
    const response = await api.get("/api/bookings");
    return response.data;
};


export const cancelBooking = async (id) => {
    const response = await api.put(`/api/bookings/${id}/cancel`);
    return response.data;
};
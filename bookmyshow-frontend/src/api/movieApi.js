import api from "./axios";

export const getAllMovies = async () => {
    const response = await api.get("/api/movies");
    return response.data;
};

export const getMovieById = async (id) => {
    const response = await api.get(`/api/movies/${id}`);
    return response.data;
};

export const createMovie = async (movie) => {
    const response = await api.post("/api/movies", movie);
    return response.data;
};

export const updateMovie = async (id, movie) => {
    const response = await api.put(`/api/movies/${id}`, movie);
    return response.data;
};

export const deleteMovie = async (id) => {
    await api.delete(`/api/movies/${id}`);
};
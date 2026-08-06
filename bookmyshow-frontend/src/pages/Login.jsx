import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setLoading(true);

        try {

            await login(formData);

            navigate("/");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Invalid email or password."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-page">

            <div className="auth-container">

                <div className="text-center mb-10">

                    <h1 className="auth-brand">
                        🎬 BookMyShow
                    </h1>

                    <p className="auth-subtitle">
                        Welcome back to the cinema
                    </p>

                </div>

                {error && (

                    <div className="auth-error">
                        {error}
                    </div>

                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-7"
                >

                    <div>

                        <label className="auth-label">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="auth-input"
                            required
                        />

                    </div>

                    <div>

                        <label className="auth-label">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="auth-input"
                            required
                        />

                    </div>

                    <button
                        disabled={loading}
                        className="auth-button"
                    >

                        {loading ? "Logging In..." : "Login"}

                    </button>

                </form>

                <p className="auth-footer">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="auth-link"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;
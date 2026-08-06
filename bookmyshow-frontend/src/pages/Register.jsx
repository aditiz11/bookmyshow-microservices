import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Register() {

    const navigate = useNavigate();

    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            await register(formData);

            navigate("/login");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Registration failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-page">

            <div className="auth-container">

                <div className="text-center mb-8">

                    <h1 className="auth-brand">
                        🎬 BookMyShow
                    </h1>

                    <p className="auth-subtitle">
                        Create your movie account
                    </p>

                </div>

                {error && (

                    <div className="auth-error">

                        {error}

                    </div>

                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="auth-input"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="auth-input"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="auth-input"
                        required
                    />

                    <button
                        disabled={loading}
                        className="auth-button"
                    >

                        {loading ? "Creating Account..." : "Register"}

                    </button>

                </form>

                <p className="auth-footer">

                    Already have an account?

                    <Link
                        to="/login"
                        className="auth-link"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;
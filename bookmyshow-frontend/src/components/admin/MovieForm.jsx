import { useState } from "react";

function MovieForm({
    initialData,
    onSubmit,
    buttonText
}) {

    const [formData, setFormData] = useState(
        initialData || {
            title: "",
            genre: "",
            duration: "",
            language: "",
            description: "",
            posterUrl: ""
        }
    );

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSubmit({

            ...formData,

            duration: Number(formData.duration)

        });

    }

    return (

        <div className="admin-form-card">

            <div className="admin-form-header">

                <div>

                    <h2 className="admin-form-title">

                        🎬 Movie Details

                    </h2>

                    <p className="admin-form-subtitle">

                        Fill in the information below to publish the movie.

                    </p>

                </div>

            </div>

            <form
                onSubmit={handleSubmit}
                className="admin-form"
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Movie Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="admin-input"
                    required
                />

                <div className="admin-form-grid">

                    <input
                        type="text"
                        name="genre"
                        placeholder="Genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="admin-input"
                        required
                    />

                    <input
                        type="text"
                        name="language"
                        placeholder="Language"
                        value={formData.language}
                        onChange={handleChange}
                        className="admin-input"
                        required
                    />

                </div>

                <input
                    type="number"
                    name="duration"
                    placeholder="Duration (minutes)"
                    value={formData.duration}
                    onChange={handleChange}
                    className="admin-input"
                    required
                />

                <textarea
                    rows="5"
                    name="description"
                    placeholder="Movie Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="admin-textarea"
                />

                <input
                    type="text"
                    name="posterUrl"
                    placeholder="Poster URL"
                    value={formData.posterUrl}
                    onChange={handleChange}
                    className="admin-input"
                    required
                />

                {

                    formData.posterUrl && (

                        <div className="poster-preview">

                            <p className="poster-preview-title">

                                Poster Preview

                            </p>

                            <img
                                src={formData.posterUrl}
                                alt="Poster Preview"
                                className="poster-preview-image"
                            />

                        </div>

                    )

                }

                <button
                    className="admin-submit-btn"
                >

                    {buttonText}

                </button>

            </form>

        </div>

    );

}

export default MovieForm;
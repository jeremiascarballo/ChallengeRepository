import { useState } from "react";

const JobItem = ({ job, handleSendApply }) => {
    const [url, setUrl] = useState("");

    const handleSubmit = () => {
        if (!url.trim()) return;

        handleSendApply({
            jobId: job.id,
            repoUrl: url
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2 text-center text-black">
                {job.title}
            </h2>

            <p className="text-sm text-gray-600 mb-2 text-center">
                GitHub URL
            </p>

            <input
                type="text"
                placeholder="https://github.com/user//repo"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full text-black border border-black rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Aplicar
            </button>
        </div>
    );
};

export default JobItem;
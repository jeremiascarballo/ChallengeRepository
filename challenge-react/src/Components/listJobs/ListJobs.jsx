import { useState, useEffect } from "react";
import JobItem from "./JobItem";



const ListJobs = ({handleSendApply}) => {
    
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);

                const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
                const data = await response.json();

                setJobs(data);
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-10 space-y-4">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 text-sm">Cargando sectores...</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4 justify-center items-center flex flex-col">
                {jobs.map(job => (
                <JobItem
                    key={job.id}
                    job={job}
                    handleSendApply={handleSendApply}
                />
            ))}
        </div>
    );
}
export default ListJobs;
import { useState } from "react";
import SetDataUser from "../setDataUser/SetDataUser";
import ListJobs from "../listJobs/ListJobs";

const Dashboard = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [selectedUser, setSelectedUser] = useState(false);
    const [applyData, setApplyData] = useState({
        applicationId: null,
        uuid: null,
        jobId: null,
        candidateId: null,
        repoUrl: null,
    });

    const handleSendApply = async (jobData) => {
    try {
        const finalApplyData = {
            uuid: applyData.uuid,
            candidateId: applyData.candidateId,
            applicationId : applyData.applicationId,
            jobId: jobData.jobId,
            repoUrl: jobData.repoUrl
        };

        console.log(finalApplyData);

        const response = await fetch(
            `${BASE_URL}/api/candidate/apply-to-job`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(finalApplyData)
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.log(errorData);
            throw new Error("Error al enviar la aplicación");
        }

        const data = await response.json();
        console.log("Respuesta del servidor:", data);
    } catch (error) {
        console.error(error.message);
        alert("Ocurrió un error");
    }
};


    return (
        <>
            <div className="w-screen min-h-screen">
                <div className="flex items-center justify-center relative z-10 py-10">
                    <div className="mt-5 mx-3 p-6 sm:px-10 bg-white bg-opacity-20 shadow-lg rounded-2xl w-full max-w-md">

                        <h5 className="text-xl font-semibold mb-4 text-center">
                            React Challenge
                        </h5>

                        {!selectedUser ?
                            <SetDataUser setApplyData={setApplyData} setSelectedUser={setSelectedUser} /> :
                            <p className="text-center text-gray-600 mb-4">
                                uuid: {applyData?.uuid}
                                <br />
                                candidateId: {applyData?.candidateId}
                            </p>
                        }
                        {selectedUser && <ListJobs handleSendApply={handleSendApply}/>}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Dashboard;
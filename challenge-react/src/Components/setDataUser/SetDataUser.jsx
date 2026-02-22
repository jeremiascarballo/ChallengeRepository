import { useState, useRef } from "react";

const SetDataUser = ({setApplyData, setSelectedUser}) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({ 
        error : null,
        email: false 
    });

    const emailRef = useRef(null);


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            email: false
        }));
    }

    const handlePressButtonSi = () => {
        setApplyData({
            uuid : user.uuid,
            candidateId : user.candidateId,
        });
        setSelectedUser(true);
    }
    const handlePressButtonNo = () => {
        setUser(null);
        setEmail("");
    }

    const handleSubmit = async () => {
        try {
            setErrors({
                error: null,
                email: false
            });
            setLoading(true);

            const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`);

            if (!response.ok) {
                throw new Error("Usuario no encontrado");
              }

            const data = await response.json();
            setUser(data);
        } catch (err) {
            setErrors(prevErrors => ({
                ...prevErrors,
                error: err.message
            }));
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-10 space-y-4">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 text-sm">Cargando datos de usuario...</p>
            </div>
        );
    }

    if (user) {
        return (
            <div className="w-full space-y-4">
                <h2 className="text-lg font-semibold text-center text-black">¿Usted es {user.firstName}{" "}{user.lastName}?</h2>
                <div className="flex justify-center gap-4">
                    <button 
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    onClick={handlePressButtonSi}
                    >
                        Sí
                    </button>

                    <button 
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    onClick={handlePressButtonNo}
                    >
                        No
                    </button>
                </div>
            </div>
        );

    }


    return (<>
        {errors.error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
              {errors.error}
            </div>
          )}
        <div className="w-full space-y-4 justify-center items-center flex flex-col">

            <p className="text-black text-m text-center">
                Ingrese su email para obtener sus datos de usuario
            </p>

            <input
                type="email"
                className="w-50 text-black border border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="pepito@mail.com"
                onChange={handleEmailChange}
                value={email}
                ref={emailRef}
            />

            <button
                className="w-35 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={handleSubmit}>
                Buscar
            </button>
        </div>
        </>);
}
export default SetDataUser;
import { useState, useEffect } from 'react';

const useAuth = () => {
    const [studentId, setStudentId] = useState(null);
    const [name, setName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:8082/api/v1/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' // Important: Send cookies
            });

            if (response.ok) {
                const data = await response.json();
                setStudentId(data.id);
                setName(data.firstName);
                setLastName(data.lastName);
            } else {
                setStudentId(null);
                setName(null);
                setLastName(null);
            }
        } catch (error) {
            console.error("Auth check failed", error);
            setStudentId(null);
            setName(null);
            setLastName(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const handleLogout = () => {
        window.location.href = 'http://localhost:8082/signout';
    };

    return { studentId, name, lastName, loading, handleLogout };
};

export default useAuth;

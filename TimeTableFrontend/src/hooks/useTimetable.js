import { useState, useEffect } from 'react';
import { fetchTimetable } from '../api/studentApi';

const useTimetable = (studentId) => {
    const [timetable, setTimetable] = useState(null);

    useEffect(() => {
        if (studentId) {
            fetch(`http://localhost:8082/api/v1/student/${studentId}/timetable`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => setTimetable(data))
                .catch(error => {
                    console.error('Error fetching timetable:', error);
                    setTimetable(null);
                });
        }
    }, [studentId]);

    return timetable;
};

export default useTimetable;

import { useState, useEffect } from 'react';

const useCourses = (studentId) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (studentId) {
            fetch(`http://localhost:8082/api/v1/student/${studentId}/courses`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => setCourses(data))
                .catch(error => console.error('Error fetching courses:', error));
        }
    }, [studentId]);

    return courses;
};

export default useCourses;

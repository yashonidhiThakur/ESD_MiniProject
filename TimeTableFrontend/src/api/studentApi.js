import axios from 'axios';

export const fetchTimetable = async (studentId) => {
    try {
        const response = await axios.get(`http://localhost:8082/api/v1/student/${studentId}/timetable`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchCourses = async (studentId) => {
    try {
        const response = await axios.get(`http://localhost:8082/api/v1/student/${studentId}/registered-courses`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

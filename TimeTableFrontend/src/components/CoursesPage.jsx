import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RegisteredCourses from './RegisteredCourses';
import useAuth from '../hooks/useAuth';
import useCourses from '../hooks/useCourses';

const CoursesPage = () => {
    const { studentId } = useAuth();
    const allCourses = useCourses(studentId);
    const [registeredCourses, setRegisteredCourses] = useState([]);

    useEffect(() => {
        if (studentId) {
            fetch(`http://localhost:8082/api/v1/student/${studentId}/registered-courses`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => setRegisteredCourses(data))
                .catch(error => console.error('Error fetching registered courses:', error));
        }
    }, [studentId]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    href="/"
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        color: '#1a237e',
                        borderColor: '#1a237e',
                        '&:hover': {
                            backgroundColor: 'rgba(26, 35, 126, 0.04)',
                            borderColor: '#1a237e'
                        }
                    }}
                >
                    Back to Dashboard
                </Button>
            </Box>

            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#1a237e', mb: 1, fontFamily: "'Arial', sans-serif" }}>
                    Course Catalog
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ fontFamily: "'Arial', sans-serif" }}>
                    View all available courses and your current registrations
                </Typography>
            </Box>

            <RegisteredCourses courses={allCourses} title="All Available Courses" showRoom={false} />

            <Box sx={{ my: 6 }} /> {/* Spacer */}

            <RegisteredCourses courses={registeredCourses} title="My Registered Courses" />
        </Container>
    );
};

export default CoursesPage;

import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import RoomIcon from '@mui/icons-material/Room';
import PersonIcon from '@mui/icons-material/Person';

const RegisteredCourses = ({ courses, title = "Registered Courses", showRoom = true }) => {
    if (!courses) return null;

    // Diverse palette of Blue and Green shades
    const courseColors = [
        '#E0F7FA', // Cyan 50
        '#E8F5E9', // Green 50
        '#B2EBF2', // Cyan 100
        '#C8E6C9', // Green 100
        '#B3E5FC', // Light Blue 100
        '#DCEDC8', // Light Green 100
        '#E1F5FE', // Light Blue 50
        '#F1F8E9', // Light Green 50
        '#80DEEA', // Cyan 200
        '#A5D6A7', // Green 200
        '#81D4FA', // Light Blue 200
        '#C5E1A5', // Light Green 200
        '#4DD0E1', // Cyan 300
        '#81C784', // Green 300
        '#4FC3F7', // Light Blue 300
    ];

    const getCourseColor = (courseName) => {
        if (!courseName) return '#fff';
        let hash = 0;
        for (let i = 0; i < courseName.length; i++) {
            hash = courseName.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % courseColors.length;
        return courseColors[index];
    };

    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Box sx={{
                p: 2,
                mb: 3,
                backgroundColor: '#ffffff',
                borderLeft: '5px solid #4fd1c5',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#2d3748', fontFamily: "'Arial', sans-serif" }}>
                    {title}
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {courses.map((course, index) => {
                    const cardColor = getCourseColor(course.courseName);

                    return (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    backgroundColor: cardColor,
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                    },
                                    borderRadius: '16px',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 2, color: '#2d3748', fontFamily: "'Arial', sans-serif" }}>
                                        {course.courseName}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <PersonIcon sx={{ color: '#4a5568', mr: 1, fontSize: 20 }} />
                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                                            {course.faculty}
                                        </Typography>
                                    </Box>

                                    {showRoom && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <RoomIcon sx={{ color: '#4a5568', mr: 1, fontSize: 20 }} />
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                                                {course.roomNumber || course.roomNo}
                                            </Typography>
                                        </Box>
                                    )}

                                    <Chip
                                        icon={<SchoolIcon style={{ color: '#2d3748' }} />}
                                        label={course.specialization}
                                        size="small"
                                        sx={{
                                            backgroundColor: 'rgba(255,255,255,0.5)',
                                            fontWeight: 'bold',
                                            color: '#2d3748',
                                            fontFamily: "'DM Sans', sans-serif"
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default RegisteredCourses;

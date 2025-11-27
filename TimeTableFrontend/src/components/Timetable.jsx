import React from 'react';
import { Typography, Box, Grid, Card, CardContent, Chip } from '@mui/material';

const Timetable = ({ timetable }) => {
    if (!timetable || !timetable.weekdays) return null;

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeslots = [
        { startTime: '08:00', endTime: '09:30' },
        { startTime: '09:30', endTime: '11:00' },
        { startTime: '11:00', endTime: '13:00' },
    ];

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
        if (!courseName) return 'transparent';
        let hash = 0;
        for (let i = 0; i < courseName.length; i++) {
            hash = courseName.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % courseColors.length;
        return courseColors[index];
    };

    return (
        <Box sx={{ mt: 4, mb: 4, fontFamily: "'DM Sans', sans-serif" }}>
            <Typography variant="h4" component="h2" sx={{
                fontWeight: '700',
                mb: 4,
                color: '#2d3748',
                fontFamily: "'Arial', sans-serif",
                textAlign: 'center'
            }}>
                Weekly Schedule
            </Typography>

            <Grid container spacing={3}>
                {daysOfWeek.map((day) => {
                    const daySlots = timetable.weekdays.find((weekday) => weekday.day === day);

                    return (
                        <Grid item xs={12} sm={6} md={4} key={day}>
                            <Card elevation={0} sx={{
                                height: '100%',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                }
                            }}>
                                <Box sx={{
                                    p: 2,
                                    borderBottom: '1px solid #edf2f7',
                                    backgroundColor: '#f8f9fa'
                                }}>
                                    <Typography variant="h6" sx={{
                                        fontWeight: 'bold',
                                        color: '#4a5568',
                                        fontFamily: "'Arial', sans-serif"
                                    }}>
                                        {day}
                                    </Typography>
                                </Box>
                                <CardContent sx={{ p: 2 }}>
                                    {timeslots.map((slot, index) => {
                                        // Find if there is a course in this slot
                                        let courseName = null;
                                        let roomNo = null;
                                        if (daySlots) {
                                            const foundSlot = daySlots.timeslots.find(s => {
                                                const sStart = s.startTime.substring(0, 5);
                                                const sEnd = s.endTime.substring(0, 5);
                                                return sStart === slot.startTime && sEnd === slot.endTime;
                                            });
                                            if (foundSlot) {
                                                courseName = foundSlot.coursename;
                                                roomNo = foundSlot.roomNo;
                                            }
                                        }

                                        return (
                                            <Box key={index} sx={{
                                                mb: 2,
                                                p: 1.5,
                                                borderRadius: '8px',
                                                backgroundColor: courseName ? getCourseColor(courseName) : 'transparent',
                                                borderLeft: courseName ? '4px solid #4fd1c5' : '4px solid transparent',
                                                opacity: courseName ? 1 : 0.5
                                            }}>
                                                <Typography variant="caption" display="block" sx={{ color: '#718096', mb: 0.5, fontWeight: '500' }}>
                                                    {slot.startTime} - {slot.endTime}
                                                </Typography>
                                                <Typography variant="body2" sx={{
                                                    fontWeight: courseName ? '600' : 'normal',
                                                    color: courseName ? '#2d3748' : '#a0aec0'
                                                }}>
                                                    {courseName || 'No Class'}
                                                </Typography>
                                                {roomNo && (
                                                    <Typography variant="caption" display="block" sx={{ color: '#4a5568', mt: 0.5, fontWeight: 'bold' }}>
                                                        Room: {roomNo}
                                                    </Typography>
                                                )}
                                            </Box>
                                        );
                                    })}
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default Timetable;

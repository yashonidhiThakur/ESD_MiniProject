import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import LoginForm from './components/LoginForm';
import Timetable from './components/Timetable';
import CoursesPage from './components/CoursesPage';
import Navbar from './components/Navbar';
import useAuth from './hooks/useAuth';
import useTimetable from './hooks/useTimetable';
import useCourses from './hooks/useCourses';
import { downloadTimetableAsPDF } from './utils/pdfUtils';

const App = () => {
    const { studentId, name, lastName, loading, handleLogout } = useAuth();
    const timetable = useTimetable(studentId);
    const courses = useCourses(studentId);
    const [showTimetable, setShowTimetable] = React.useState(false);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
            <Routes>
                <Route path="/oauth2/redirect" element={<Navigate to="/" />} />
                <Route path="/courses" element={!studentId ? <Navigate to="/" /> : (
                    <>
                        <Navbar name={name} onLogout={handleLogout} />
                        <CoursesPage />
                        <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#fff', borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                © {new Date().getFullYear()} TimeTable App. All rights reserved.
                            </Typography>
                        </Box>
                    </>
                )} />
                <Route path="/" element={
                    (() => {
                        const queryParams = new URLSearchParams(window.location.search);
                        const error = queryParams.get('error');
                        const isUnauthorized = error === 'unauthorized';

                        if (!studentId && !isUnauthorized) {
                            return <Container sx={{ mt: 10 }}><LoginForm /></Container>;
                        }

                        return (
                            <>
                                <Navbar name={name || 'Guest'} onLogout={handleLogout} />

                                <Container maxWidth="lg" sx={{ flexGrow: 1, mb: 4 }}>
                                    {isUnauthorized ? (
                                        <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center', borderRadius: 2, backgroundColor: '#fff5f5', border: '1px solid #fc8181' }}>
                                            <Typography variant="h4" color="error" gutterBottom sx={{ fontWeight: 'bold' }}>
                                                Access Denied
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary" paragraph>
                                                Your Google account is not registered in our system.
                                            </Typography>
                                            <Typography variant="body1" paragraph>
                                                Please contact the administrator to register your email address.
                                            </Typography>
                                            <Button variant="contained" color="primary" href="/" sx={{ mt: 2 }}>
                                                Back to Login
                                            </Button>
                                        </Paper>
                                    ) : (
                                        <>
                                            {/* University Header */}
                                            <Box sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
                                                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#2d3748', fontFamily: "'Arial', sans-serif" }}>
                                                    International Institute of Information Technology, Bangalore
                                                </Typography>
                                            </Box>

                                            {/* Student Details Sub-header */}
                                            <Box sx={{ mb: 4, textAlign: 'center' }}>
                                                <Typography variant="h6" component="div" sx={{ color: '#4a5568', fontFamily: "'Arial', sans-serif" }}>
                                                    Showing the timetable for {name} {lastName} (Roll No: {studentId})
                                                </Typography>
                                            </Box>

                                            {/* Hero Section */}
                                            <Box sx={{ mb: 4, textAlign: 'center' }}>
                                                <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#1a237e', mb: 1 }}>
                                                    Student Dashboard
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary">
                                                    Manage your schedule and view your registered courses
                                                </Typography>
                                            </Box>

                                            {/* Quick Actions Card */}
                                            <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #e0e0e0' }}>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                                                    Quick Actions
                                                </Typography>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Button
                                                            onClick={() => setShowTimetable(!showTimetable)}
                                                            variant="contained"
                                                            startIcon={showTimetable ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                            sx={{
                                                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                                                color: 'white',
                                                                fontWeight: 'bold',
                                                                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                                                textTransform: 'none',
                                                                px: 3
                                                            }}
                                                        >
                                                            {showTimetable ? 'Hide Timetable' : 'View Timetable'}
                                                        </Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button
                                                            onClick={() => downloadTimetableAsPDF(timetable)}
                                                            variant="outlined"
                                                            startIcon={<PictureAsPdfIcon />}
                                                            sx={{
                                                                borderColor: '#2196F3',
                                                                color: '#2196F3',
                                                                fontWeight: 'bold',
                                                                textTransform: 'none',
                                                                px: 3,
                                                                '&:hover': {
                                                                    borderColor: '#1976D2',
                                                                    backgroundColor: 'rgba(33, 150, 243, 0.04)'
                                                                }
                                                            }}
                                                        >
                                                            Download PDF
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Paper>

                                            {showTimetable && (
                                                <Box sx={{ mb: 4, animation: 'fadeIn 0.5s ease-in' }}>
                                                    <style>{`
                                                        @keyframes fadeIn {
                                                            from { opacity: 0; transform: translateY(10px); }
                                                            to { opacity: 1; transform: translateY(0); }
                                                        }
                                                    `}</style>
                                                    <Timetable timetable={timetable} />
                                                </Box>
                                            )}
                                        </>
                                    )}
                                </Container>

                                {/* Footer */}
                                <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#fff', borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        © {new Date().getFullYear()} TimeTable App. All rights reserved.
                                    </Typography>
                                </Box>
                            </>
                        );
                    })()
                } />
            </Routes>
        </Box>
    );
};

export default App;

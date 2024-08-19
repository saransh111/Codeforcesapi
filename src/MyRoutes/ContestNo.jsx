import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Box, CircularProgress, Alert, Button, List, ListItem } from '@mui/material';

export default function ContestNo() {
    const { contestNo } = useParams();
    const [contestData, setContestData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchContestData() {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('https://codeforces.com/api/problemset.problems?tags=implementation');
                const allProblems = response.data.result.problems;
                
                // Filter problems by contestId
                const filteredProblems = allProblems.filter(problem => problem.contestId === Number(contestNo));
                setContestData(filteredProblems);
            } catch (error) {
                console.error("Error fetching contest data:", error);
                setError('Failed to fetch contest data.');
            } finally {
                setLoading(false);
            }
        }

        fetchContestData();
    }, [contestNo]);

    function handleProblemClick(contestId, index) {
        window.open(`https://codeforces.com/problemset/problem/${contestId}/${index}`, '_blank', 'noopener,noreferrer');
    }

    function handleSolveButtonClick() {
        navigate("/solve_problem");
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Contest Details
            </Typography>
            {contestData.length > 0 ? (
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" component="div" gutterBottom>
                            Contest ID: {contestNo}
                        </Typography>
                        <List>
                            {contestData.map((problem, index) => (
                                <ListItem key={index} sx={{ marginBottom: 2, padding: 1, border: '1px solid #ddd', borderRadius: 1 }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body1">
                                            <strong>Index:</strong> {problem.index}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Name:</strong> {problem.name}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Type:</strong> {problem.type}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Rating:</strong> {problem.rating || "Not Specified"}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            sx={{ marginBottom: 1 }}
                                            onClick={() => handleProblemClick(problem.contestId, problem.index)}
                                        >
                                            Problem Statement
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleSolveButtonClick}
                                        >
                                            Solve this!!
                                        </Button>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            ) : (
                <Typography>No problems found for this contest.</Typography>
            )}
        </Box>
    );
}

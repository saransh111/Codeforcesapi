import React, { useEffect, useState } from 'react';
import TopBar from '../components/Topbar';
import Pagination from './Pagination';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, Grid, Box, Divider } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';

export default function Problems() {
    const [problems, setProblems] = useState([]);
    const [translatedNames, setTranslatedNames] = useState([]);
    const [leftFilter, setLeftFilter] = useState('');
    const [rightFilter, setRightFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProblems() {
            try {
                const response = await axios.get('https://codeforces.com/api/problemset.problems?tags=implementation');
                const data = response.data.result.problems.slice(currentPage * 20 - 20, currentPage * 20);
                setProblems(data);
            } catch (error) {
                console.error("Error fetching problems:", error);
            }
        }
        fetchProblems();
    }, [currentPage]);

    useEffect(() => {
        async function translateNames() {
            const translations = await Promise.all(problems.map(problem => ghar(problem.name)));
            setTranslatedNames(translations);
        }
        translateNames();
    }, [problems]);

    function handlePagination(pageNumber) {
        setCurrentPage(pageNumber);
    }

    const filteredProblems = problems.filter(problem =>
        (!leftFilter || problem.rating >= leftFilter) &&
        (!rightFilter || problem.rating <= rightFilter)
    );

    function movetoproblemsolver() {
        navigate("/solve_problem");
    }

    function handleProblemClick(contestId, index) {
        window.open(`https://codeforces.com/problemset/problem/${contestId}/${index}`, '_blank', 'noopener,noreferrer');
    }

    async function ghar(text) {
        const options = {
            method: 'POST',
            url: 'https://google-api31.p.rapidapi.com/translate',
            headers: {
                'x-rapidapi-key': 'ef824a541emshe5019c2d145a231p159007jsne76ae13a6062',
                'x-rapidapi-host': 'google-api31.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                text: text,
                to: 'en',
                from_lang: ''
            }
        };
        try {
            const response = await axios.request(options);
            return response.data.translated;
        } catch (error) {
            console.error("Could not translate:", error);
            return text;
        }
    }

    return (
        <div>
            <TopBar />
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Problems
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
                    <FilterListIcon sx={{ marginRight: 1 }} />
                    <Typography variant="h6" sx={{ marginRight: 2 }}>
                        Filters:
                    </Typography>
                    <TextField
                        label="Min Rating"
                        type="number"
                        value={leftFilter}
                        onChange={(e) => setLeftFilter(e.target.value)}
                        variant="outlined"
                        sx={{ marginRight: 2 }}
                        size="small"
                        InputProps={{ style: { width: '150px' } }}
                    />
                    <TextField
                        label="Max Rating"
                        type="number"
                        value={rightFilter}
                        onChange={(e) => setRightFilter(e.target.value)}
                        variant="outlined"
                        size="small"
                        InputProps={{ style: { width: '150px' } }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {}}
                        sx={{ marginLeft: 2 }}
                    >
                        Apply Filters
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {filteredProblems.map((problem, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        {translatedNames[index] || problem.name} {/* Use translated name */}
                                    </Typography>
                                    <Divider sx={{ marginBottom: 1 }} />
                                    <Typography color="textSecondary" gutterBottom>
                                        Rating: {problem.rating || "Rating Not Yet Decided"}
                                    </Typography>
                                    <Box sx={{ marginBottom: 2 }}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            sx={{ marginRight: 1 }}
                                            onClick={() => handleProblemClick(problem.contestId, problem.index)}
                                        >
                                            Problem Statement
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={movetoproblemsolver}
                                        >
                                            Solve this!!
                                        </Button>
                                    </Box>
                                    <Typography variant="body2" gutterBottom>
                                        Tags:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {problem.tags.map((tag, tagIndex) => (
                                            <Typography
                                                key={tagIndex}
                                                variant="body2"
                                                sx={{ backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '4px' }}
                                            >
                                                {tag}
                                            </Typography>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Pagination
                length={200} 
                postsPerPage={20}
                handlePagination={handlePagination}
                currentPage={currentPage}
            />
        </div>
    );
}

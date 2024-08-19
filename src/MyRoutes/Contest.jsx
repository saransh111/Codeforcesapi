import React, { useState, useEffect } from 'react';
import TopBar from '../components/Topbar';
import axios from 'axios';
import { Container, Card, CardContent, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Contest() {
  const [contests, setContests] = useState([]); // Initialize state as an empty array
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Contest component mounted");

    const fetchContests = async () => { // Fix async function declaration
      try {
        const res = await axios.get('https://codeforces.com/api/contest.list');
        setContests(res.data.result.slice(0, 100)); // Set the contests state
      } catch (err) {
        console.log("We got an error:", err);
      }
    };

    fetchContests(); // Call the async function inside useEffect
  }, []); // Empty dependency array ensures this runs only once

  function StartContest(ID){
      navigate(`/contest/${ID}`);
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <TopBar />
      <Grid container spacing={3}>
        {contests.map((contest, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {contest.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Contest ID: {contest.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start Time: {new Date(contest.startTimeSeconds * 1000).toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {StartContest(contest.id)}}
                  style={{ marginTop: '1rem' }}
                >
                  Start Contest
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, AppBar, Toolbar, Typography } from '@mui/material';
import Topbar from '../components/Topbar';
import Details from '../components/Details';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Usercookie } from '../stores/Usercookie';

export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(Usercookie);
    const [userDetails, setUserDetails] = useState({});
    const username = useRecoilValue(Usercookie);

    // Function to get cookie value by name
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    // Fetch user from cookie and set state on component mount
    useEffect(() => {
        const user1 = getCookie('username');
        if (!user1) {
            navigate("/login");
        } else {
            console.log(user1);
            setUser(user1);
            console.log(username);
        }
    }, [navigate, setUser, username]);

    // Navigation functions
    const GiveContest = () => {
        navigate("/contest");
    };

    const SolveProblems = () => {
        navigate("/Problems");
    };

    const CheckoutFriend = () => {
        navigate("/friendSubmission");
    };

    return (
        <div>
            {/* AppBar with Topbar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Home
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Main Content Container */}
            <Container maxWidth="md" style={{ marginTop: '2rem' }}>
                <Topbar />
                <Details />

                {/* Button Group */}
                <Grid container spacing={2} justifyContent="center" style={{ marginTop: '2rem' }}>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={GiveContest}>
                            Give Contest
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={SolveProblems}>
                            Solve Problems
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="success" onClick={CheckoutFriend}>
                            Check Out Friend
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

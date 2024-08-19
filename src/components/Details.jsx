import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Usercookie } from '../stores/Usercookie';
import axios from 'axios';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';

export default function Details() {
    const userName = useRecoilValue(Usercookie);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await axios.get(`https://codeforces.com/api/user.info?handles=${userName}`);
                setUserDetails(res.data.result[0]);
            } catch (err) {
                console.log("We got an error:", err);
            }
        };
        if (userName) {
            fetchUserDetails();
        }
    }, [userName]);

    return (
        <Grid container justifyContent="center" style={{ marginTop: '2rem' }}>
            <Card style={{ maxWidth: 600, width: '100%' }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            {userDetails.titlePhoto && (
                                <Avatar
                                    src={userDetails.titlePhoto}
                                    alt={userDetails.handle}
                                    sx={{ width: 100, height: 100 }}
                                />
                            )}
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5" component="div">
                                {userDetails.handle || "No handle available"}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {userDetails.rank || "No rank available"} (Max: {userDetails.maxRank || "N/A"})
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ marginTop: '1rem' }}>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>First Name:</strong> {userDetails.firstName || "No first name available"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Last Name:</strong> {userDetails.lastName || "No last name available"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Rating:</strong> {userDetails.rating || "No rating available"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Friend of Count:</strong> {userDetails.friendOfCount || "No friend count available"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                <strong>Contribution:</strong> {userDetails.contribution || "No contribution available"}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Paper, CircularProgress, Box } from '@mui/material';

export default function FriendSubmisson() {
  const friendlist = ["DmitriyH", "Fefer_Ivan", "saranshbhaduka111", "hsrb"];
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRatings() {
      const ratingsData = [];

      for (let i = 0; i < friendlist.length; i++) {
        try {
          const response = await axios.get(`https://codeforces.com/api/user.info?handles=${friendlist[i]}`);
          const rate = response.data.result[0].rating;
          const data = {
            username: friendlist[i],
            rating: rate,
          };
          ratingsData.push(data);
        } catch (error) {
          console.error("Error fetching problems:", error);
        }
      }

      setRatings(ratingsData);
      setLoading(false); // Stop loading after fetching data
    }

    getRatings();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Friend Ratings
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper elevation={3}>
            <List>
              {ratings.map(({ username, rating }) => (
                <ListItem key={username}>
                  <ListItemText primary={username} secondary={`Rating: ${rating}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

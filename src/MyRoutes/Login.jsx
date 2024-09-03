import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { TextField, Menu, MenuItem, Box } from '@mui/material';
import {RecoilRoot,atom,selector, useRecoilState, useRecoilValue} from 'recoil';
import { Usercookie} from "../stores/Usercookie";


const Login = () => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [names, setNames] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null); // Anchor element for menu
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    url: "https://codeforces.com/api/user.ratedList?activeOnly=true&includeRetired=false"
                });

                const rows = res.data.result;

                if (rows && Array.isArray(rows)) { // Check if rows exists and is an array
                    const totalHandles = [];
                    for (let i=0; i< rows.length;i++){
                        totalHandles.push(rows[i].handle);
                    }
                    setNames(totalHandles);
                } else {
                    console.log("Rows is not an array or doesn't exist.");
                }
            } catch (err) {
                console.log("We got an error:", err);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run only once on mount

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value) {
            const filteredSuggestions = names.filter((name) =>
                name.toLowerCase().startsWith(value.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filteredSuggestions);
            setAnchorEl(e.currentTarget); // Open dropdown menu
        } else {
            setSuggestions([]);
            setAnchorEl(null); // Close dropdown menu
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setSuggestions([]);
        setAnchorEl(null); // Close dropdown menu
    };

    const handleClose = () => {
        setAnchorEl(null); // Close dropdown menu
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && suggestions.length > 0) {
            // If Enter key is pressed and there are suggestions
            setInputValue(suggestions[0]); // Select the first suggestion
            setSuggestions([]);
            setAnchorEl(null); // Close dropdown menu
            e.preventDefault(); // Prevent default form submission
            console.log(inputValue);
            document.cookie = "name="+inputValue+"; expires=expiration_date; path=/";
            navigate("/");
        }
        if (e.key === 'Enter' && suggestions.length == 0) {
            // If Enter key is pressed and there are suggestions
            setInputValue(e.target.value); // Select the first suggestion
            console.log(inputValue);
            document.cookie = "username="+inputValue+"; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/";
            navigate("/");
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh" // Full viewport height
        >
            <h1>Handle</h1>
            <Box
                width="100%"
                maxWidth="600px" // Set a max-width for better readability
                p={2} // Add padding
                position="relative" // For positioning the menu correctly
            >
                <TextField
                    id="nameInput"
                    label="Enter Your Codeforces Handle"
                    variant="outlined"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    fullWidth
                    autoComplete="off"
                />
                <Menu
                    id="suggestions-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && suggestions.length > 0}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: 224,
                            width: '50%',
                        },
                    }}
                >
                    {suggestions.map((suggestion, index) => (
                        <MenuItem
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>
    );
};

export default Login;

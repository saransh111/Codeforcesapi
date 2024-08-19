import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue} from 'recoil';
import {useNavigate } from 'react-router-dom';
import { Usercookie } from '../stores/Usercookie';

const TopBar = () => {
  const navigate = useNavigate(); 
  const userName = useRecoilValue(Usercookie);
  const handleSignOut = () => {
    alert('Signed out');
    document.cookie = `username=${userName}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate('/');
  };

  return (
    <div className="bg-blue-500 text-white flex justify-between items-center p-4">
      <div className="text-lg">Hi, {userName}</div>
      <button
        onClick={handleSignOut}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default TopBar;

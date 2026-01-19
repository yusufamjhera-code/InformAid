import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, List, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import SchemeCard from './SchemeCard';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schemes');
        setSchemes(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching schemes:', err);
        setError('Failed to fetch schemes');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSchemeClick = (scheme) => {
    setSelectedScheme(scheme);
    setTimeout(() => {
      navigate(`/schemes/${scheme._id}`);
    }, 500);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography>Loading schemes...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Government Schemes
        </Typography>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="All Schemes" />
          <Tab label="Education" />
          <Tab label="Healthcare" />
          <Tab label="Employment" />
        </Tabs>
        <List>
          <AnimatePresence>
            {schemes.map((scheme) => (
              <SchemeCard
                key={scheme._id}
                scheme={scheme}
                onClick={handleSchemeClick}
              />
            ))}
          </AnimatePresence>
        </List>
      </Paper>
    </Box>
  );
};

export default Schemes; 
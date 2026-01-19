import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../api';

const SchemeDetails = () => {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        const response = await api.get(`/api/scheme/${id}`);
        setScheme(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching scheme details:', err);
        setError('Failed to fetch scheme details');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemeDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography>Loading scheme details...</Typography>
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

  if (!scheme) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography>Scheme not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              {scheme.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {scheme.short_description}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              About the Scheme
            </Typography>
            <Typography variant="body1" paragraph>
              {scheme.full_description}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Eligibility Criteria
            </Typography>
            <List>
              {scheme.eligibility.map((criteria, index) => (
                <ListItem key={index}>
                  <ListItemText primary={criteria} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Required Documents
            </Typography>
            <List>
              {scheme.documents_required.map((document, index) => (
                <ListItem key={index}>
                  <ListItemText primary={document} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Benefits
            </Typography>
            <List>
              {scheme.benefits.map((benefit, index) => (
                <ListItem key={index}>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Application Process
            </Typography>
            <List>
              {scheme.application_process.map((step, index) => (
                <ListItem key={index}>
                  <ListItemText primary={step} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                href={scheme.official_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply on Government Portal
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/schemes"
              >
                Back to Schemes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SchemeDetails; 
import React from 'react';
import { motion } from 'framer-motion';
import { ListItem, ListItemText, Button, Divider } from '@mui/material';

const SchemeCard = ({ scheme, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <ListItem
        button
        onClick={() => onClick(scheme)}
        sx={{ 
          py: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          }
        }}
      >
        <ListItemText
          primary={scheme.name}
          secondary={scheme.short_description}
        />
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
          >
            Learn More
          </Button>
        </motion.div>
      </ListItem>
      <Divider />
    </motion.div>
  );
};

export default SchemeCard; 
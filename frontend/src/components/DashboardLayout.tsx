import { Box, Paper, Typography } from '@mui/material';

const DashboardLayout = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      p: 3, 
      gap: 3 
    }}>
      {/* Top Row with Current Work and Previous Work */}
      <Box sx={{ 
        display: 'flex', 
        gap: 3, 
        flex: '1 1 60%',
        minHeight: 0 
      }}>
        {/* Current Work Panel */}
        <Paper
          data-testid="current-work-panel"
          sx={{
            p: 3,
            flex: '1 1 50%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Current Work
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Progress and status will appear here...
            </Typography>
          </Box>
        </Paper>

        {/* Previous Work Panel */}
        <Paper
          data-testid="previous-work-panel"
          sx={{
            p: 3,
            flex: '1 1 50%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Previous Work
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Previous projects and exports will appear here...
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Command Panel */}
      <Paper
        data-testid="command-panel"
        sx={{
          p: 3,
          flex: '0 0 auto',
          minHeight: '200px',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Command Center
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Command input and controls will appear here...
        </Typography>
      </Paper>
    </Box>
  );
};

export default DashboardLayout;

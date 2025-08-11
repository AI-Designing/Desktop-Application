'use client';

import { Box, Typography, LinearProgress, List, ListItem, ListItemText, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface LogEntry {
  timestamp: string;
  message: string;
  status: 'info' | 'success' | 'error';
}

interface CurrentWorkPanelProps {
  status?: string;
  eta?: string;
  isGenerating?: boolean;
  progress?: number;
  logs?: LogEntry[];
}

const CurrentWorkPanel = ({ 
  status, 
  eta, 
  isGenerating = false, 
  progress,
  logs = [] 
}: CurrentWorkPanelProps) => {
  const getStatusIcon = (logStatus: string) => {
    switch (logStatus) {
      case 'success':
        return <CheckCircleIcon color="success" fontSize="small" />;
      case 'error':
        return <ErrorIcon color="error" fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Status Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Current Work
        </Typography>
        
        {status ? (
          <Box sx={{ mb: 1 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {status}
            </Typography>
            
            {eta && (
              <Chip
                icon={<AccessTimeIcon />}
                label={eta}
                size="small"
                variant="outlined"
                color="primary"
              />
            )}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Ready for your next command...
          </Typography>
        )}
        
        {isGenerating && (
          <LinearProgress 
            variant={progress !== undefined ? "determinate" : "indeterminate"}
            value={progress}
            sx={{ mt: 1 }}
          />
        )}
      </Box>

      {/* Logs Section */}
      {logs.length > 0 && (
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Typography variant="subtitle2" gutterBottom>
            Status Log
          </Typography>
          <List dense>
            {logs.map((log, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getStatusIcon(log.status)}
                      <Typography variant="body2">
                        {log.message}
                      </Typography>
                    </Box>
                  }
                  secondary={log.timestamp}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default CurrentWorkPanel;

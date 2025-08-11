'use client';

import { useState } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';

interface CommandPanelProps {
  onSubmit: (command: string) => void;
  onExport?: (format: string) => void;
  isGenerating?: boolean;
  onStop?: () => void;
}

const CommandPanel = ({ onSubmit, onExport, isGenerating = false, onStop }: CommandPanelProps) => {
  const [command, setCommand] = useState('');

  const handleSubmit = () => {
    if (command.trim()) {
      onSubmit(command.trim());
      setCommand('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Enter your command"
        multiline
        rows={3}
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="e.g., Create a 20mm cube with a 5mm hole in the center"
        disabled={isGenerating}
        fullWidth
        variant="outlined"
      />
      
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        {isGenerating ? (
          <Button
            variant="outlined"
            color="error"
            startIcon={<StopIcon />}
            onClick={onStop}
          >
            Stop
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={handleSubmit}
              disabled={!command.trim()}
            >
              Generate
            </Button>
            {onExport && (
              <Button
                variant="outlined"
                onClick={() => onExport('STL')}
                disabled={isGenerating}
              >
                Export STL
              </Button>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default CommandPanel;

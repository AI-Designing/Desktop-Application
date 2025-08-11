'use client';

import { useState, useCallback } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Login from './Login';
import CommandPanel from './CommandPanel';
import CurrentWorkPanel from './CurrentWorkPanel';
import PreviousWorkPanel from './PreviousWorkPanel';

interface LogEntry {
  timestamp: string;
  message: string;
  status: 'info' | 'success' | 'error';
}

interface ProjectFile {
  id: string;
  name: string;
  createdAt: string;
  fileSize: string;
  status: 'completed' | 'failed' | 'processing';
}

const DashboardLayout = () => {
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [currentEta, setCurrentEta] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [projects] = useState<ProjectFile[]>([
    {
      id: '1',
      name: 'Cube with hole.stl',
      createdAt: '2 hours ago',
      fileSize: '245 KB',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Bracket design.stl',
      createdAt: 'Yesterday',
      fileSize: '512 KB',
      status: 'completed'
    }
  ]);

  const handleCommand = useCallback(async (command: string) => {
    setIsGenerating(true);
    setCurrentStatus('Processing command...');
    setCurrentEta('ETA: 30s');
    
    // Add initial log entry
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      message: `Received command: ${command}`,
      status: 'info'
    };
    setLogs(prev => [...prev, newLog]);

    try {
      // Check if we're running in Electron
      if (typeof window !== 'undefined' && window.electronAPI) {
        // Use Electron API
        const result = await window.electronAPI.runCommand(command);
        
        if (result.success) {
          setLogs(prev => [...prev, {
            timestamp: new Date().toLocaleTimeString(),
            message: result.message || '✅ Successfully completed!',
            status: 'success'
          }]);
        } else {
          setLogs(prev => [...prev, {
            timestamp: new Date().toLocaleTimeString(),
            message: result.error || '❌ Failed to process command',
            status: 'error'
          }]);
        }
      } else {
        // Fallback simulation for web development
        await simulateProcessing();
      }
    } catch (error) {
      setLogs(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        message: `❌ Error: ${error}`,
        status: 'error'
      }]);
    } finally {
      setIsGenerating(false);
      setCurrentStatus('');
      setCurrentEta('');
    }
  }, []);

  // Simulation function for web development
  const simulateProcessing = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentStatus('Analyzing request...');
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      message: 'Analyzing request...',
      status: 'info'
    }]);

    await new Promise(resolve => setTimeout(resolve, 2000));
    setCurrentStatus('Generating FreeCAD commands...');
    setCurrentEta('ETA: 15s');
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      message: 'Generating FreeCAD commands...',
      status: 'info'
    }]);

    await new Promise(resolve => setTimeout(resolve, 3000));
    setCurrentStatus('Executing operations...');
    setCurrentEta('ETA: 5s');
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      message: 'Executing operations...',
      status: 'info'
    }]);

    await new Promise(resolve => setTimeout(resolve, 3000));
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      message: '✅ Successfully completed!',
      status: 'success'
    }]);
  };

  const handleStop = useCallback(() => {
    setIsGenerating(false);
    setCurrentStatus('');
    setCurrentEta('');
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      message: '⏹️ Operation stopped by user',
      status: 'error'
    }]);
  }, []);

  const handleProjectOpen = useCallback((projectId: string) => {
    console.log('Opening project:', projectId);
  }, []);

  const handleProjectDownload = useCallback((projectId: string) => {
    console.log('Downloading project:', projectId);
  }, []);

  const handleProjectDelete = useCallback((projectId: string) => {
    console.log('Deleting project:', projectId);
  }, []);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      p: 3, 
      gap: 3 
    }}>
      {/* Header with Login */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          AI Designer
        </Typography>
        <Login />
      </Paper>

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
          <CurrentWorkPanel
            status={currentStatus}
            eta={currentEta}
            isGenerating={isGenerating}
            logs={logs}
          />
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
          <PreviousWorkPanel
            projects={projects}
            onOpen={handleProjectOpen}
            onDownload={handleProjectDownload}
            onDelete={handleProjectDelete}
          />
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
        <CommandPanel
          onSubmit={handleCommand}
          isGenerating={isGenerating}
          onStop={handleStop}
        />
      </Paper>
    </Box>
  );
};

export default DashboardLayout;

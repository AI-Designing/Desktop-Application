'use client';

import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemButton,
  IconButton,
  Chip,
  Menu,
  MenuItem
} from '@mui/material';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

interface ProjectFile {
  id: string;
  name: string;
  createdAt: string;
  fileSize: string;
  status: 'completed' | 'failed' | 'processing';
}

interface PreviousWorkPanelProps {
  projects?: ProjectFile[];
  onOpen?: (projectId: string) => void;
  onDownload?: (projectId: string) => void;
  onDelete?: (projectId: string) => void;
}

const PreviousWorkPanel = ({ 
  projects = [], 
  onOpen, 
  onDownload, 
  onDelete 
}: PreviousWorkPanelProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, projectId: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedProjectId(projectId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProjectId(null);
  };

  const handleDownload = () => {
    if (selectedProjectId && onDownload) {
      onDownload(selectedProjectId);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedProjectId && onDelete) {
      onDelete(selectedProjectId);
    }
    handleMenuClose();
  };

  const getStatusColor = (status: string): "success" | "error" | "warning" => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'failed':
        return 'error';
      case 'processing':
        return 'warning';
      default:
        return 'success';
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Previous Work
      </Typography>
      
      {projects.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No previous projects yet. Your completed work will appear here.
        </Typography>
      ) : (
        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {projects.map((project) => (
            <ListItem 
              key={project.id}
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={(e) => handleMenuOpen(e, project.id)}
                >
                  <MoreVertIcon />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => onOpen?.(project.id)}
                sx={{ pr: 6 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                  <FolderIcon color="primary" />
                </Box>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">
                        {project.name}
                      </Typography>
                      <Chip
                        label={project.status}
                        size="small"
                        color={getStatusColor(project.status)}
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {project.createdAt} • {project.fileSize}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDownload}>
          <DownloadIcon sx={{ mr: 1 }} fontSize="small" />
          Download
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PreviousWorkPanel;

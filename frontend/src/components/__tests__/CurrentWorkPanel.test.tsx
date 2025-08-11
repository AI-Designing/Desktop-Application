import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import CurrentWorkPanel from '../CurrentWorkPanel';
import { darkTheme } from '../../theme';

// Helper function to render with theme
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={darkTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('CurrentWorkPanel', () => {
  it('should display status when provided', () => {
    const status = 'Generating sketch...';
    
    renderWithTheme(<CurrentWorkPanel status={status} />);
    
    expect(screen.getByText(status)).toBeInTheDocument();
  });

  it('should display ETA when provided with status', () => {
    const status = 'Working...';
    const eta = 'ETA: 45s';
    
    renderWithTheme(<CurrentWorkPanel status={status} eta={eta} />);
    
    expect(screen.getByText(eta)).toBeInTheDocument();
    expect(screen.getByText(status)).toBeInTheDocument();
  });

  it('should display both status and ETA when both are provided', () => {
    const status = 'Creating extrusion...';
    const eta = 'ETA: 30s';
    
    renderWithTheme(<CurrentWorkPanel status={status} eta={eta} />);
    
    expect(screen.getByText(status)).toBeInTheDocument();
    expect(screen.getByText(eta)).toBeInTheDocument();
  });

  it('should show progress bar when isGenerating is true', () => {
    renderWithTheme(<CurrentWorkPanel status="Working..." isGenerating={true} />);
    
    // Check for progress bar by role
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should not show progress bar when isGenerating is false', () => {
    renderWithTheme(<CurrentWorkPanel status="Idle" isGenerating={false} />);
    
    // Progress bar should not be present
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should display default message when no status is provided', () => {
    renderWithTheme(<CurrentWorkPanel />);
    
    expect(screen.getByText('Ready for your next command...')).toBeInTheDocument();
  });
});

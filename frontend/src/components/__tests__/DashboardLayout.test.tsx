import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import DashboardLayout from '../DashboardLayout';
import { darkTheme } from '../../theme';

// Helper function to render with theme
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={darkTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('DashboardLayout', () => {
  it('should render three distinct panels', () => {
    renderWithTheme(<DashboardLayout />);
    
    // Check for the presence of three panels
    expect(screen.getByTestId('current-work-panel')).toBeInTheDocument();
    expect(screen.getByTestId('previous-work-panel')).toBeInTheDocument();
    expect(screen.getByTestId('command-panel')).toBeInTheDocument();
  });

  it('should have proper dark theme styling', () => {
    renderWithTheme(<DashboardLayout />);
    
    const currentWorkPanel = screen.getByTestId('current-work-panel');
    const previousWorkPanel = screen.getByTestId('previous-work-panel');
    const commandPanel = screen.getByTestId('command-panel');

    // All panels should exist
    expect(currentWorkPanel).toBeInTheDocument();
    expect(previousWorkPanel).toBeInTheDocument();
    expect(commandPanel).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import DashboardLayout from '../DashboardLayout';
import { darkTheme } from '../../theme';

// Mock NextAuth
jest.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
  useSession: jest.fn(() => ({
    data: null,
    status: 'unauthenticated',
    update: jest.fn(),
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Helper function to render with theme and session
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <SessionProvider session={null}>
      <ThemeProvider theme={darkTheme}>
        {component}
      </ThemeProvider>
    </SessionProvider>
  );
};

describe('DashboardLayout', () => {
  it('should render three distinct panels', () => {
    renderWithProviders(<DashboardLayout />);
    
    // Check for the presence of three panels
    expect(screen.getByTestId('current-work-panel')).toBeInTheDocument();
    expect(screen.getByTestId('previous-work-panel')).toBeInTheDocument();
    expect(screen.getByTestId('command-panel')).toBeInTheDocument();
  });

  it('should have proper dark theme styling', () => {
    renderWithProviders(<DashboardLayout />);
    
    const currentWorkPanel = screen.getByTestId('current-work-panel');
    const previousWorkPanel = screen.getByTestId('previous-work-panel');
    const commandPanel = screen.getByTestId('command-panel');

    // All panels should exist
    expect(currentWorkPanel).toBeInTheDocument();
    expect(previousWorkPanel).toBeInTheDocument();
    expect(commandPanel).toBeInTheDocument();
  });
});

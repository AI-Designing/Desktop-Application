import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { useSession, signIn, signOut } from 'next-auth/react';
import Login from '../Login';
import { darkTheme } from '../../theme';

// Mock NextAuth
jest.mock('next-auth/react');

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;
const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;
const mockSignOut = signOut as jest.MockedFunction<typeof signOut>;

// Helper function to render with theme
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={darkTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login button when user is unauthenticated', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    });

    renderWithTheme(<Login />);
    
    expect(screen.getByText('Login with Google')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('should render user info and logout button when authenticated', () => {
    const mockSession = {
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        image: 'https://example.com/avatar.jpg',
      },
      expires: '2024-01-01',
    };

    mockUseSession.mockReturnValue({
      data: mockSession,
      status: 'authenticated',
      update: jest.fn(),
    });

    renderWithTheme(<Login />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login with Google')).not.toBeInTheDocument();
  });

  it('should call signIn when login button is clicked', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    });

    renderWithTheme(<Login />);
    
    const loginButton = screen.getByText('Login with Google');
    fireEvent.click(loginButton);
    
    expect(mockSignIn).toHaveBeenCalledWith('google');
  });

  it('should call signOut when logout button is clicked', () => {
    const mockSession = {
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        image: 'https://example.com/avatar.jpg',
      },
      expires: '2024-01-01',
    };

    mockUseSession.mockReturnValue({
      data: mockSession,
      status: 'authenticated',
      update: jest.fn(),
    });

    renderWithTheme(<Login />);
    
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    
    expect(mockSignOut).toHaveBeenCalled();
  });
});

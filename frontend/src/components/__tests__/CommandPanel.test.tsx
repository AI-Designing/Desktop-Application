import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import CommandPanel from '../CommandPanel';
import { darkTheme } from '../../theme';

// Helper function to render with theme
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={darkTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('CommandPanel', () => {
  it('should render text input and generate button', () => {
    const mockHandleSubmit = jest.fn();
    
    renderWithTheme(<CommandPanel onSubmit={mockHandleSubmit} />);
    
    expect(screen.getByLabelText('Enter your command')).toBeInTheDocument();
    expect(screen.getByText('Generate')).toBeInTheDocument();
  });

  it('should call handleSubmit with input text when Generate button is clicked', () => {
    const mockHandleSubmit = jest.fn();
    
    renderWithTheme(<CommandPanel onSubmit={mockHandleSubmit} />);
    
    const input = screen.getByLabelText('Enter your command');
    const generateButton = screen.getByText('Generate');
    
    // Type in the input
    fireEvent.change(input, { target: { value: 'Create a 20mm cube' } });
    
    // Click the generate button
    fireEvent.click(generateButton);
    
    expect(mockHandleSubmit).toHaveBeenCalledWith('Create a 20mm cube');
  });

  it('should clear input after submission', () => {
    const mockHandleSubmit = jest.fn();
    
    renderWithTheme(<CommandPanel onSubmit={mockHandleSubmit} />);
    
    const input = screen.getByLabelText('Enter your command') as HTMLInputElement;
    const generateButton = screen.getByText('Generate');
    
    // Type in the input
    fireEvent.change(input, { target: { value: 'Create a 20mm cube' } });
    expect(input.value).toBe('Create a 20mm cube');
    
    // Click the generate button
    fireEvent.click(generateButton);
    
    // Input should be cleared
    expect(input.value).toBe('');
  });

  it('should not submit when input is empty', () => {
    const mockHandleSubmit = jest.fn();
    
    renderWithTheme(<CommandPanel onSubmit={mockHandleSubmit} />);
    
    const generateButton = screen.getByText('Generate');
    
    // Click the generate button without entering text
    fireEvent.click(generateButton);
    
    expect(mockHandleSubmit).not.toHaveBeenCalled();
  });
});

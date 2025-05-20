import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoForm from './TodoForm';

describe('TodoForm Component', () => {
  test('renders an input field and an "Add Todo" button', () => {
    const mockAddTodo = jest.fn();
    render(<TodoForm addTodo={mockAddTodo} />);
    
    expect(screen.getByPlaceholderText(/add a new todo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  });

  test('calls addTodo prop with the input value when the form is submitted', () => {
    const mockAddTodo = jest.fn();
    render(<TodoForm addTodo={mockAddTodo} />);
    
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(inputElement, { target: { value: 'New todo item' } });
    fireEvent.click(addButton);

    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith('New todo item');
  });

  test('clears the input field after successful submission', () => {
    const mockAddTodo = jest.fn();
    render(<TodoForm addTodo={mockAddTodo} />);
    
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(inputElement, { target: { value: 'Another todo' } });
    fireEvent.click(addButton);

    expect(inputElement.value).toBe('');
  });

  test('does not call addTodo prop if the input value is empty', () => {
    const mockAddTodo = jest.fn();
    render(<TodoForm addTodo={mockAddTodo} />);
    
    const inputElement = screen.getByPlaceholderText(/add a new todo/i); // Keep its value for check
    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(addButton);
    expect(mockAddTodo).not.toHaveBeenCalled();

    fireEvent.change(inputElement, { target: { value: '   ' } }); // Whitespace
    fireEvent.click(addButton);
    expect(mockAddTodo).not.toHaveBeenCalled();
    expect(inputElement.value).toBe('   '); // Input should retain whitespace value
  });
});

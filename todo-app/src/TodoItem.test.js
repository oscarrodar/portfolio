import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from './TodoItem';

describe('TodoItem Component', () => {
  const mockToggleComplete = jest.fn();
  const mockDeleteTodo = jest.fn();
  
  const defaultTodo = {
    id: 1,
    text: 'Sample Todo Text',
    completed: false,
  };

  const completedTodo = {
    id: 2,
    text: 'Completed Sample Todo',
    completed: true,
  };

  beforeEach(() => {
    // Clear mock call counts before each test
    mockToggleComplete.mockClear();
    mockDeleteTodo.mockClear();
  });

  test('displays the todo text', () => {
    render(<TodoItem todo={defaultTodo} toggleComplete={mockToggleComplete} deleteTodo={mockDeleteTodo} />);
    expect(screen.getByText(defaultTodo.text)).toBeInTheDocument();
  });

  test('calls toggleComplete with the correct id when the "Complete" button is clicked', () => {
    render(<TodoItem todo={defaultTodo} toggleComplete={mockToggleComplete} deleteTodo={mockDeleteTodo} />);
    // The button text is "Complete" when todo.completed is false
    const completeButton = screen.getByRole('button', { name: /complete/i });
    fireEvent.click(completeButton);
    expect(mockToggleComplete).toHaveBeenCalledTimes(1);
    expect(mockToggleComplete).toHaveBeenCalledWith(defaultTodo.id);
  });

  test('calls toggleComplete with the correct id when the "Undo" button is clicked', () => {
    render(<TodoItem todo={completedTodo} toggleComplete={mockToggleComplete} deleteTodo={mockDeleteTodo} />);
    // The button text is "Undo" when todo.completed is true
    const undoButton = screen.getByRole('button', { name: /undo/i });
    fireEvent.click(undoButton);
    expect(mockToggleComplete).toHaveBeenCalledTimes(1);
    expect(mockToggleComplete).toHaveBeenCalledWith(completedTodo.id);
  });
  
  test('calls toggleComplete with the correct id when the todo text is clicked', () => {
    render(<TodoItem todo={defaultTodo} toggleComplete={mockToggleComplete} deleteTodo={mockDeleteTodo} />);
    const todoTextElement = screen.getByText(defaultTodo.text);
    fireEvent.click(todoTextElement);
    expect(mockToggleComplete).toHaveBeenCalledTimes(1);
    expect(mockToggleComplete).toHaveBeenCalledWith(defaultTodo.id);
  });

  test('calls deleteTodo with the correct id when the "Delete" button is clicked', () => {
    render(<TodoItem todo={defaultTodo} toggleComplete={mockToggleComplete} deleteTodo={mockDeleteTodo} />);
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
    expect(mockDeleteTodo).toHaveBeenCalledWith(defaultTodo.id);
  });

  test('applies line-through style when todo.completed is true', () => {
    render(<TodoItem todo={completedTodo} toggleComplete={mockToggleComplete} deleteTodo={mockDeleteTodo} />);
    const todoTextElement = screen.getByText(completedTodo.text);
    expect(todoTextElement).toHaveStyle('text-decoration: line-through');
  });

  test('does not apply line-through style when todo.completed is false', () => {
    render(<TodoItem todo={defaultTodo} toggleComplete={mockToggleComplete} deleteTodo={mockDeleteTodo} />);
    const todoTextElement = screen.getByText(defaultTodo.text);
    expect(todoTextElement).not.toHaveStyle('text-decoration: line-through');
  });
});

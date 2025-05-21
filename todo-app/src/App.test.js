import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders the heading "React Todo App"', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /react todo app/i })).toBeInTheDocument();
  });

  test('allows users to add a new todo', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(inputElement, { target: { value: 'Test new todo' } });
    fireEvent.click(addButton);

    expect(screen.getByText(/test new todo/i)).toBeInTheDocument();
  });

  test('allows users to toggle a todo\'s completion status', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByRole('button', { name: /add todo/i });

    // Add a todo first
    fireEvent.change(inputElement, { target: { value: 'Todo to toggle' } });
    fireEvent.click(addButton);

    const todoTextElement = screen.getByText(/todo to toggle/i);
    // Assuming the "Complete" button is identifiable. In TodoItem, it's the first button.
    // Let's find it by text "Complete".
    const completeButton = screen.getByRole('button', { name: /complete/i });
    fireEvent.click(completeButton);

    // Check if the button text changes to "Undo"
    expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument();
    
    // Optionally, check for style or class if `TodoItem` adds a 'completed' class
    // For example, if TodoItem adds a class `completed` to its root div:
    // expect(todoTextElement.closest('.todo-item')).toHaveClass('completed'); 
    // Or if the text span gets a specific class:
    // expect(todoTextElement).toHaveClass('completed-text');
    // For now, button text change is a good indicator.
    // And check the style directly on the span (as done in TodoItem.js)
    expect(todoTextElement).toHaveStyle('text-decoration: line-through');


    // Toggle back
    fireEvent.click(screen.getByRole('button', { name: /undo/i }));
    expect(screen.getByRole('button', { name: /complete/i })).toBeInTheDocument();
    expect(todoTextElement).not.toHaveStyle('text-decoration: line-through');
  });

  test('allows users to delete a todo', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByRole('button', { name: /add todo/i });

    // Add a todo first
    fireEvent.change(inputElement, { target: { value: 'Todo to delete' } });
    fireEvent.click(addButton);

    const todoTextElement = screen.getByText(/todo to delete/i);
    
    // Find the delete button associated with this todo.
    // In TodoItem, it's the button with text "Delete".
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(todoTextElement).not.toBeInTheDocument();
    // Also check if "No todos yet!" message appears if it was the only one
    // This depends on the number of todos and might be better for a separate test.
  });

  test('does not add empty or whitespace-only todos', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByRole('button', { name: /add todo/i });

    // Try adding an empty todo
    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(addButton);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument(); // Assuming todos are list items

    // Try adding a whitespace-only todo
    fireEvent.change(inputElement, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    // We need to be more specific. Query for any text within the todo item structure.
    // If "No todos yet!" is present, that's a good sign.
    // Let's check if the placeholder "No todos yet!" is present (or if the list is empty)
    // Since App.js will show "No todos yet!" if the list is empty (via TodoList),
    // we can check for that if we ensure no items were added.
    // The simplest is to check that no text content from "   " was added.
    expect(screen.queryByText('   ')).not.toBeInTheDocument();
    // And check if the input is cleared or not based on TodoForm's behavior
    // TodoForm clears input on successful add. If add is blocked, input remains.
    expect(inputElement.value).toBe('   '); 
  });
});

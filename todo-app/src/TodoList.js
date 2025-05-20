import React from 'react';
import TodoItem from './TodoItem'; // Assuming TodoItem will be in the same directory

function TodoList({ todos, toggleComplete, deleteTodo }) {
  if (todos.length === 0) {
    return <p>No todos yet!</p>;
  }

  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id || index} // Prefer todo.id if available, otherwise use index as a fallback
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;

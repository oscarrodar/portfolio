import React from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  const itemStyle = {
    textDecoration: todo.completed ? 'line-through' : 'none',
    cursor: 'pointer', // Optional: to indicate the text itself can be part of the toggle action
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Pushes buttons to the right
    padding: '8px 0', // Some basic styling
    borderBottom: '1px solid #eee' // Separator for items
  };

  return (
    <div style={itemStyle}>
      <span onClick={() => toggleComplete(todo.id)} style={{ flexGrow: 1 }}>
        {todo.text}
      </span>
      <div>
        <button onClick={() => toggleComplete(todo.id)} style={{ marginRight: '5px' }}>
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;

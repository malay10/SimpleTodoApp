import React, { useState } from "react";
import "./App.css";

function Todo({ todo, index, completeTodo, deleteTodo }) {
  const [completeBtnText, changeText] = useState("Complete");

  const handleComplete = (index) => {
    if (completeBtnText === "Complete") {
      changeText("Incomplete");
    } else {
      changeText("Complete");
    }
    completeTodo(index);
  };

  return (
    <div
      className="todo"
      style={
        todo.isComplete
          ? { textDecoration: "line-through", background: "#888" }
          : { textDecoration: "none", background: "#fff" }
      }
    >
      {todo.text}
      <div className="">
        <button onClick={() => handleComplete(index)}>{completeBtnText}</button>
        <button onClick={() => deleteTodo(index)} style={{ color: "red" }}>
          x
        </button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="text"
        value={value}
        placeholder="add todo..."
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  let [todos, setTodos] = useState([
    {
      text: "Learnabout react",
      isComplete: false,
    },
    {
      text: "Party with friends",
      isComplete: false,
    },
    {
      text: "Build Todo app",
      isComplete: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodo = [...todos, { text }];
    setTodos(newTodo);
  };

  const completeTodo = (index) => {
    const newTodo = todos.map((todo, i) => {
      if (index === i) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setTodos(newTodo);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;

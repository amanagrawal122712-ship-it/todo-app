import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const API = "http://localhost:8000/tasks";

  // Fetch tasks
  const getTasks = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Add task
  const addTask = () => {
    if (!text.trim()) return;

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, completed: false })
    })
      .then(res => res.json())
      .then(() => {
        setText("");
        getTasks();
      });
  };

  // Delete task
  const deleteTask = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE"
    }).then(() => getTasks());
  };

  // Toggle complete
  const toggleTask = (task) => {
    fetch(`${API}/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, completed: !task.completed })
    }).then(() => getTasks());
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 Todo App</h1>

        {/* Input */}
        <div style={styles.inputBox}>
          <input
            type="text"
            placeholder="Enter task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addBtn}>
            Add
          </button>
        </div>

        {/* Task List */}
        <div>
          {tasks.map(task => (
            <div key={task._id} style={styles.task}>
              
              <span
                onClick={() => toggleTask(task)}
                style={{
                  ...styles.text,
                  textDecoration: task.completed ? "line-through" : "none",
                  opacity: task.completed ? 0.5 : 1
                }}
              >
                {task.text}
              </span>

              <button
                onClick={() => deleteTask(task._id)}
                style={styles.deleteBtn}
              >
                ❌
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "15px",
    width: "350px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
  },
  title: {
    color: "white",
    textAlign: "center"
  },
  inputBox: {
    display: "flex",
    marginBottom: "20px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none"
  },
  addBtn: {
    marginLeft: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#22c55e",
    color: "white",
    cursor: "pointer"
  },
  task: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#334155",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  text: {
    color: "white",
    cursor: "pointer"
  },
  deleteBtn: {
    background: "red",
    border: "none",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default App;
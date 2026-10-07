import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete DevOps Lab",
      description: "Containerize the Task Management System using Docker.",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      title: "Prepare Project Report",
      description: "Complete the project documentation and submit it.",
      priority: "Medium",
      status: "Pending",
    },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const addTask = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
      priority: priority,
      status: "Pending",
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setDescription("");
    setPriority("Medium");
  };

  const toggleStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Pending" ? "Completed" : "Pending",
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <div className="app">
      <header className="header">
        <h1>Task Management System</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <div className="container">

        {/* Statistics */}
        <div className="stats">
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p>{tasks.length}</p>
          </div>

          <div className="stat-card">
            <h3>Pending</h3>
            <p>{pendingTasks}</p>
          </div>

          <div className="stat-card">
            <h3>Completed</h3>
            <p>{completedTasks}</p>
          </div>
        </div>

        {/* Add Task */}
        <div className="form-card">
          <h2>Add New Task</h2>

          <form onSubmit={addTask}>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>

            <button type="submit">Add Task</button>
          </form>
        </div>

        {/* Task List */}
        <div className="tasks-section">
          <h2>My Tasks</h2>

          {tasks.length === 0 ? (
            <div className="empty">
              <p>No tasks available.</p>
              <p>Add a new task to get started.</p>
            </div>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <div
                  className={`task-card ${
                    task.status === "Completed" ? "completed" : ""
                  }`}
                  key={task.id}
                >
                  <div className="task-content">
                    <div className="task-header">
                      <h3>{task.title}</h3>

                      <span
                        className={`priority ${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <p>{task.description || "No description provided."}</p>

                    <span
                      className={`status ${
                        task.status === "Completed"
                          ? "completed-status"
                          : "pending-status"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <div className="task-actions">
                    <button
                      className="complete-btn"
                      onClick={() => toggleStatus(task.id)}
                    >
                      {task.status === "Pending"
                        ? "Complete"
                        : "Mark Pending"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer>
        <p>Task Management System | DevOps Lab</p>
      </footer>
    </div>
  );
}

export default App;
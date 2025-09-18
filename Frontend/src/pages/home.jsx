import React, { useEffect, useState } from "react";
import AddTask from "../components/addTask"; // ensure filename matches
import Filters from "../components/filters";
import Stats from "../components/stats";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState([]); // start empty, then sync

  // keep a small "activeFilter" key if you want to show which pill is selected
  const [activeFilter, setActiveFilter] = useState("All Tasks");

  // load tasks from backend on mount
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:3000/api/v0/todo/getAllTask");
        if (!res.ok) {
          console.error("Failed fetching tasks:", res.status);
          return;
        }
        const data = await res.json();
        if (data && data.success) setTasks(data.data || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    }
    load();
  }, []);

  // Keep filter synced to tasks when tasks change.
  // If a filter is active, re-apply it to the updated tasks.
  useEffect(() => {
    applyFilter(activeFilter, tasks, setFilter);
  }, [tasks, activeFilter]);

  // add a task to local state (called after successful POST)
  function addTask(task) {
    setTasks((prev) => [task, ...prev]);
    // no need to call setFilter here — useEffect above will reapply filter
  }

  // delete task by id (calls backend then updates state)
  async function deleteTask(taskId) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v0/todo/deleteTask/${taskId}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const err = await res.text();
        console.error("Delete request failed:", res.status, err);
        return;
      }
      const data = await res.json();
      if (data && data.success) {
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
      } else {
        console.error("Delete failed:", data);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  }

  // toggle status between 'pending' and 'completed'
  async function toggleStatus(task) {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    try {
      const res = await fetch(
        `http://localhost:3000/api/v0/todo/updateTask/${task._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: task.task,
            priority: task.priority,
            status: newStatus,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        console.error("Update request failed:", res.status, err);
        return;
      }

      const data = await res.json();
      if (data && data.success) {
        setTasks((prev) => prev.map((t) => (t._id === task._id ? data.data : t)));
      } else {
        console.error("Update failed:", data);
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple1 via-purple2 to-purple1 p-6">
      <div className="w-full max-w-4xl">
        <header className="text-center text-black mb-6">
          <h1 className="text-4xl font-semibold">TaskFlow</h1>
          <p className="opacity-90">
            Streamline your productivity with beautiful task management
          </p>
        </header>

        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10">
          <AddTask onAdd={addTask} />
          <Filters
            tasks={tasks}
            setFilter={(arr) => setFilter(arr)}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
          />

          <div className="py-12 text-center text-black">
            {/* Show helpful message: if no tasks at all, say "No tasks yet".
                If tasks exist but filter returns 0, show "No tasks match filter". */}
            {tasks.length === 0 ? (
              <>
                <h2 className="text-2xl font-semibold">No tasks yet</h2>
                <p className="opacity-90 mt-2">Add your first task above to get started!</p>
              </>
            ) : filter.length === 0 ? (
              <div>
                <h2 className="text-2xl font-semibold">No tasks match the filter</h2>
                <p className="opacity-90 mt-2">Try another filter or add tasks.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filter.map((t) => (
                  <div key={t._id} className="flex items-center justify-between bg-white/3 p-4 rounded-lg">
                    <div>
                      <div className="text-black font-medium">{t.task}</div>
                      <div className="text-sm text-black/70">{t.priority}</div>
                      <div className="text-sm text-black/70">{t.status}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleStatus(t)}
                        className="px-3 py-2 rounded-lg bg-emerald-500 text-white"
                      >
                        {t.status === "completed" ? "Undo" : "Done"}
                      </button>
                      <button
                        onClick={() => deleteTask(t._id)}
                        className="px-3 py-2 rounded-lg bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Stats tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

/* Helper: applyFilter(name, tasks, setFilter)
   - you can move this to a utils file if you want */
function applyFilter(name, tasks, setFilter) {
  if (!name || name === "All Tasks") {
    setFilter([...tasks]);
    return;
  }
  switch (name) {
    case "Pending":
      setFilter(tasks.filter((t) => t.status === "pending"));
      break;
    case "Completed":
      setFilter(tasks.filter((t) => t.status === "completed"));
      break;
    case "High Priority":
      setFilter(tasks.filter((t) => t.priority === "High Priority"));
      break;
    case "Medium Priority":
      setFilter(tasks.filter((t) => t.priority === "Medium Priority"));
      break;
    case "Low Priority":
      setFilter(tasks.filter((t) => t.priority === "Low Priority"));
      break;
    default:
      setFilter([...tasks]);
  }
}

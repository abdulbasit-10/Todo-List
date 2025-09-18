import React, { useState } from "react";

export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("High Priority");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/v0/todo/postTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: title, priority, status: "pending" }),
      });
      const data = await res.json();
      if (data && data.success) {
        // add to UI using returned document
        onAdd(data.data);
        setTitle("");
        setPriority("High Priority");
      } else {
        // show error in console for now
        console.error("Server rejected:", data);
        alert(data.message || "Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Error adding task. See console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="flex gap-4 items-center bg-black/6 p-4 rounded-lg mb-6"
    >
      <input
        className="flex-1 rounded-lg px-4 py-3 focus:outline-none"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="rounded-lg px-3 py-2"
      >
        <option>High Priority</option>
        <option>Medium Priority</option>
        <option>Low Priority</option>
      </select>

      <button
        disabled={loading}
        className="bg-rose-500 px-4 py-2 rounded-lg text-white shadow-sm"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}

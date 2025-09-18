import React from "react";

const pills = [
  "All Tasks",
  "Pending",
  "Completed",
  "High Priority",
  "Medium Priority",
  "Low Priority",
]; 


export default function Filters({ tasks, setFilter }) {
    function handleFilter(pill) {
        if (pill === "All Tasks") {
            setFilter(tasks); }
        else if (pill === "Pending") {
            setFilter(tasks.filter(t => t.status === "pending")); }
        else if (pill === "Completed") {
            setFilter(tasks.filter(t => t.status === "completed")); }
        else if (pill === "High Priority") {
            setFilter(tasks.filter(t => t.priority === "High Priority")); }
        else if (pill === "Medium Priority") {
            setFilter(tasks.filter(t => t.priority === "Medium Priority")); }
        else if (pill === "Low Priority") {
            setFilter(tasks.filter(t => t.priority === "Low Priority")); }  
    }

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {pills.map((p, i) => (
        <button
            onClick={() => handleFilter(p)}
            key={i}
            className="px-4 py-2 rounded-full border border-black/10 text-black/90"
        >
          {p}
        </button>
      ))}
    </div>
  );
}

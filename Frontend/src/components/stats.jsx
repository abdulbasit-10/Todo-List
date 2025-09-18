import React from "react";

export default function Stats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = total - completed;
  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="bg-black/4 rounded-xl p-6 text-center">
        <div className="text-2xl font-bold text-black">{total}</div>
        <div className="text-sm text-black/80">Total Tasks</div>
      </div>

      <div className="bg-black/4 rounded-xl p-6 text-center">
        <div className="text-2xl font-bold text-black">{completed}</div>
        <div className="text-sm text-black/80">Completed</div>
      </div>

      <div className="bg-black/4 rounded-xl p-6 text-center">
        <div className="text-2xl font-bold text-black">{pending}</div>
        <div className="text-sm text-black/80">Pending</div>
      </div>

      <div className="bg-black/4 rounded-xl p-6 text-center">
        <div className="text-2xl font-bold text-black">{completionRate}%</div>
        <div className="text-sm text-black/80">Completion Rate</div>
      </div>
    </div>
  );
}

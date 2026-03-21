import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Calendar = () => {
  const now = new Date();

  const dayName = now.toLocaleString("default", { weekday: "long" });
  const monthName = now.toLocaleString("default", { month: "long" });
  const day = now.getDate();
  const year = now.getFullYear();

  const fullDate = `${dayName}, ${day} ${monthName} ${year}`;

  return (
    <div className="container">
      <div
        className="card shadow mx-auto"
        style={{
          maxWidth: "400px",
          borderRadius: "15px",
          fontFamily: "monospace",
        }}
      >
        <div className="card-body text-center">
          <h5 className="card-title mb-3">📅 Today</h5>
          <h3 className="card-text">{fullDate}</h3>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

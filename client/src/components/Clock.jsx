import React, { useEffect, useState } from "react";
const ClockCard = () => {
  const [time, setTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup timer on unmount
    return () => clearInterval(timer);
  }, []);

  // Format time values
  const format = (val) => val.toString().padStart(2, "0");

  const hours = format(time.getHours());
  const minutes = format(time.getMinutes());
  const seconds = format(time.getSeconds());

  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div >
          <div className="card shadow text-center p-4 rounded">
            <h5 className="mb-3">Current Time</h5>
            <h1 style={{ fontFamily: "monospace", letterSpacing: "2px" }}>
              {hours}:{minutes}:{seconds}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockCard;

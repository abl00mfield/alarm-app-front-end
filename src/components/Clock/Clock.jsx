import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  //we'll want to setTime to be hour/minute/day

  //      setTime(currentTime);

  useEffect(() => {
    const timer = setInterval(() => {
      let amOrPm = "AM";
      let date = new Date();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();

      if (hour > 12) {
        hour = hour - 12;
      }

      if (hour > 12) {
        amOrPm = "PM";
      }

      hour = hour == "0" ? 0 : hour;

      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="elementContainer">
      <h3>Current Time</h3>
      <div className="clockContainer">{time.toLocaleTimeString()}</div>
      {/* //TO-DO: add event handler to button to take user to /alarms-new page*/}
      <button className="add-alarm-btn">Add Alarm</button>
    </div>
  );
};

export default Clock;

// alarm clock logic TODO:

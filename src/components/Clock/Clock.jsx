import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { formatTimeTo12Hour } from "../../utils/timeUtils";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

const Clock = (props) => {
  const [time, setTime] = useState(new Date());

  const [alarmActive, setAlarmActive] = useState(false);
  const audioRef = useRef(null);
  const alarmTimeoutRef = useRef(null);
  const triggeredAlarmsRef = useRef(new Set());

  const triggerAlarm = (alarm) => {
    console.log("alarm is triggered", alarm);
    if (alarm.tone && alarm.tone.fileUrl) {
      const audio = new Audio(`${BASE_URL}${alarm.tone.fileUrl}`);
      audio.loop = true;
      audio.play();
      audioRef.current = audio;
      setAlarmActive(alarm);
      alarmTimeoutRef.current = setTimeout(() => {
        stopAlarm();
      }, 5 * 60 * 1000); //turns the alarm off after 5 min
    }
  };

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.loop = false;
      audioRef.current = null;
    }
    if (alarmTimeoutRef.current) {
      clearTimeout(alarmTimeoutRef.current);
      alarmTimeoutRef.current.null;
    }
    setAlarmActive(null);
  };

  const snoozeAlarm = () => {
    const snoozeDelay = 9 * 60 * 1000; //9 minutes

    stopAlarm();

    alarmTimeoutRef.current = setTimeout(() => {
      triggerAlarm(alarmActive);
    }, snoozeDelay);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      let now = new Date();
      let hour = now.getHours().toString().padStart(2, "0");
      let minute = now.getMinutes().toString().padStart(2, "0");

      const currentTimeStr = `${hour}:${minute}`;

      setTime(now);

      props.alarms.forEach((alarm) => {
        if (
          alarm.time === currentTimeStr &&
          alarm.active &&
          !triggeredAlarmsRef.current.has(alarm._id)
        ) {
          triggerAlarm(alarm);
          triggeredAlarmsRef.current.add(alarm._id);
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      if (alarmTimeoutRef.current) {
        clearTimeout(alarmTimeoutRef.current);
        alarmTimeoutRef.current = null;
      }
    };
  }, [props.alarms]);

  return (
    <div className="elementContainer">
      <h3>Current Time</h3>
      <div className="clockContainer">
        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </div>
      {alarmActive && (
        <div className="active-alarm">
          <p>
            Alarm is ringing:{" "}
            <strong>
              {alarmActive.name || formatTimeTo12Hour(alarmActive.time)}
            </strong>
          </p>
          <button onClick={stopAlarm} className="stop-alarm-btn">
            Stop Alarm
          </button>
          {alarmActive.snoozeOn && (
            <button onClick={snoozeAlarm} className="snooze-alarm-btn">
              Snooze 9 Min
            </button>
          )}
        </div>
      )}
      <li>
        <Link to="/alarms/new">Add Alarm</Link>
      </li>
    </div>
  );
};

export default Clock;

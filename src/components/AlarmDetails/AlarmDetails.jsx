const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;
import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useParams, Link } from "react-router";
import * as alarmService from "../../services/alarmService";
import Clock from "../Clock/Clock";


const AlarmDetails = (props) => {
  const [alarm, setAlarm] = useState(null);
  const { alarmId } = useParams();
  const { user } = useContext(UserContext);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchAlarm = async () => {
      const alarmData = await alarmService.show(alarmId);
      setAlarm(alarmData);
    };
    fetchAlarm();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [alarmId]);

  const playTone = () => {
    if (alarm?.tone?.fileUrl) {
      const audio = new Audio(`${BASE_URL}${alarm.tone.fileUrl}`);
      audioRef.current = audio;
      audio.play().catch((err) => console.error("Error playing tone: ", err));
    }
  };

  const stopTone = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  if (!alarm) return <main>Loading.....</main>;

  return (
    <main>
        <h1>{alarm.time}</h1>
        <h2>Name: {alarm.name}</h2>
        <h2>Tone: {alarm.tone?.toneName}</h2>
        {alarm.snoozeOn ? <h2>Snooze is on </h2> : <h2>Snooze is off</h2>}
        {alarm.active ? <h2>Alarm is on </h2> : <h2>Alarm is off</h2>}
        <div>
          <button onClick={playTone}> ▶️ Play Tone</button>
          <button onClick={stopTone}>⏹️ Stop Tone</button>
        </div>
        {alarm.owner._id === user._id && (
          <>
            <Link to={`/alarms/${alarmId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteAlarm(alarmId)}>
              Delete
            </button>
          </>
        )}
    </main>
  );
};
export default AlarmDetails;

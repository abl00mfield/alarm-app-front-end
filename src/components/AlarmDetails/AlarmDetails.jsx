import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useParams, Link } from "react-router";
import * as alarmService from "../../services/alarmService";

const AlarmDetails = (props) => {
  const [alarm, setAlarm] = useState(null);
  const { alarmId } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAlarm = async () => {
      const alarmData = await alarmService.show(alarmId);
      setAlarm(alarmData);
    };
    fetchAlarm();
  }, [alarmId]);

  if (!alarm) return <main>Loading.....</main>;

  return (
    <main>
      <h1>{alarm.name}</h1>
      <h2>Time: {alarm.time}</h2>
      <h2>Tone: {alarm.tone?.toneName}</h2>
      {alarm.snoozeOn ? <h2>Snooze is on </h2> : <h2>Snooze is off</h2>}
      {alarm.active ? <h2>Alarm is on </h2> : <h2>Alarm is off</h2>}
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

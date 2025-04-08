import { Link } from "react-router";

const AlarmList = ({ alarms }) => {
  return (
    <main>
      {alarms.map((alarm) => (
        <Link key={alarm._id} to={`/alarms/${alarm._id}`}>
          <div>
            <h2>Name: {alarm.name}</h2>
            <p>Time: {alarm.time}</p>
            {alarm.snoozeOn ? <p>Snooze is on</p> : <p>Snooze is off</p>}
            {alarm.active ? <p>Alarm is active</p> : <p>Alarm is not active</p>}
            <p>Tone name: {alarm.tone?.toneName}</p>
          </div>
        </Link>
      ))}
    </main>
  );
};

export default AlarmList;

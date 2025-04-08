import { Link } from "react-router";
//what do we want to display in our list of all alarms?
const AlarmList = ({ alarms }) => {
  return (
    <main>
      {alarms.map((alarm) => (
        <Link key={alarm._id} to={`/alarms/${alarm._id}`}>
          <div>
            <h2>{alarm.time}</h2>
            <p>Name: {alarm.name}</p>
            {/* {alarm.snoozeOn ? <p>Snooze is on</p> : <p>Snooze is off</p>} */}
            {alarm.active ? <p>Alarm is active</p> : <p>Alarm is not active</p>}
            {/* <p>Tone name: {alarm.tone?.toneName}</p> */}
          </div>
        </Link>
      ))}
    </main>
  );
};

export default AlarmList;

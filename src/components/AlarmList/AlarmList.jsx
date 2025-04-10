import { Link } from "react-router";
import { formatTimeTo12Hour } from "../../utils/timeUtils";
import Clock from "../Clock/Clock";
import styles from "./AlarmList.module.css"

//what do we want to display in our list of all alarms?
const AlarmList = ({ alarms }) => {
  return (
    <main>
      <Clock alarms={alarms} />
      <div className={styles.alarmContainer}>
        {alarms.map((alarm) => (
          <Link key={alarm._id} to={`/alarms/${alarm._id}`}>
            <div className={styles.singleAlarm}>
              <h2>{formatTimeTo12Hour(alarm.time)}</h2>
              <p>Name: {alarm.name}</p>
              {/* {alarm.snoozeOn ? <p>Snooze is on</p> : <p>Snooze is off</p>} */}
              {alarm.active ? (
                <p>Alarm is active</p>
              ) : (
                <p>Alarm is not active</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default AlarmList;

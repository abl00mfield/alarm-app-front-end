import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as alarmService from "../../services/alarmService";
import Clock from "../Clock/Clock";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [alarms, setAlarms] = useState([]); //we will keep track of the alarms

  useEffect(() => {
    //lets fetch all the current user's alarms and pass down to the clock component so it has access to them
    const fetchAlarms = async () => {
      try {
        const fetchedAlarms = await alarmService.index();
        setAlarms(fetchedAlarms);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) fetchAlarms();
    console.log("alarms: ", alarms);
  }, [user]);

  console.log(alarms);
  return (
    <main>
      <button className="snooze-btn">Change Theme</button>
      <h1>Alarm Mate</h1>
      <p>
        Do you have trouble keeping track of time? If so, you're not alone. Keep
        track of time with [APP NAME] by setting custom alarms. Need an alarm to
        remind you to take the chicken out of the freezer before your mom gets
        home? We got you. Or what about an alarm to remind you to get your butt
        out of bed so that you can go on that pre-work run? We've got you
        covered there too. Never run late again with [APP NAME].
      </p>
      <div>
        {/* we will pass down the current user's alarms to this component */}
        <Clock />
      </div>
      <div></div>
    </main>
  );
};

export default Dashboard;

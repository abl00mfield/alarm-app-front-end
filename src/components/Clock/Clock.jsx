import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Clock = (props) => {
    const [time, setTime] = useState(new Date());
    const [alarmTime, setAlarmTime] = useState()
    const [alarmActive, setAlarmActive] = useState(false);
    //we'll want to setTime to be hour/minute/day



    useEffect(() => {
        const timer = setInterval(() => {
          let amOrPm = "AM";
          let date = new Date();
          let hour = date.getHours();
          let minute = date.getMinutes();
          let second = date.getSeconds();

          if(hour > 12){
            hour = hour - 12;
          }

          if(hour > 12){
            amOrPm = "PM";
          }

          hour = hour == '0' ? 0 : hour;

          minute = minute < 10 ? '0' + minute : minute;
          second = second < 10 ? '0' + second : second;
          setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
      }, []);

      

      return (
          <div className='elementContainer'>
            <h3>Current Time</h3>
            <div className='clockContainer'>
                {time.toLocaleTimeString()}
            </div>
            {/* //TO-DO: add event handler to button to take user to /alarms-new page*/}
            {/* <button className='add-alarm-btn'>Add Alarm</button> */}
            <li><Link to='/alarms/new'>Add Alarm</Link></li>
          </div>
      );
}

export default Clock

// alarm clock logic TODO: 
      //we will need to check the time against any alarms that are set and active in the database
      //first check to see if an alarm is currently active
      //then use if statement to check if hour and minute on clock match the alarm's values
      //if these have been met, play the tone associated with that alarmID
import { useEffect, useState } from 'react';

const Clock = () => {
    // const [time, setTime] = useState(new Date());;
    const initialState = '00:00:00'
    const [time, setTime] = useState(initialState)
    //we'll want to setTime to be hour/minute/day

    // //setInterval(() => {
          let am;
          let date = new Date();
          hour = date.getHours();
          minute = date.getMinutes();
          second = date.getSeconds();

          if(hour > 12){
            hour = hour - 12;
          }

          if(hour > 12){
            am = false;
          }else{
            am = false;
          }

          hour = 
    //   })

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //       setTime(new Date());
    //     }, 1000);
    //     return () => clearInterval(timer);
    //   }, []);

      return (
          <div className='elementContainer'>
            <h3>Current Time</h3>
            <div className='clockContainer'>
                {time.toLocaleTimeString()}
            </div>
            {/* //TO-DO: add event handler to button to take user to /alarms-new page*/}
            <button className='add-alarm-btn'>Add Alarm</button>
          </div>
      );
}

export default Clock

// alarm clock logic TODO: 
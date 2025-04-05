import { useEffect, useState } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());;

    useEffect(() => {
        const timer = setInterval(() => {
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
            {/* //TO-DO: add event handler to button to take user to /alarms-new page */}
            <button className='add-alarm-btn'>Add Alarm</button>
          </div>
      );
}

export default Clock
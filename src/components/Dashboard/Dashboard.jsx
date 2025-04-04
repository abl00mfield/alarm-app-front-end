import { useEffect, useState, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

  return (
    <main>
      <button className='snooze-btn'>Change Theme</button>
      <h1>APP NAME</h1>
      <p>Do you have trouble keeping track of time? If so, you're not alone. Keep track of time with [APP NAME] by setting custom alarms. 
        Need an alarm to remind you to take the chicken out of the freezer before your mom gets home? We got you. 
        Or what about an alarm to remind you to get your butt out of bed so that you can go on that pre-work run? We've got you covered there too. 
        Never run late again with [APP NAME].</p>
        <div>
        //clock goes here//
        </div>
        {/* //TO-DO: add event handler to button to take user to /alarms-new page */}
        <button className='add-alarm-btn'>Add Alarm</button>
    </main>
  );
};

export default Dashboard;

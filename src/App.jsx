import { useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import AlarmForm from './components/AlarmForm/AlarmForm';

import * as alarmService from '../../services/alarmService'
import { UserContext } from './contexts/UserContext';

function App() {
  const { user } = useContext(UserContext);
  const [alarms, setAlarms] = useState([]);
  const navigate = useNavigate();

  // handleAddAlarm to go to /alarms
  const handleAddAlarm = async (alarmFormData) => {
    console.log('alarmFormData: ', alarmFormData);
    const newAlarm = await alarmService.create(alarmFormData);
    setAlarms([newAlarm, ...alarms]);
    navigate('/alarms');
  };

  const handleDeleteAlarm = async (alarmId) => {
    const deletedAlarm = await alarmService.deleteAlarm(alarmId);
    setAlarms(alarms.filter((alarm) => alarm.id !== deletedAlarm._id));
    navigate('/alarms');
  };

  const handleUpdateAlarm = async (alarmId, alarmFormData) => {
    const updatedAlarm = await alarmService.updateAlarm(alarmId, alarmFormData);
    setAlarms((alarms.map((alarm) => alarmId === alarm._id ? updatedAlarm : alarm)));

    navigate(`/alarms/${alarmId}`);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/alarms/new' element={<AlarmForm handleAddAlarm={handleAddAlarm} />} />
            <Route path='/alarms/:alarmId' element={<AlarmDetails handleDeleteAlarm={handleDeleteAlarm} />} />
            <Route path='/alarms/:alarmId/edit' element={<AlarmForm handleUpdateAlarm={handleUpdateAlarm} />} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
            <Route path='/alarms' element={<AlarmForm />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;

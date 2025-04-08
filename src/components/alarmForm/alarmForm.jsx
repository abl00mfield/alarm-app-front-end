import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ToneSelector from "../ToneSelector/ToneSelector";
import * as alarmService from "../../services/alarmService";

const AlarmForm = (props) => {
  const { alarmId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    time: "",
    tone: "",
    snoozeOn: false,
    active: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target; //destructure these out for easier handling
    setFormData({
      ...formData,
      [name]:
        name === "snoozeOn" || name === "active" ? value === "true" : value, //we have to convert the value of the string "true" to an actual boolean
    });
  };

  //use for scaffolding alarm submit fn
  const handleSubmit = (event) => {
    event.preventDefault();

    if (alarmId) {
      props.handleUpdateAlarm(alarmId, formData);
    } else {
      props.handleAddAlarm(formData);
    }
  };

  useEffect(() => {
    const fetchAlarm = async () => {
      const alarmData = await alarmService.show(alarmId);
      setFormData({ ...alarmData, tone: alarmData.tone?._id || "" });
    };
    if (alarmId) fetchAlarm();
    //clean up function
    return () =>
      setFormData({
        name: "",
        time: "",
        tone: "",
        snoozeOn: false,
        active: true,
      });
  }, [alarmId]);

  return (
    <main>
      <h1>{alarmId ? "Edit Alarm" : "New Alarm"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">Name</label>
        <input
          required
          type="text"
          name="name"
          id="name-input"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="time">Time</label>
        <input
          required
          type="time"
          name="time"
          id="time"
          value={formData.time}
          onChange={handleChange}
        />
        <ToneSelector
          selectedTone={formData.tone}
          handleChange={handleChange}
        />
        <div>
          <label htmlFor="snoozeOn">Snooze:</label>
          <label htmlFor="snoozeOn-on">
            <input
              type="radio"
              name="snoozeOn"
              id="snoozeOn-on"
              value="true"
              checked={formData.snoozeOn === true}
              onChange={handleChange}
            />
            On
          </label>
          <label htmlFor="snoozeOn-off">
            <input
              type="radio"
              name="snoozeOn"
              id="snoozeOn-off"
              value="false"
              checked={formData.snoozeOn === false}
              onChange={handleChange}
            />
            Off
          </label>
        </div>
        {alarmId && (
          <div>
            <label htmlFor="active">Alarm on:</label>
            <label htmlFor="active-on">
              <input
                type="radio"
                id="active-on"
                name="active"
                value="true"
                checked={formData.active === true}
                onChange={handleChange}
              />
              On
            </label>
            <label htmlFor="active-off">
              <input
                type="radio"
                id="active-off"
                name="active"
                value="false"
                checked={formData.active === false}
                onChange={handleChange}
              />
              Off
            </label>
          </div>
        )}
        {alarmId ? (
          <button type="submit">Edit Alarm</button>
        ) : (
          <button type="submit">Add Alarm</button>
        )}
      </form>
    </main>
  );
};

export default AlarmForm;

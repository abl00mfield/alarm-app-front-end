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
      [name]: name === "snoozeOn" ? value === "true" : value, //we have to convert the value of the string "true" to an actual boolean
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

  return (
    <main>
      <h1>{alarmId ? "Edit Alarm" : "New Alarm"}</h1>
      <h2>Add New Alarm</h2>
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
        <label htmlFor="hour">Hour</label>
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
          <label>
            <input
              type="radio"
              name="snoozeOn"
              id="snoozeOn"
              value="true"
              checked={formData.snoozeOn === true}
              onChange={handleChange}
            />
            On
          </label>
          <label>
            <input
              type="radio"
              name="snoozeOn"
              id="snoozeOn"
              value="false"
              checked={formData.snoozeOn === false}
              onChange={handleChange}
            />
            Off
          </label>
        </div>

        <button type="submit">Add Alarm</button>
      </form>
    </main>
  );
};

export default AlarmForm;

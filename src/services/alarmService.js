const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/alarms`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (err) {
    console.error(error);
  }
};

//POST creating a new alarm /alarms
const create = async (alarmFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alarmFormData),
    });
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

//GET show route, show a single alarm
//alarm/:alarmId
const show = async (alarmId) => {
  try {
    const res = await fetch(`${BASE_URL}/${alarmId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (err) {
    console.error(error);
  }
};

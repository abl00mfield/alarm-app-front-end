import { useEffect, useState, useRef } from "react";
import { index } from "../../services/toneService";
const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const ToneSelector = ({ selectedTone, handleChange }) => {
  const [tones, setTones] = useState([]);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchTones = async () => {
      try {
        const fetchedTones = await index(); //call the tones service function
        if (fetchedTones.length === 0) {
          throw new Error("no tones in database");
        }
        setTones(fetchedTones); //set the state variable to the fetched tones
        setLoading(false); //if this takes time, a loading message will show to user
      } catch (err) {
        console.error("Error fetching tones", err.message);
        setLoading(false);
      }
    };
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    fetchTones(); //fetch the tones when the component loads
  }, []); //no dependency array

  if (loading) return <p>Loading tones...</p>;

  const handleToneChange = (event) => {
    const selectedId = event.target.value;
    handleChange(event); //call the parent event handler

    //stop current audio if any
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const selectedToneObj = tones.find((tone) => tone._id === selectedId);

    if (selectedToneObj && selectedToneObj.fileUrl) {
      const audioPreview = new Audio(`${BASE_URL}${selectedToneObj.fileUrl}`);
      audioRef.current = audioPreview;
      audioPreview.play();

      timeoutRef.current = setTimeout(() => {
        audioPreview.pause();
        audioPreview.currentTime = 0;
      }, 5000);
    }
  };

  return (
    <>
      <label htmlFor="tone">Select a tone:</label>
      <select
        name="tone"
        id="tone"
        value={selectedTone}
        onChange={handleToneChange}
      >
        <option value="" disabled>
          Select a tone
        </option>
        {tones.map((tone) => (
          <option key={tone._id} value={tone._id}>
            {tone.toneName}
          </option>
        ))}
      </select>
    </>
  );
};

export default ToneSelector;

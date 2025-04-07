import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import ToneSelector from "../ToneSelector/ToneSelector";
import * as alarmService from '../../services/alarmService'

const AlarmForm = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        time: '',
        tone: ''
    })

    const handleChange = (event) => {
        setFormData({
            ...formData, 
            [event.target.name]: event.target.value
        })
    }

    //use for scaffolding alarm submit fn
    const handleSubmit = (event) => {
        event.preventDefault();
        if(alarmId) {
            props.handleUpdateAlarm(alarmId, formData)
        }else{
            props.Alarm(formData);
        }
    }

      useEffect(() => {
        const fetchAlarm = async () => {
            const alarmData = await alarmService.show(alarmId)
            setFormData(alarmData);
        }
        if(alarmId) fetchAlarm();
    
        return () => {
            setFormData({name: '', time: '', tone: ''})
        }
    }, [alarmId])


    return(
        <main>
            <h2>Add New Alarm</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name-input'>Name</label>
                <input 
                    required
                    type='text'
                    name='name'
                    id='name-input'
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor='hour'>Hour</label>
                <input
                    required
                    type='time'
                    name='time'
                    id='time'
                    value={formData.time}
                    onChange={handleChange}
                />
                <ToneSelector selectedTone={formData.tone} handleChange={handleChange}/>  
                <button type='submit'>Add Alarm</button> 
            </form>
        </main>
    )
}

export default AlarmForm
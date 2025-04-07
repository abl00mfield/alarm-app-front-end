import { useState } from "react"
import ToneSelector from "../ToneSelector/ToneSelector"

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
        console.log('testing')
    }

    //console.log('this is the alarm form')
    return(
        <main>
            <h2>Add New Alarm</h2>
            {/* <h1>{hootId ? 'Edit Hoot' : 'New Hoot'}</h1> */}
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
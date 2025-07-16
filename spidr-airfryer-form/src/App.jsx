import React, { useState } from 'react';
import './App.css';

import PinInput from './components/PinInput.jsx';
import { InputMask } from '@react-input/mask';
function App() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    costGuess: '',
    pin: ''
  });

  const [pinError, setPinError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === 'pin') {
      setPinError(false); // clear error on typing
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (form.pin.length !== 16) {
    //   setPinError(true);
    //   return;
    // }
    console.log(form);
  };

  return (
    <div className='app'>
      <div className="form-container">
        <h1>Reserve Your Air Fryer</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First name" onChange={handleChange} required/>
          <input name="lastName" placeholder="Last name" onChange={handleChange} required />
          {/* <input name="phone" placeholder="Phone number" onChange={handleChange} required /> */}
          <InputMask 
            name="phone" 
            placeholder="Phone number" 
            onChange={handleChange} 
            mask="(___)-___-____" 
            replacement={{ _: /\d/ }} 
            pattern=".{14}"
            onInvalid={(e) => {
              // e.preventDefault();
              e.target.setCustomValidity("Please enter a a valid phone number in format (123)-456-7890");
            }}
            onInput={(e) => e.target.setCustomValidity("")}
          />

          <input name="email" type="email" placeholder="Email address" onChange={handleChange} required />
          
          <input 
            name="costGuess" 
            type="number" 
            min="0"
            placeholder="Guess the air fryer’s cost (USD)" 
            onChange={handleChange} required 
             onInvalid={(e) => {
              // e.preventDefault();
              e.target.setCustomValidity("Please enter a 16-digit PIN in format 1234-5678-9012-3456");
            }}
            onInput={(e) => e.target.setCustomValidity("")}
          />

          <PinInput onChange={handleChange}/>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    
  );
}

export default App;

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="form-container">
      <h2>Reserve Your Air Fryer</h2>
      <form onSubmit={handleSubmit}>
        <InputMask mask="____-____-____-____" replacement={{ _: /\d/ }} placeholder="####" showMask={true}/>
        <input name="firstName" placeholder="First name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last name" onChange={handleChange} required />
        <input name="phone" placeholder="Phone number" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email address" onChange={handleChange} required />
        <input name="costGuess" type="number" placeholder="Guess the air fryer’s cost" onChange={handleChange} required />
        <PinInput toggle name="pin" onChange={handleChange}/>
        {/* <div className="pin-field">
          <input
            name="pin"
            placeholder="####-####-####-####"
            value={showPin ? formatPin(form.pin) : '•'.repeat(formatPin(form.pin).length)}
            onChange={handlePinChange}
            inputMode="numeric"
            maxLength={formatPin(form.pin).length}
            required
          />
          <span className="eye-icon" onClick={() => setShowPin(!showPin)}>
            {showPin ? <FiEyeOff /> : <FiEye />}
          </span>
        </div> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

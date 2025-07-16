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

  const [error, setError] = useState({
    phone: false,
    email: false,
    costGuess: false,
    pin: false
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError(prev => ({ ...prev, [name]: false })); // clear field error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {
      firstName: false,
      lastName: false,
      phone: false,
      email: false,
      costGuess: false,
      pin: false
    };

    // Basic validation
    if (form.firstName.trim() === '') errors.firstName = true;
    if (form.lastName.trim() === '') errors.lastName = true;
    if (form.phone.length < 14) errors.phone = true;
    if (!form.email.includes('@')) errors.email = true;
    if (form.costGuess === '' || Number(form.costGuess) < 0) errors.costGuess = true;
    if (form.pin.length !== 16) errors.pin = true;

    const hasErrors = Object.values(errors).some(Boolean);

    if (hasErrors) {
      setError(errors);
      setFormSubmitted(false);
      return;
    }

    // ✅ All good
    console.log(form);
    setFormSubmitted(true);

    // Reset form
    setForm({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      costGuess: '',
      pin: ''
    });

    // reset success after 3 seconds
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="app">
      <div className="form-container">
        <h1>Reserve Your Air Fryer</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs-div">
          {/* first name */}
          <input 
            type="text" 
            name="firstName" 
            placeholder="First name" 
            onChange={handleChange}
            className={error.firstName ? 'input-error' : ''}
            value={form.firstName || ''}
          />
          {error.firstName && <div className="error-message">First name is required</div>}
          
          {/* last name */}
          <input 
            type="text" 
            name="lastName" 
            placeholder="Last name" 
            onChange={handleChange}
            className={error.firstName ? 'input-error' : ''}
            value={form.lastName || ''}
          />
          {error.lastName && <div className="error-message">Last name is required</div>}
          
          {/* phone number */}
          <InputMask
            name="phone"
            placeholder="Phone number"
            onChange={handleChange}
            mask="(___)-___-____"
            replacement={{ _: /\d/ }}
            className={error.phone ? 'input-error' : ''}
            value={form.phone || ''}
          />
          {error.phone && <div className="error-message">Enter a valid phone number (e.g. (123)-456-7890)</div>}

          {/* email */}
          <input
            name="email"
            type="text"
            placeholder="Email address"
            onChange={handleChange}
            className={error.email ? 'input-error' : ''}
            value={form.email || ''}
          />
          {error.email && <div className="error-message">Enter a valid email address</div>}

          {/* cost guess */}
          <input
            name="costGuess"
            type="number"
            placeholder="Guess the air fryer cost"
            onChange={handleChange}
            className={error.costGuess ? 'input-error' : ''}
            value={form.costGuess || ''}
          />
          {error.costGuess && <div className="error-message">Enter a valid price</div>}
          
          {/* pin input */}
          <PinInput 
            onChange={handleChange} 
            error={error.pin} 
            value = {form.pin || ''}
          />
          {error.pin && <div className="error-message">PIN must be exactly 16 digits (format: 1234-5678-9012-3456)</div>}
          </div>
          {/* submit button */}
          <button type="submit">Submit</button>
        </form>
      </div>
      {/* Success message */}
      {formSubmitted && (
        <div className="success-message">
          Form submitted
        </div>
      )}
    </div>
  );
}

export default App;

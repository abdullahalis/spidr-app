import React, { useState } from 'react';
import './App.css';

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

    // Auto-format PIN
    if (name === 'pin') {
      let cleaned = value.replace(/[^0-9]/g, '').slice(0, 16);
      let formatted = cleaned.match(/.{1,4}/g)?.join('-') || '';
      setForm({ ...form, [name]: formatted });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log(form);
  };

  return (
    <div className="form-container">
      <h2>Reserve Your Air Fryer</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last name" onChange={handleChange} required />
        <input name="phone" placeholder="Phone number" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email address" onChange={handleChange} required />
        <input name="costGuess" type="number" placeholder="Guess the air fryer’s cost" onChange={handleChange} required />
        <input name="pin" placeholder="####-####-####-####" onChange={handleChange} value={form.pin} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { InputMask } from '@react-input/mask'

// const formatPin = (pin) => {
//   // Format: 1234-5678-1234-5678
//   return pin
//     .replace(/\D/g, '')             // remove non-digits
//     .slice(0, 16)                   // limit to 16 digits
//     .match(/.{1,4}/g)               // split every 4 chars
//     ?.join('-') || '';             // join with dashes
// };

// const unformatPin = (formatted) => {
//   return formatted.replace(/\D/g, '').slice(0, 16); // just digits
// };

// const PinInput = ({ value, onChange }) => {
//   const [showPin, setShowPin] = useState(false);
//   const [rawPin, setRawPin] = useState('');
//   const [displayValue, setDisplayValue] = useState('');

//   const handleChange = (e) => {
//     const input = e.target.value;
//     const unformatted = unformatPin(input);        // store raw digits
//     const formatted = formatPin(unformatted);      // update display

//     setRawPin(unformatted);
//     setDisplayValue(formatted);
//   };

//   // Sync rawPin to parent
//   useEffect(() => {
//     onChange?.({ target: { name: 'pin', value: rawPin } });
//   }, [rawPin]);

//   return (
//     <div className="pin-field" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//       <input
//         name="pin-input"
//         placeholder="1234-5678-9012-3456"
//         value={displayValue}
//         onChange={handleChange}
//         inputMode="numeric"
//         maxLength={19} // includes dashes
//         type={showPin ? 'text' : 'password'}
//         required
//         style={{ letterSpacing: '2px' }}
//       />
//       <div className="eye-icon" onClick={() => setShowPin(!showPin)} style={{ cursor: 'pointer' }}>
//         {showPin ? <FiEyeOff /> : <FiEye />}
//       </div>
//     </div>
//   );
// };

// const PinInput = ({ value, onChange }) => {
//   const [showPin, setShowPin] = useState(false);
//   const [rawPin, setRawPin] = useState('');
//   const [displayValue, setDisplayValue] = useState('');

//   const handleChange = (e) => {
//     const input = e.target.value;
//     const unformatted = unformatPin(input);        // store raw digits
//     const formatted = formatPin(unformatted);      // update display

//     setRawPin(unformatted);
//     setDisplayValue(formatted);
//   };


//   return (
//     <div className="pin-field" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//       <inputMask
//         name="pin-input"
//         mask="*****-****-****-****"
//         replacement={{ _: /\d/ }}
//         placeholder="1234-5678-9012-3456"
//         value={value}
//         onChange={onChange}
//         inputMode="numeric"
//         maxLength={19} // includes dashes
//         type={showPin ? 'text' : 'password'}
//         required
//         style={{ letterSpacing: '2px' }}
//       />
//       <div className="eye-icon" onClick={() => setShowPin(!showPin)} style={{ cursor: 'pointer' }}>
//         {showPin ? <FiEyeOff /> : <FiEye />}
//       </div>
//     </div>
//   );
// };

// export default PinInput;

const formatPin = (str, show) =>
  str
    .split("")
    .map((l, i) => {
      if (i === 2 || i === 4) return show ? `${l}-` : "*-";
      if (i < 5 && !show) return "*";
      return l;
    })
    .join("");

const PinInput = props => {
  const {
    toggle = false,
    value: pin = undefined,
    onChange = null,
    InputProps = {},
    ...other
  } = props;
  const [text, setText] = useState(pin || "");
  const [show, setShow] = useState(false);
  const value = formatPin(pin === undefined ? text : pin, show);

  const update = (name, value) => {
    setText(value);
    if (onChange) {
      onChange({ target: { name, value } });
    }
  };

  const keyChange = e => {
    const {
      keyCode,
      key,
      target: { name }
    } = e;
    if ([9, 13].includes(keyCode)) return;
    if (keyCode === 8) {
      return text.length && update(name, text.slice(0, -1));
    }
    if (!/^\d+$/.test(key)) return;
    if (text.length === 9) return;
    update(name, text + key);
  };

  return (
    <div className="pin-field" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <input
        name="pin-input"
        placeholder="1234-5678-9012-3456"
        value={value}
        onKeyDown = {keyChange}
        // inputMode="numeric"
        // maxLength={19} // includes dashes
        // type={showPin ? 'text' : 'password'}
        required
        style={{ letterSpacing: '2px' }}
      />
      <div className="eye-icon" onClick={() => setShow(!show)} style={{ cursor: 'pointer' }}>
        {show ? <FiEyeOff /> : <FiEye />}
      </div>
    </div>

    // <TextField
    //   {...other}
    //   value={value}
    //   onKeyDown={keyChange}
    //   InputProps={{
    //     ...InputProps,
    //     endAdornment: toggle && (
    //       <InputAdornment position="end">
    //         <IconButton
    //           aria-label="toggle pin visibility"
    //           onClick={() => setShow(!show)}
    //           onMouseDown={e => e.preventDefault()}
    //         >
    //           {show ? <VisibilityOff /> : <Visibility />}
    //         </IconButton>
    //       </InputAdornment>
    //     )
    //   }}
    // />
  );
};

export default PinInput;

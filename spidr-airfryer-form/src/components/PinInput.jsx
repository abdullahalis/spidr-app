import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const formatPin = (str, show) =>
  str
    .split("")
    .map((l, i) => {
      if (i === 3 || i === 7 || i === 11) return show ? `${l}-` : '•-';
      if (!show) return '•';
      return l;
    })
    .join("");

const PinInput = props => {
  const {
    value: pin = undefined,
    onChange = null,
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

  // const keyChange = e => {
  //   const {
  //     keyCode,
  //     key,
  //     target: { name, selectionStart, selectionEnd, value }
  //   } = e;
  //   if ([9, 13].includes(keyCode)) return;
  //   if (keyCode === 8) {
  //     if (selectionStart === selectionEnd) {
  //       return text.length && update(name, text.slice(0, -1));
  //     }
  //     else {
  //       const newText = text.slice(0, selectionStart) + text.slice(selectionEnd);
  //       return  update(name, newText);
  //     }
  //   }
  //   if (!/^\d+$/.test(key)) return;
  //   if (text.length === 16) return;
  //   update(name, text + key);
  // };

  // Maps the cursor position in formatted string to index in raw digits
  const getRawIndex = (formatted, cursorPos) => {
    let rawIndex = 0;
    for (let i = 0; i < cursorPos; i++) {
      if (formatted[i] !== '-') {
        rawIndex++;
      }
    }
    return rawIndex;
  };


  const keyChange = (e) => {
    const {
      keyCode,
      key,
      target: { name, selectionStart, selectionEnd, value }
    } = e;
    console.log("keyChange", keyCode, key, name, selectionStart, selectionEnd, value);
    const isDigit = /^\d$/.test(key);
    const hasSelection = selectionStart !== selectionEnd;

    const rawIndexStart = getRawIndex(value, selectionStart);
    const rawIndexEnd = getRawIndex(value, selectionEnd);
    console.log("rawIndexStart", rawIndexStart, "rawIndexEnd", rawIndexEnd);
    // // ✅ Let Tab (9) and Enter (13) behave normally
    // if ([9, 13].includes(keyCode)) return;

    // Prevent default browser behavior to keep control
    // e.preventDefault();

    // Handle backspace
    if (keyCode === 8) {
      if (hasSelection) {
        const newRaw = text.slice(0, rawIndexStart) + text.slice(rawIndexEnd);
        return update(name, newRaw);
      } else if (rawIndexStart > 0) {
        const newRaw =
          text.slice(0, rawIndexStart - 1) + text.slice(rawIndexStart);
        return update(name, newRaw);
      }
      return;
    }

    // Handle delete
    if (keyCode === 46) {
      if (hasSelection) {
        const newRaw = text.slice(0, rawIndexStart) + text.slice(rawIndexEnd);
        return update(name, newRaw);
      } else {
        const newRaw =
          text.slice(0, rawIndexStart) + text.slice(rawIndexStart + 1);
        return update(name, newRaw);
      }
    }

    // Allow only digits
    if (!isDigit) return;

    const newRaw =
      text.slice(0, rawIndexStart) + key + text.slice(rawIndexEnd);

    if (newRaw.length <= 16) {
      update(name, newRaw);
    }
  };


  return (
    <div className="pin-field">
      <input
        name="pin"
        placeholder="Secret PIN"
        value={value}
        onKeyDown = {keyChange}
        required
        style={{ letterSpacing: '2px', width: '100%' }}
        pattern=".{17}"
        onInvalid={(e) => {
          // e.preventDefault();
          e.target.setCustomValidity("Please enter a 16-digit PIN in format 1234-5678-9012-3456");
        }}
        onInput={(e) => e.target.setCustomValidity("")}
      />
      <div className="eye-icon" onClick={() => setShow(!show)} style={{ cursor: 'pointer' }}>
        {show ? <FiEye /> : <FiEyeOff />}
      </div>
    </div>
  );
};

export default PinInput;


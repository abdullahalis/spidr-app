import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

// Format function: hides digits with • if show = false, adds dashes every 4 digits
const formatPin = (str, show) =>
  str
    .split('')
    .map((l, i) => {
      if (i === 3 || i === 7 || i === 11) return show ? `${l}-` : '•-';
      return show ? l : '•';
    })
    .join('');

const getRawIndex = (formatted, cursorPos) => {
  let rawIndex = 0;
  for (let i = 0; i < cursorPos; i++) {
    if (formatted[i] !== '-') rawIndex++;
  }
  return rawIndex;
};

const PinInput = ({ value = '', onChange, error }) => {
  const [show, setShow] = useState(false);
  const formatted = formatPin(value, show);

  const update = (name, val) => {
    onChange?.({ target: { name, value: val } });
  };

  const keyChange = (e) => {
    const {
      keyCode,
      key,
      target: { name, selectionStart, selectionEnd }
    } = e;

    const isDigit = /^\d$/.test(key);
    const hasSelection = selectionStart !== selectionEnd;

    const rawIndexStart = getRawIndex(formatted, selectionStart);
    const rawIndexEnd = getRawIndex(formatted, selectionEnd);

    if (keyCode === 8) {
      if (hasSelection) {
        const newRaw = value.slice(0, rawIndexStart) + value.slice(rawIndexEnd);
        return update(name, newRaw);
      } else if (rawIndexStart > 0) {
        const newRaw = value.slice(0, rawIndexStart - 1) + value.slice(rawIndexStart);
        return update(name, newRaw);
      }
      return;
    }

    if (keyCode === 46) {
      if (hasSelection) {
        const newRaw = value.slice(0, rawIndexStart) + value.slice(rawIndexEnd);
        return update(name, newRaw);
      } else {
        const newRaw = value.slice(0, rawIndexStart) + value.slice(rawIndexStart + 1);
        return update(name, newRaw);
      }
    }

    if (!isDigit || value.length >= 16) return;

    const newRaw = value.slice(0, rawIndexStart) + key + value.slice(rawIndexEnd);
    if (newRaw.length <= 16) {
      update(name, newRaw);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    const digitsOnly = pasted.replace(/\D/g, ''); // only digits

    if (!digitsOnly) return;

    // Append to current pin but max length 16
    const combined = (value || '') + digitsOnly;
    const newRaw = combined.slice(0, 16);

    update('pin', newRaw);
  };


  return (
    <div className="pin-field">
      <input
        name="pin"
        placeholder="1234-5678-9012-3456"
        value={formatted}
        onKeyDown={keyChange}
        onPaste={handlePaste}
        style={{ letterSpacing: '2px', width: '100%' }}
        className={error ? 'input-error' : ''}
      />
      <div className="eye-icon" onClick={() => setShow(!show)} style={{ cursor: 'pointer' }}>
        {show ? <FiEye /> : <FiEyeOff />}
      </div>
    </div>
  );
};

export default PinInput;

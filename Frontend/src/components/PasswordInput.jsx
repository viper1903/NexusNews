import React, { useState } from 'react';
import EyeIcon from '../icons/EyeIcon';
import EyeOffIcon from '../icons/EyeOffIcon';
import './PasswordInput.css';

const PasswordInput = ({ value, onChange, id }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input-wrapper">
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        value={value}
        onChange={onChange}
        required
      />
      <button
        type="button"
        className="password-toggle-button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
      </button>
    </div>
  );
};

export default PasswordInput;
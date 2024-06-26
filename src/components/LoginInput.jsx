import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="login-input">
      <input
        id="email"
        label="Email Address"
        name="email"
        type="text"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
      />
      <input
        id="password"
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password"
      />
      <button
        type="button"
        onClick={() => login({ email, password })}
      >
        Login
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;

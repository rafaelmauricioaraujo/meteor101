import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

const LoginForm = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handlerInputUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlerInputPassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    Meteor.loginWithPassword(username, password);
  };

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        placeholder="Username"
        name="username"
        required
        onChange={handlerInputUsername}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={handlerInputPassword}
      />
      <button type="submit">Log in </button>
    </form>
  );
};

export default LoginForm;

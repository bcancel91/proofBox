import React, { useState } from "react";
import userApi from "./api/userApi";

import { useHistory } from "react-router-dom";
import "./Signup.css";

const SignUp = (props) => {
  const history = useHistory();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setUserData((data) => ({ ...data, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await userApi.signup(userData);
      const result = await response.json();

      history.push("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login-page">
      <div className="form">
        <div className="logo-login">
          <img src="/images/engineerapilogo2.png" alt="document logo" />
          <h2 className="logo-header">Join Today</h2>
        </div>
        <form className="login-form">
          <label className="name">Name:</label>
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={onInput}
          />
          <label className="email">Email:</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={onInput}
          />
          <label className="password">Password:</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={onInput}
          />
          <button className="signup-button" onClick={handleSubmit}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

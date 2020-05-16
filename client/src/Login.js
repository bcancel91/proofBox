import React, { useState } from "react";

import { useHistory, Redirect } from "react-router-dom";
import userApi from "./api/userApi";
import "./Login.css";
// import Auth from "../cookie/Auth";

const Login = (props) => {
  const history = useHistory();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [redirect, setRedirect] = useState(false);

  const onInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setUserData((data) => ({ ...data, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userApi.login(userData);
      const result = await response.json();
      console.log("result", result);
      if (/*result was succesful*/ result) setRedirect(true);

      console.log("histroy, ", history);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return redirect ? (
    <Redirect to="/home" />
  ) : (
    <div className="login-page">
      <div className="logo-login">
        <img src="/images/engineerapilogo2.png" alt="document logo" />
        <h2 className="logo-header">Login</h2>
      </div>

      <form className="login-form">
        <label className="username">Email:</label>
        <input
          type="text"
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

        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

export default Login;

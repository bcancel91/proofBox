import React from "react";
import "./Header.css";
import Axios from "axios";

const Signup = () => {
  function handleFormSubmit(event) {
    Axios.post("signup").then((data) => {
      //if(!data)
      //redirecd("/signup")
      //else
      //redirect("hmepage")
    });
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h2>Sign Up Form</h2>
            <form
              className="signup"
              onSubmit={(event) => handleFormSubmit(event)}
            >
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email-input"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password-input"
                  placeholder="Password"
                />
              </div>
              <div id="alert" className="alert alert-danger" role="alert">
                <span
                  className="glyphicon glyphicon-exclamation-sign"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Error:</span>{" "}
                <span className="msg"></span>
              </div>
              <button type="submit" className="btn btn-default">
                Sign Up
              </button>
            </form>
            <br />
            <p>
              Or log in <a href="/login">here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

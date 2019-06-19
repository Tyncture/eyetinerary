import React from "react";
import BaseContainer from "../components/base/baseContainer";
import Sidebar from "../components/base/sidebar";
import Main from "../components/base/main";
import "./register.scss";

class Register extends React.Component {
  render() {
    return (
      <BaseContainer>
        <Sidebar />
        <Main>
          <div className="register">
            <header className="register-header">
              <h1>Register</h1>
            </header>
            <main className="register-main">
              <form className="register-form">
                <div className="register-form--group">
                  <label htmlFor="register-form-username">Username</label>
                  <input
                    type="text"
                    id="register-form-username"
                    name="register-form-username"
                    placeholder="Username"
                    required={true}
                    maxLength={50}
                  />
                </div>
                <div className="register-form--group">
                  <label htmlFor="register-form-password">Password</label>
                  <input
                    type="password"
                    id="register-form-password"
                    name="register-form-password"
                    placeholder="Password"
                    required={true}
                    maxLength={72}
                  />
                </div>
                <div className="register-form--group">
                  <label htmlFor="register-form-email">
                    E-mail &nbsp;
                    <span className="register-form--sub-label">optional</span>
                  </label>
                  <input
                    type="text"
                    id="register-form-email"
                    name="register-form-email"
                    placeholder="example@outlook.com"
                  />
                </div>
                <div className="register-form--group">
                  <label htmlFor="register-form-location">
                    Location &nbsp;
                    <span className="register-form--sub-label">optional</span>
                  </label>
                  <input
                    type="text"
                    id="register-form-location"
                    name="register-form-location"
                    placeholder="Bangkok, Thailand"
                    maxLength={20}
                  />
                </div>
                <div className="register-form--group">
                  <input type="button" value="Submit" />
                </div>
              </form>
            </main>
          </div>
        </Main>
      </BaseContainer>
    );
  }
}

export default Register;

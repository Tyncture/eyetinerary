import React from "react";
import BaseContainer from "../components/base/baseContainer";
import Sidebar from "../components/base/sidebar";
import Main from "../components/base/main";
import "./register.scss";

interface IState {
  username: string;
  password: string;
  email: string;
  location: string;
}

const initialState: IState = {
  username: "",
  password: "",
  email: "",
  location: ""
};

class Register extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: e.target.value });
  }

  handleUsernameKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!e.key.match(/[a-zA-Z0-9-_]/)) {
      e.preventDefault();
    }
  }

  handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: e.target.value });
  }
  handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ email: e.target.value });
  }

  handleEmailKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!e.key.match(/[a-zA-Z0-9-_@\.]/)) {
      e.preventDefault();
    }
  }

  handleLocationChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ location: e.target.value });
  }

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
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                    onKeyDown={this.handleUsernameKeyDown}
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
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
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
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    onKeyDown={this.handleEmailKeyDown}
                    placeholder="example@outlook.com"
                    maxLength={140}
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
                    value={this.state.location}
                    onChange={this.handleLocationChange}
                    placeholder="Bangkok, Thailand"
                    maxLength={50}
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

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
  emptyRequiredFields: boolean;
  passwordTooShort: boolean;
}

const initialState: IState = {
  username: "",
  password: "",
  email: "",
  location: "",
  emptyRequiredFields: false,
  passwordTooShort: false
};

class Register extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
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

  handleSubmitClick() {
    if (this.verifyForm()) {
      this.submitForm();
    }
  }

  handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      if (this.verifyForm()) {
        this.submitForm();
      }
    }
  }

  verifyForm(): boolean {
    let valid = true;
    if (this.state.username.length === 0 || this.state.password.length === 0) {
      this.setState({ emptyRequiredFields: true });
      valid = false;
    } else {
      this.setState({ emptyRequiredFields: false });
    }
    if (this.state.password.length < 8) {
      this.setState({ passwordTooShort: true });
      valid = false;
    } else {
      this.setState({ passwordTooShort: false });
    }
    return valid;
  }

  async submitForm() {
    console.log("submitted");
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
                    onKeyUp={this.handleEnter}
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
                    onKeyUp={this.handleEnter}
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
                    onKeyUp={this.handleEnter}
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
                    onKeyUp={this.handleEnter}
                    placeholder="Bangkok, Thailand"
                    maxLength={50}
                  />
                </div>
                <div className="register-form--group">
                  <input type="button" value="Submit" onClick={this.handleSubmitClick}/>
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

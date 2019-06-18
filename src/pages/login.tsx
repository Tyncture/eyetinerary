import Router from "next/router";
import React from "react";
import BaseContainer from "../components/base/baseContainer";
import Main from "../components/base/main";
import Sidebar from "../components/base/sidebar";
import "./login.scss";

interface IState {
  username: string;
  password: string;
  rememberMe: boolean;
  incorrectCredentials: boolean;
  apiCommunicationFailed: boolean;
  loginButtonEnabled: boolean;
  loginButtonText: string;
}

const initialState: IState = {
  username: "",
  password: "",
  rememberMe: true,
  incorrectCredentials: false,
  apiCommunicationFailed: false,
  loginButtonEnabled: true,
  loginButtonText: "Login"
};

class Login extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleUsernameKeyDown = this.handleUsernameKeyDown.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRememberMeChange = this.handleRememberMeChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: e.target.value });
  }

  handleUsernameKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!e.key.match(/[a-zA-Z0-9_-]/)) {
      e.preventDefault();
    }
  }

  handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: e.target.value });
  }

  handleRememberMeChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ rememberMe: e.target.checked });
  }

  handleEnterKey(e: React.KeyboardEvent) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.login();
    }
  }

  handleSubmit(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.preventDefault();
    this.login();
  }

  async login() {
    this.setState({
      loginButtonEnabled: false,
      loginButtonText: "Logging in.."
    });
    try {
      const response = await fetch(`${process.env.EYET_API}/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });
      switch (response.status) {
        case 200:
          Router.push("/");
          break;
        case 401:
          this.setState({
            incorrectCredentials: true,
            apiCommunicationFailed: false
          });
          break;
        default:
          this.setState({
            incorrectCredentials: false,
            apiCommunicationFailed: true
          });
      }
    } catch (e) {
      console.error(e.message);
      this.setState({
        incorrectCredentials: false,
        apiCommunicationFailed: true
      });
    } finally {
      this.setState({ loginButtonEnabled: true, loginButtonText: "Login" });
    }
  }

  render() {
    return (
      <BaseContainer>
        <Sidebar />
        <Main>
          <div className="login">
            <header className="login-header">
              <h1>Login</h1>
            </header>
            <main>
              <form name="login-form" className="login-form">
                <div className="login-form--group">
                  <div className="login-form--subgroup">
                    <input
                      type="text"
                      id="login-form-username"
                      name="login-form-username"
                      required={true}
                      maxLength={50}
                      value={this.state.username}
                      placeholder="Username"
                      spellCheck={false}
                      onChange={this.handleUsernameChange}
                      onKeyDown={this.handleUsernameKeyDown}
                      onKeyUpCapture={this.handleEnterKey}
                    />
                    <input
                      type="password"
                      id="login-form-password"
                      name="login-form-password"
                      value={this.state.password}
                      required={true}
                      maxLength={72}
                      placeholder="Password"
                      onChange={this.handlePasswordChange}
                      onKeyUp={this.handleEnterKey}
                    />
                    {/* <div className="login-form--checkbox-group">
                      <input
                        type="checkbox"
                        id="login-form-rememberme"
                        name="login-form-rememberme"
                        checked={this.state.rememberMe}
                        onChange={this.handleRememberMeChange}
                      />
                      <label htmlFor="login-form-rememberme">Remember me</label>
                    </div> */}
                  </div>
                </div>
                {this.state.incorrectCredentials && (
                  <div className="input-form--warning">
                    Incorrect username or password.
                  </div>
                )}
                {this.state.apiCommunicationFailed && (
                  <div className="input-form--warning">
                    An error has occured.
                  </div>
                )}
                <div className="login-form--group">
                  <input
                    type="button"
                    id="login-form-submit"
                    name="login-form-submit"
                    value={this.state.loginButtonText}
                    disabled={!this.state.loginButtonEnabled}
                    onClick={this.handleSubmit}
                  />
                </div>
              </form>
            </main>
          </div>
        </Main>
      </BaseContainer>
    );
  }
}

export default Login;

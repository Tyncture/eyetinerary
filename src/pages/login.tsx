import Router from "next/router";
import React from "react";
import BaseContainer from "../components/base/baseContainer";
import Main from "../components/base/main";
import Sidebar from "../components/base/sidebar";

interface IState {
  username: string;
  password: string;
  rememberMe: boolean;
  incorrectCredentials: boolean;
  apiCommunicationFailed: boolean;
  loginLabel: string;
}

const initialState: IState = {
  username: "",
  password: "",
  rememberMe: true,
  incorrectCredentials: false,
  apiCommunicationFailed: false,
  loginLabel: "Login"
};

class Login extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRememberMeChange = this.handleRememberMeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: e.target.value });
  }

  handleRememberMeChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ rememberMe: e.target.checked });
  }

  async handleSubmit(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.preventDefault();
    this.setState({ loginLabel: "Working..." });
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
      this.setState({ apiCommunicationFailed: true });
    } finally {
      this.setState({ loginLabel: "Login" });
    }
  }

  render() {
    return (
      <div>
        <BaseContainer>
          <Sidebar />
          <Main>
            <div className="login">
              <header className="login-header">
                <h1>Login</h1>
              </header>
              <main>
                <form name="login-form">
                  <div>
                    <label htmlFor="login-form-username">Username</label>
                    <input
                      type="text"
                      name="login-form-username"
                      value={this.state.username}
                      onChange={this.handleUsernameChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="login-form-password">Password</label>
                    <input
                      type="password"
                      name="login-form-password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name="login-form-remember-me"
                      checked={this.state.rememberMe}
                      onChange={this.handleRememberMeChange}
                    />
                    <label htmlFor="login-form-remember-me">Remember me</label>
                  </div>
                  <div>
                    <input
                      type="button"
                      name="login-form-submit"
                      value={this.state.loginLabel}
                      onClick={this.handleSubmit}
                    />
                  </div>
                </form>
              </main>
            </div>
          </Main>
        </BaseContainer>
      </div>
    );
  }
}

export default Login;

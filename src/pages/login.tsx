import React from "react";
import BaseContainer from "../components/base/baseContainer";
import Sidebar from "../components/base/sidebar";
import Main from "../components/base/main";

interface IState {
  username: string;
  password: string;
  rememberMe: boolean;
}

const initialState: IState = {
  username: null,
  password: null,
  rememberMe: true
};

class Login extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRememberMeChange = this.handleRememberMeChange.bind(this);
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
                    <input type="text" name="login-form-username" onChange={this.handleUsernameChange}/>
                  </div>
                  <div>
                    <label htmlFor="login-form-password">Password</label>
                    <input type="password" name="login-form-password" onChange={this.handlePasswordChange}/>
                  </div>
                  <div>
                    <input type="checkbox" name="login-form-remember-me" defaultChecked={this.state.rememberMe} onChange={this.handleRememberMeChange}/>
                    <label htmlFor="login-form-remember-me">Remember me</label>
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

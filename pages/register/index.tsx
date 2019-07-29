import React from "react";
import BaseContainer from "../../components/base/baseContainer";
import Sidebar from "../../components/base/sidebar";
import Main from "../../components/base/main";
import validator from "validator";
import "./index.scss";
import Router from "next/router";
import { connect } from "react-redux";
import { postLogin, apiPost} from "../../library/common/utils/requests";
import { setUserId, setUsername, setUserToken } from "../../store/user/actions";

interface IProps {
  setUserId(id: number): void;
  setUsername(username: string): void;
  setUserToken(token: string): void;
}

interface IState {
  username: string;
  password: string;
  email: string;
  location: string;
  emptyRequiredFields: boolean;
  passwordTooShort: boolean;
  invalidEmail: boolean;
  apiError: boolean;
}

const initialState: IState = {
  username: "",
  password: "",
  email: "",
  location: "",
  emptyRequiredFields: false,
  passwordTooShort: false,
  invalidEmail: false,
  apiError: false
};

class Register extends React.Component<IProps, IState> {
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
    if (this.state.password.length < 8) {
      this.setState({ passwordTooShort: true });
      valid = false;
    } else {
      this.setState({ passwordTooShort: false });
    }
    if (this.state.email.length > 0 && !validator.isEmail(this.state.email)) {
      this.setState({ invalidEmail: true });
      valid = false;
    } else {
      this.setState({ invalidEmail: false });
    }
    return valid;
  }

  async submitForm() {
    this.setState({ apiError: false });
    const body = {
      username: this.state.username,
      password: this.state.password,
      email:
        this.state.email.length !== 0 && !this.state.invalidEmail
          ? this.state.email
          : undefined,
      location: this.state.location.length !== 0 ? this.state.location : undefined
    };
    try {
      const registerResponse = await apiPost("/user", body);
      if (registerResponse.success) {
        const loginResponse = await postLogin(body.username, body.password);
        if (loginResponse.success) {
          this.props.setUserId(loginResponse.body.user.id);
          this.props.setUsername(loginResponse.body.user.username);
          this.props.setUserToken(loginResponse.body.token);
          Router.push("/");
        } else {
          this.setState({ apiError: true });
        }
      } else {
        this.setState({ apiError: true });
      }
    } catch (e) {
      console.error(e.message);
      this.setState({ apiError: true });
    }
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
                {this.state.emptyRequiredFields && (
                  <div className="input-form--warning">
                    Please double check all required fields.
                  </div>
                )}
                {!this.state.emptyRequiredFields &&
                  this.state.passwordTooShort && (
                    <div className="input-form--warning">
                      Password must be at least 8 characters long.
                    </div>
                  )}
                {!this.state.emptyRequiredFields &&
                  !this.state.passwordTooShort &&
                  this.state.invalidEmail && (
                    <div className="input-form--warning">
                      Please double check your email.
                    </div>
                  )}
                {this.state.apiError && (
                  <div className="input-form--warning">
                    An error has occured.
                  </div>
                )}
                <div className="register-form--group">
                  <input
                    type="button"
                    value="Register"
                    onClick={this.handleSubmitClick}
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

const mapDispatchToProps = dispatch => ({
  setUserId: (id: number) => dispatch(setUserId(id)),
  setUsername: (username: string) => dispatch(setUsername(username)),
  setUserToken: (token: string) => dispatch(setUserToken(token))
});

export default connect(
  null,
  mapDispatchToProps
)(Register);

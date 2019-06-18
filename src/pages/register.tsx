import React from "react";
import BaseContainer from "../components/base/baseContainer";
import Sidebar from "../components/base/sidebar";
import Main from "../components/base/main";

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
          </div>
        </Main>
      </BaseContainer>
    );
  }
}

export default Register;

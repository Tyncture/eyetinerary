import React from 'react';
import { connect } from 'react-redux';
import './baseContainer.scss';
import Head from 'next/head';
import { setUserId, setUsername, setUserToken, clearUser } from '../../store/user/actions';

class BaseContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="base-container">
      <Head>
        <title>Eyetinerary</title>
      </Head>
      {this.props.children}
    </div>;
  }
}

const mapStateToProps = state => ({
  contextUser: state.user
});

const mapDispatchToProps = dispatch => ({
  setUserId: (id: number) => dispatch(setUserId(id)),
  setUsername: (username: string) => dispatch(setUsername(username)),
  setUserToken: (token: string) => dispatch(setUserToken(token)),
  clearUser: () => dispatch(clearUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer);

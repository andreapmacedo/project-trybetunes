import React from 'react';
import { Fragment } from 'react/cjs/react.development';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <Fragment>
        <p data-testid="page-profile">Profile</p>
        <Header />
      </Fragment>
    );
  }
}

export default Profile;

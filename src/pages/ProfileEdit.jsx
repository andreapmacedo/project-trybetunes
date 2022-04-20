import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div data-testid="page-profile-edit">ProfileEdit</div>
      </Fragment>
    );
  }
}

export default ProfileEdit;

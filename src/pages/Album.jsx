import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <p data-testid="page-album">Album</p>
      </Fragment>
    );
  }
}

export default Album;

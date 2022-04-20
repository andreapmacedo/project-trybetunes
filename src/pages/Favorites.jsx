import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <p data-testid="page-favorites">Favorites</p>
      </Fragment>
    );
  }
}

export default Favorites;

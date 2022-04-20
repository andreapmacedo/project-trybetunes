import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <p data-testid="page-search">Search</p>
      </Fragment>
    );
  }
}

export default Search;

import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
    };
  }

  inputHandleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { artist } = this.state;
    const minLenght = 2;
    return (
      <Fragment>
        <Header />
        <div data-testid="page-search">
          <input
            data-testid="search-artist-input"
            type="text"
            name="artist"
            onChange={ this.inputHandleChange }
            value={ artist }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ artist.length < minLenght }
            // onClick={ this.inputHandleChange }
          >
            Pesquisar
          </button>
        </div>
      </Fragment>
    );
  }
}

export default Search;

import React from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      // loading: false,
      albumsResult: [],
      searchResults: false,
      artistSearched: '',
    };
  }

  inputHandleChange = ({ target }) => {
    const { value } = target;
    this.setState({ artist: value });
  }

  searchArtists = async () => {
    const { artist } = this.state;
    const albums = await searchAlbumsAPI(artist);
    // console.log(albums);
    this.setState(
      // { loading: true },
      async () => {
        this.setState({
          artist: '',
          // loading: false,
          albumsResult: [...albums],
          searchResults: true,
          artistSearched: artist,
        });
      },
    );
  }

  renderAlbums = () => {
    const { albumsResult } = this.state;
    // console.log(albumsResult);
    // albumsResult.map((album) => console.log(album.artistName));
    // if (albumsResult.length === 0) return <p>Nenhum álbum foi encontrado</p>;
    return albumsResult.map((album) => (
      <div key={ album.collectionId }>
        {/* <p>{album.artistName}</p> */}
        <Link
          data-testid={ `link-to-album-${album.collectionId}` }
          to={ `/album/${album.collectionId}` }
        >
          <div>
            <h2>{`${album.artistName}`}</h2>
            <h4>{`Album: ${album.collectionName}`}</h4>
          </div>
          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
        </Link>
      </div>
    ));
  }

  // populateAlbums = () => {
  //   const { artist } = this.state;
  //   return (
  //     <section>
  //       <h1>{ `Resultado de álbuns de: ${artist}` }</h1>
  //       {this.renderAlbums()}
  //     </section>);
  // }

  render() {
    const { artist, searchResults, artistSearched } = this.state;
    const minLenght = 2;
    const albums = this.renderAlbums();
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
            onClick={ this.searchArtists }
          >
            Pesquisar
          </button>
          <div className="search-preview">
            { albums.length !== 0
              // && <p>{ `Resultado de álbuns de: ${artist}` }</p> }
              && <p>{ `Resultado de álbuns de: ${artistSearched}` }</p> }
            {(albums.length === 0 && searchResults) && <p>Nenhum álbum foi encontrado</p>}
            { albums }
          </div>
          {/* { this.populateAlbums()} */}
          {/* {(albums.length > 0
            ? this.populateAlbums()
            : artist.length > minLenght && <p>Nenhum álbum foi encontrado</p>)} */}
        </div>
      </Fragment>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
// import { addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      artworkUrl100: '',
      artistName: '',
      albumName: '',
      musicsList: [],
      // trackFavorites: [],
    };
  }

  componentDidMount() {
    this.fetchAlbumInfo();
  }

  fetchAlbumInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const tracks = await getMusics(id);
    const filteredTracks = tracks.filter((track) => track.trackId !== undefined);
    // console.log(tracks);
    // console.log(filteredTracks);
    this.setState({
      musicsList: filteredTracks,
      artistName: tracks[0].artistName,
      albumName: tracks[0].collectionName,
      artworkUrl100: tracks[0].artworkUrl100,
    });
  }

  // handleFavorite = async (track, isFavorite) => {
  //   const { trackFavorites } = this.state;
  //   // console.log(trackFavorites);
  //   // console.log(track.trackId);
  //   // console.log(isFavorite);
  //   this.setState({ loading: true });
  //   if (isFavorite === false) {
  //     await addSong(track);
  //     this.setState({
  //       trackFavorites: [...trackFavorites, track],
  //     });
  //   } else {
  //     await removeSong(track);
  //     const favoriteListFiltered = trackFavorites
  //       .filter((trackFavorite) => trackFavorite.trackId !== track.trackId);
  //     this.setState({
  //       trackFavorites: favoriteListFiltered,
  //     });
  //   }
  //   this.setState({ loading: false });
  // }

  // old
  // handleFavorite = (track, isFavorite) => {
  //   const { trackFavorites } = this.state;
  //   console.log(trackFavorites);
  //   console.log(track.trackId);
  //   console.log(isFavorite);
  //   if (isFavorite === false) {
  //     this.setState({
  //       trackFavorites: [...trackFavorites, track],
  //     });
  //   } else {
  //     const favoriteListFiltered = trackFavorites
  //       .filter((trackFavorite) => trackFavorite.trackId !== track.trackId);
  //     this.setState({
  //       trackFavorites: favoriteListFiltered,
  //     });
  //   }
  // }

  render() {
    const {
      artistName,
      albumName,
      musicsList,
      loading,
      artworkUrl100,
      // trackFavorites,
    } = this.state;
    return (
      <Fragment>
        <Header />
        <div data-testid="page-album">
          { loading && <Loading /> }
          <div>
            <h1 data-testid="artist-name">{ artistName }</h1>
            <h3>
              {/* {`Album: ${albumName} `} */}
            </h3>
            <div>
              <h2 data-testid="album-name">{ albumName }</h2>
            </div>
            <div>
              <img src={ artworkUrl100 } alt={ albumName } />
            </div>
            <div>
              {
                musicsList
                  .map((track) => (
                    <MusicCard
                      track={ track }
                      key={ track.trackId }
                      // onChangeFavorite={ this.handleFavorite }
                      // favoritesList={ trackFavorites }
                      // trackName={ track.trackName }
                      // previewUrl={ track.previewUrl }
                      // trackId={ track.trackId }
                    />))
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;

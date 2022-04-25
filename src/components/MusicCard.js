import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  handleFavorite = async (track, isFavorite) => {
    this.setState({ loading: true });
    if (isFavorite === false) {
      await addSong(track);
      this.setState({
        isFavorite: true,
      });
    } else {
      await removeSong(track);
      this.setState({
        isFavorite: false,
      });
    }
    this.setState({ loading: false });
  }

  getFavorite = async () => {
    const { track } = this.props;
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    const isFavorite = favoriteSongs.some((song) => song.trackId === track.trackId);
    this.setState({ isFavorite }, () => this.setState({ loading: false }));
  }

  render() {
    const { track } = this.props;
    // const { track, onChangeFavorite, favoritesList } = this.props;
    const { trackId, trackName, previewUrl } = track;
    const { isFavorite, loading } = this.state;
    // const trackFound = track.
    // console.log(favoritesList);
    // const isFavorite = favoritesList.some((favorite) => favorite.trackId === trackId);
    // old
    // const isFavorite = favoritesList.some((favorite) => {
    //   console.log(trackId === favorite.artistId);
    //   // console.log(trackId);
    //   // console.log(favorite.artistId);
    //   return favorite.trackId === trackId;
    // });
    // console.log(isFavorite);
    // const {
    //   trackName,
    //   previewUrl,
    //   trackId,
    // } = this.props;

    return (
      <>
        { loading && <Loading /> }
        { !loading && (
          <>
            <p>{`${trackName}`}</p>
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ `checkbox-music-${trackId}` }>
              <input
                id={ `checkbox-music-${trackId}` }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                name={ `checkbox-music-${trackId}` }
                checked={ isFavorite }
                onChange={ () => this.handleFavorite(track, isFavorite) }
              />
              Favorita
            </label>
          </>
        )}
      </>
    );
  }
}

MusicCard.propTypes = {
  // favoritesList: PropTypes.arrayOf.isRequired,
  // handleFavorite: PropTypes.func.isRequired,
  track: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  // trackName: PropTypes.string.isRequired,
  // previewUrl: PropTypes.string.isRequired,
  // trackId: PropTypes.number.isRequired,
  // favorite: PropTypes.bool.isRequired,
};

export default MusicCard;

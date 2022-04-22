import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorite: false,
    };
  }

  hendleFavorite = ({ target }) => {
    this.setState({
      favorite: target.checked,
    }, () => this.setFavorite());
  }

  setFavorite = async () => {
    const { favorite } = this.state;
    const { track } = this.props;
    this.setState({ loading: true });
    if (favorite) {
      await addSong(track);
    } else {
      await removeSong(track);
    }
    this.setState({ loading: false });
  }

  render() {
    const { track } = this.props;
    const { trackId, trackName, previewUrl } = track;
    // const {
    //   trackName,
    //   previewUrl,
    //   trackId,
    // } = this.props;
    const {
      favorite,
      loading,
    } = this.state;

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
                checked={ favorite }
                onChange={ (event) => this.hendleFavorite(event) }
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

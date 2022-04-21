import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Fragment } from 'react/cjs/react.production.min';

class MusicCard extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    const {
      trackName,
      previewUrl,
      // trackId,
      // isChecked,
    } = this.props;
    return (
      <>
        <p>{trackName}</p>
        {/* <p>{trackId}</p> */}
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
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  // trackId: PropTypes.number,
};

export default MusicCard;

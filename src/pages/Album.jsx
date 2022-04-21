import React, { Component } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      artistName: '',
      albumName: '',
      musicsList: [],
    };
  }

  componentDidMount() {
    this.fetchAlbumInfo();
  }

  fetchAlbumInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const filteredMusics = musics.filter((music) => music.trackId !== undefined);
    console.log(musics);
    this.setState({
      musicsList: filteredMusics,
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName,
    });
  }

  render() {
    const { artistName, albumName, musicsList, loading } = this.state;
    return (
      <Fragment>
        <Header />
        { loading && <Loading /> }
        <div>
          <h1>
            Album
            {' '}
            {albumName}
            {' '}
          </h1>
          <div>
            <h2 data-testid="album-name">{ albumName }</h2>
            <h3 data-testid="artist-name">{ artistName }</h3>
          </div>
          <div>
            {
              musicsList
                .map((track) => (
                  <MusicCard
                    key={ track.trackId }
                    trackName={ track.trackName }
                    previewUrl={ track.previewUrl }
                    // trackId={ track.trackId }
                  />))
            }
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

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
      artworkUrl100: '',
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
    // console.log(musics);
    // console.log(filteredMusics);
    this.setState({
      musicsList: filteredMusics,
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName,
      artworkUrl100: musics[0].artworkUrl100,
    });
  }

  render() {
    const { artistName, albumName, musicsList, loading, artworkUrl100 } = this.state;
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

import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    this.setState(
      { loading: true },
      async () => {
        const userLogged = await getUser();
        this.setState({
          user: userLogged,
          loading: false,
        });
      },
    );
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        { loading && <Loading />}
        { !loading
          && (
            <div>
              <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
              <p data-testid="header-user-name">
                { user.name }
              </p>
            </div>
          )}
      </header>
    );
  }
}

export default Header;

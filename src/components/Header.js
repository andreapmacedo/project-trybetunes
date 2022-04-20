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
            <section>
              <div className="title">
                <h1>Trybetunes</h1>
                <p data-testid="header-user-name">{ user.name }</p>
              </div>
              <nav>
                <div>
                  <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
                </div>
                <div>
                  <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
                </div>
                <div>
                  <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
                </div>
              </nav>
            </section>
          )}
      </header>
    );
  }
}

export default Header;

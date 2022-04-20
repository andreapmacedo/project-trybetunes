import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Login extends React.Component {
  render() {
    const { handleChange, value, userLogin, loading } = this.props;
    const minLenght = 3;
    return (
      <section>
        {/* {loading && <p>Carregando...</p> } */}
        {loading && <Loading /> }
        {!loading
          && (
            <div data-testid="page-login">
              Login
              <input
                type="text"
                name="user"
                data-testid="login-name-input"
                onChange={ handleChange }
                value={ value }
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ value.length < minLenght }
                onClick={ userLogin }
              >
                Entrar
              </button>
            </div>)}
      </section>
    );
  }
}

Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  userLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Login;

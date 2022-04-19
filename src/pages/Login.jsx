import React from 'react';

class Login extends React.Component {
  render() {
    const { handlechange, value, btnDisabled, btnCreateUser, loading } = this.props;
    return (
      <section data-testid="page-login">
        Login
        <input
          type="text"
          name="user"
          data-testid="login-name-input"
          onChange={ handlechange }
          value={ value }
        />
      </section>
    );
  }
}

export default Login;

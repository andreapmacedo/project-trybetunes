import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './app.css';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Album from './pages/Album';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
      logged: false,
    };
  }

  inputHandleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  // userLogin = async () => {
  //   console.log('userLogin');
  //   const { user } = this.state;
  //   this.setState(
  //     { loading: true },
  //     async () => {
  //       await createUser({ name: user });
  //       this.setState(
  //         { loading: false },
  //       );
  //     },
  //   );
  // }

  userLogin = () => {
    const { user } = this.state;
    this.setState(
      { loading: true },
      async () => {
        const newUser = await createUser({ name: user });
        this.setState({
          user: newUser,
          loading: false,
          logged: true,
        });
      },
    );
  }

  render() {
    const {
      user,
      loading,
      logged,
    } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              handleChange={ this.inputHandleChange }
              value={ user }
              userLogin={ this.userLogin }
              loading={ loading }
            />) }
          >
            { logged && <Redirect to="/search" /> }
          </Route>
          <Route exact path="/search" render={ () => <Search /> } />
          <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route exact path="/favorites" render={ () => <Favorites /> } />
          <Route exact path="/profile" render={ () => <Profile /> } />
          <Route exact path="/profile/edit" render={ () => <ProfileEdit /> } />
          <Route path="*" render={ () => <NotFound /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './app.css';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Album from './pages/Album';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     user: '',
  //     isLoggedIn: false,
  //     loading: false,
  //     searchResults: false,
  //     artistSearch: '',
  //     artistSearched: '',
  //     albumsResult: [],
  //   };
  // }

  render() {
    // const {
    //   user,
    //   isLoggedIn,
    //   loading,
    //   artistSearch,
    //   searchResults,
    //   albumsResult,
    // } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ () => <Login /> } />
          <Route exact path="/search" render={ () => <Search /> } />
          <Route exact path="/album/:id" render={ () => <Album /> } />
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

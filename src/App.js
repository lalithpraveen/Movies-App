import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import SpecificMovieDetails from './components/SpecificMovieDetails'
import SearchMovies from './components/SearchMovies'
import PopularMovies from './components/PopularMovies'
import Account from './components/Account'
import PageNotFound from './components/PageNotFound'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={HomePage} />
      <ProtectedRoute
        exact
        path="/movie/:id"
        component={SpecificMovieDetails}
      />
      <ProtectedRoute exact path="/search/:value" component={SearchMovies} />
      <ProtectedRoute exact path="/popular" component={PopularMovies} />
      <ProtectedRoute exact path="/account" component={Account} />
      <ProtectedRoute exact path="/page-not-found" component={PageNotFound} />
      <Redirect to="/page-not-found" />
    </Switch>
  </BrowserRouter>
)

export default App

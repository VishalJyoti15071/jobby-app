import {Route, Redirect, Switch} from 'react-router-dom'
import './App.css'
import ProtectedRoute from './ProtectedRoute'
import HomeRoute from './components/HomeRoute'
import LoginRoute from './components/LoginRoute'
import JobsRoute from './components/JobsRoute'
import JobItemDetailRoute from './components/JobItemDetailRoute'
import NotFoundRoute from './components/NotFoundRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/jobs" component={JobsRoute} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetailRoute} />
    <Route path="/not-found" component={NotFoundRoute} />
    <Redirect to="not-found" />
  </Switch>
)

export default App

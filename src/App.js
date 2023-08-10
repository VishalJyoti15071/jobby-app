import {Route, Redirect, Switch} from 'react-router-dom'
import './App.css'
import ProtectedRoute from './ProtectedRoute'
import HomeRoute from './components/HomeRoute'
import LoginRoute from './components/LoginRoute'
import JobsRoute from './components/JobsRoute'
import JobItemDetailRoute from './components/JobItemDetailRoute'
import NotFoundRoute from './components/NotFoundRoute'

<<<<<<< HEAD
=======
// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

>>>>>>> b66c7e1c01bc4e1df78b133bb4eb50190784a210
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/jobs" component={JobsRoute} />
<<<<<<< HEAD
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetailRoute} />
=======
    <ProtectedRoute exact path="/jobitem" component={JobItemDetailRoute} />
>>>>>>> b66c7e1c01bc4e1df78b133bb4eb50190784a210
    <Route path="/not-found" component={NotFoundRoute} />
    <Redirect to="not-found" />
  </Switch>
)

export default App

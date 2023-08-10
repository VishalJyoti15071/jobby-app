import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const HomeRoute = () => (
  <div className="home-main-container">
    <Header />
    <div className="home-container">
      <h1 className="main-heading">Find The Job That Fits Your Life</h1>
      <p className="main-paragraph">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="find-job-button" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default HomeRoute

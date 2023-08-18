import './index.css'

const NotFoundRoute = () => (
  <div className="not-found-page-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="no-found-image"
    />
    <h1 className="no-job-head">Page Not Found</h1>
    <p className="no-job-para">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFoundRoute

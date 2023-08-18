import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import './index.css'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import AllJobCard from '../AllJobCard'

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

const apiStatusConstant = {
  succuss: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobsRoute extends Component {
  state = {
    searchInput: '',
    jobList: [],
    profileDetail: [],
    checkboxArray: [],
    radioInput: '',
    apiStatus: '',
    apiStatusProfile: '',
  }

  componentDidMount() {
    this.getJobList()
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatusProfile: apiStatusConstant.loading})
    const token = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }
    const response = await fetch(profileUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateProfile = data.profile_details
      this.setState({
        profileDetail: updateProfile,
        apiStatusProfile: apiStatusConstant.succuss,
      })
    } else {
      this.setState({apiStatusProfile: apiStatusConstant.failure})
    }
  }

  getJobList = async () => {
    this.setState({apiStatus: apiStatusConstant.loading})
    const {searchInput, radioInput, checkboxArray} = this.state
    const joinCheckBox = checkboxArray.join(',')
    const token = Cookies.get('jwt_token')
    const jobUrl = `https://apis.ccbp.in/jobs?employment_type=${joinCheckBox}&minimum_package=${radioInput}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }
    const responseJobUrl = await fetch(jobUrl, options)
    if (responseJobUrl.ok === true) {
      const dataJobUrl = await responseJobUrl.json()
      const updateJobData = dataJobUrl.jobs.map(each => ({
        id: each.id,
        title: each.title,
        rating: each.rating,
        companyUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
      }))
      this.setState({
        jobList: updateJobData,
        apiStatus: apiStatusConstant.succuss,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  checkboxEvent = event => {
    const currentId = event.target.id
    const {checkboxArray} = this.state
    let initializedList = checkboxArray
    if (checkboxArray.includes(currentId)) {
      initializedList = checkboxArray.filter(eachId => eachId !== currentId)
    } else {
      initializedList = [...initializedList, currentId]
    }

    this.setState({checkboxArray: initializedList}, this.getJobList)
  }

  onChangeRadioButton = event => {
    this.setState({radioInput: event.target.value}, this.getJobList)
  }

  onClickSearchButton = () => {
    this.getJobList()
  }

  loadingApiContent = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  loadingProfileApiContent = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  noSearchFound = () => (
    <div className="not-found-search-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-job-image"
      />
      <h1 className="no-job-head">No Jobs Found</h1>
      <p className="no-job-para">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  successApiContent = () => {
    const {jobList} = this.state
    const noJob = jobList.length === 0
    return (
      <ul className="all-product-container">
        {noJob
          ? this.noSearchFound()
          : jobList.map(eachList => (
              <AllJobCard key={eachList.id} cardDetails={eachList} />
            ))}
      </ul>
    )
  }

  failureProfileApiContent = () => (
    <div className="profile-loader-container">
      <button
        className="retry-button"
        type="button"
        onClick={() => this.getProfile()}
      >
        Retry
      </button>
    </div>
  )

  failureApiContent = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-job-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={() => this.getJobList()}
      >
        Retry
      </button>
    </div>
  )

  successProfileApiContent = () => {
    const {profileDetail} = this.state
    return (
      <ul className="left-top-container">
        <img
          src={profileDetail.profile_image_url}
          alt="profile"
          className="profile-img"
        />
        <h1 className="profile-name">{profileDetail.name}</h1>
        <p className="profile-para">{profileDetail.short_bio}</p>
      </ul>
    )
  }

  onRenderAPi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.loading:
        return this.loadingApiContent()
      case apiStatusConstant.succuss:
        return this.successApiContent()
      case apiStatusConstant.failure:
        return this.failureApiContent()
      default:
        return null
    }
  }

  onRenderProfileAPi = () => {
    const {apiStatusProfile} = this.state
    switch (apiStatusProfile) {
      case apiStatusConstant.loading:
        return this.loadingProfileApiContent()
      case apiStatusConstant.succuss:
        return this.successProfileApiContent()
      case apiStatusConstant.failure:
        return this.failureProfileApiContent()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="main-job-container">
        <Header />
        <div className="jobs-container">
          <div className="left-container">
            {this.onRenderProfileAPi()}
            <hr className="horizontal-line" />
            <div className="left-bottom-container">
              <h1 className="heading">Type of Employment</h1>
              <ul className="checkbox-container">
                {employmentTypesList.map(eachEmploy => (
                  <li className="list-container" key={eachEmploy.label}>
                    <input
                      id={eachEmploy.employmentTypeId}
                      type="checkbox"
                      className="checkbox-class"
                      onChange={this.checkboxEvent}
                      value={eachEmploy.employmentTypeId}
                    />
                    <label
                      htmlFor={eachEmploy.employmentTypeId}
                      className="label-class"
                    >
                      {eachEmploy.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="horizontal-line" />
            <div className="left-bottom-container">
              <h1 className="heading">Salary Range</h1>
              <ul className="checkbox-container">
                {salaryRangesList.map(eachRange => (
                  <li className="list-container" key={eachRange.label}>
                    <input
                      type="radio"
                      name="radio"
                      className="checkbox-class"
                      value={eachRange.salaryRangeId}
                      id={eachRange.salaryRangeId}
                      onChange={this.onChangeRadioButton}
                    />
                    <label
                      htmlFor={eachRange.salaryRangeId}
                      className="label-class"
                    >
                      {eachRange.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right-container">
            <div className="input-search-container">
              <input
                type="search"
                onChange={this.onChangeInput}
                className="input-class"
                value={searchInput}
                placeholder="Search"
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearchButton}
                className="search-icon"
              >
                <BsSearch />
              </button>
            </div>
            {this.onRenderAPi()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsRoute

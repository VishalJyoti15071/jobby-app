import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import './index.css'
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

class JobsRoute extends Component {
  state = {
    searchInput: '',
    jobList: [],
    profielDetail: {},
    isCheckedValue: '',
    isChecked: false,
  }

  componentDidMount() {
    this.getJobList()
  }

  getJobList = async () => {
    const {searchInput, isCheckedValue} = this.state
    const token = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jobUrl = `https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()
    const responseJobUrl = await fetch(jobUrl, options)
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
      profielDetail: data.profile_details,
      jobList: updateJobData,
    })
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickCheckBox = event => {
    this.setState({isCheckedValue: event.target.value})
    this.getJobList()
  }

  onClickSearchButton = () => {
    this.getJobList()
  }

  render() {
    const {
      searchInput,
      jobList,
      profielDetail,
      isCheckedValue,
      isChecked,
    } = this.state
    return (
      <div className="main-job-container">
        <Header />
        <div className="jobs-container">
          <div className="left-container">
            <ul className="left-top-container">
              <img
                src={profielDetail.profile_image_url}
                alt="logo"
                className="profile-img"
              />
              <h1 className="profile-name">{profielDetail.name}</h1>
              <p className="profile-para">{profielDetail.short_bio}</p>
            </ul>
            <hr className="horizontal-line" />
            <div className="left-bottom-container">
              <h1 className="heading">Type of Employment</h1>
              <ul className="checkbox-container">
                {employmentTypesList.map(eachEmploy => (
                  <li
                    className="list-container"
                    key={eachEmploy.employmentTypeId}
                    onClick={this.onClickCheckBox}
                    value={isCheckedValue}
                  >
                    <input
                      type="checkbox"
                      className="checkbox-class"
                      checked={isChecked}
                    />
                    <label className="label-class">{eachEmploy.label}</label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="horizontal-line" />
            <div className="left-bottom-container">
              <h1 className="heading">Salary Range</h1>
              <ul className="checkbox-container">
                {salaryRangesList.map(eachRange => (
                  <li className="list-container" key={eachRange.salaryRangeId}>
                    <input
                      type="radio"
                      name="radio"
                      className="checkbox-class"
                    />
                    <label className="label-class">{eachRange.label}</label>
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
            {jobList.map(eachList => (
              <AllJobCard key={eachList.id} cardDetails={eachList} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsRoute

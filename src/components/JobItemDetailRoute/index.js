import {Component} from 'react'
import {IoIosStar} from 'react-icons/io'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import './index.css'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'

const apiStatusConstant = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetailRoute extends Component {
  state = {
    jobItemDetail: {},
    skillList: [],
    similarJobItemList: [],
    apiStatus: '',
  }

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const itemUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(itemUrl, options)
    const data = await response.json()
    const detail = data.job_details
    if (response.ok === true) {
      const updatedJobItemDetail = {
        companyUrl: detail.company_logo_url,
        companyWebsiteUrl: detail.company_website_url,
        title: detail.title,
        rating: detail.rating,
        employmentType: detail.employment_type,
        id: detail.id,
        jobDescription: detail.job_description,
        location: detail.location,
        packagePerAnnum: detail.package_per_annum,
        lifeAtCompanyDescription: detail.life_at_company.description,
        lifeAtCompanyImage: detail.life_at_company.image_url,
      }
      const updatedSkillList = detail.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))

      const updatedSimilarJobList = data.similar_jobs.map(each => ({
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
        jobItemDetail: updatedJobItemDetail,
        skillList: updatedSkillList,
        similarJobItemList: updatedSimilarJobList,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  loadingApiContent = () => (
    <div className="jobs-loader-container failure" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successApiContent = () => {
    const {jobItemDetail, skillList, similarJobItemList} = this.state

    return (
      <>
        <div className="all-job-card-container">
          <div className="image-container">
            <img
              src={jobItemDetail.companyUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="name-and-star-container">
              <h1 className="company-name">{jobItemDetail.title}</h1>
              <div className="rating-cont">
                <IoIosStar className="star" />
                <p className="rating">{jobItemDetail.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-and-price-cont">
            <div className="location-cont">
              <HiLocationMarker />
              <p className="span-class">{jobItemDetail.location}</p>
              <BsFillBriefcaseFill />
              <p className="span-class">{jobItemDetail.employmentType}</p>
            </div>
            <p className="package-para">{jobItemDetail.packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="description-container">
            <h1 className="description-head">Description</h1>
            <div className="link-container">
              <a
                href={jobItemDetail.companyWebsiteUrl}
                className="company-link"
              >
                Visit
                <FiExternalLink className="last-link" />
              </a>
            </div>
          </div>
          <p className="description-para">{jobItemDetail.jobDescription}</p>
          <h1 className="description-head">Skills</h1>
          <ul className="skills-list">
            {skillList.map(eachSkill => {
              const {imageUrl, name} = eachSkill
              return (
                <li className="skill-item" key={name}>
                  <img src={imageUrl} alt={name} className="skill-image" />
                  <p className="skill-name">{name}</p>
                </li>
              )
            })}
          </ul>
          <h1 className="description-head">Life at Company</h1>
          <div className="life-container">
            <p className="description-life">
              {jobItemDetail.lifeAtCompanyDescription}
            </p>
            <img
              src={jobItemDetail.lifeAtCompanyImage}
              alt="life at company"
              className="life-image"
            />
          </div>
        </div>
        <h1 className="similar-heading">Similar Jobs</h1>
        <ul className="similar-job-container">
          {similarJobItemList.map(eachSim => (
            <SimilarJobCard detailJodCard={eachSim} key={eachSim.id} />
          ))}
        </ul>
      </>
    )
  }

  failureApiContent = () => (
    <div className="jobs-failure-container failure">
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
        onClick={() => this.getItemDetails()}
      >
        Retry
      </button>
    </div>
  )

  onRenderProfileAPi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.loading:
        return this.loadingApiContent()
      case apiStatusConstant.success:
        return this.successApiContent()
      case apiStatusConstant.failure:
        return this.failureApiContent()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-job-container">
        <Header />
        {this.onRenderProfileAPi()}
      </div>
    )
  }
}

export default JobItemDetailRoute

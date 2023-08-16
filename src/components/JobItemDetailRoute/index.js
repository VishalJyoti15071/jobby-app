import {Link} from 'react-router-dom'
import {Component} from 'react'
import {IoIosStar} from 'react-icons/io'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import './index.css'
import Cookies from 'js-cookie'
import Header from '../Header'

const apiStatusConstant = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetailRoute extends Component {
  state = {jobItemDetail: {}, similarJobItemList: [], apiStatus: ''}

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    // this.setState({apiStatus: apiStatusConstant.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
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
    if (response.ok === true) {
      const detail = data.job_details
      const updatedJobItemDetail = {
        companyUrl: detail.company_logo_url,
        companyWebsiteUrl: detail.company_website_url,
        title: detail.title,
        rating: detail.rating,
        employmentType: detail.employment_type,
        id: detail.id,
        jobDescription: detail.job_description,
        lifeAtCompany: detail.life_at_company.description,
        location: detail.location,
        packagePerAnnum: detail.package_per_annum,
        skills: detail.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
      }
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
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
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
    const {jobItemDetail} = this.state
    return (
      <div className="main-job-container">
        <Header />
        <div className="all-job-card-container">
          <div className="image-container">
            <img
              src={jobItemDetail.companyUrl}
              alt={jobItemDetail.title}
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
              <span className="span-class">{jobItemDetail.location}</span>
              <BsFillBriefcaseFill />
              <span className="span-class">{jobItemDetail.employmentType}</span>
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

          <h1 className="description-head">Life at Company</h1>
          <p className="description-para">{jobItemDetail.lifeAtCompany}</p>
        </div>
      </div>
    )
  }
}

export default JobItemDetailRoute

/* 
const JobItemDetailRoute = props => {
  const {cardDetails} = props
  const {
    id,
    title,
    rating,
    companyUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
  } = cardDetails



  */

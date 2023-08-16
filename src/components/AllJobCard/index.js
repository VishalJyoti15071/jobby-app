import {Link} from 'react-router-dom'
import {IoIosStar} from 'react-icons/io'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const AllJobCard = props => {
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

  return (
    <Link to={`/jobs/${id}`} className="details-link">
      <li className="all-job-card-container">
        <div className="image-container">
          <img src={companyUrl} alt={title} className="company-logo" />
          <div className="name-and-star-container">
            <h1 className="company-name">{title}</h1>
            <div className="rating-cont">
              <IoIosStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-and-price-cont">
          <div className="location-cont">
            <HiLocationMarker />
            <span className="span-class">{location}</span>
            <BsFillBriefcaseFill />
            <span className="span-class">{employmentType}</span>
          </div>
          <p className="package-para">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <h1 className="description-head">Description</h1>
        <p className="description-para">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default AllJobCard

import './index.css'
import {IoIosStar} from 'react-icons/io'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const similarJobsItem = props => {
  const {detailJodCard} = props
  const {
    title,
    rating,
    companyUrl,
    employmentType,
    jobDescription,
    location,
  } = detailJodCard
  return (
    <li className="similar-job-card-container">
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
      <h1 className="description-head">Description</h1>
      <p className="description-para">{jobDescription}</p>
      <div className="location-and-price-cont">
        <div className="location-cont">
          <HiLocationMarker />
          <span className="span-class">{location}</span>
          <BsFillBriefcaseFill />
          <span className="span-class">{employmentType}</span>
        </div>
      </div>
    </li>
  )
}

export default similarJobsItem

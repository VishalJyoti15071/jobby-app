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
    <li className="similar-job-card-container-sma">
      <div className="image-container">
        <img
          src={companyUrl}
          alt="similar job company logo"
          className="company-logo"
        />
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
          <p className="span-class">{location}</p>
          <BsFillBriefcaseFill />
          <p className="span-class">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default similarJobsItem

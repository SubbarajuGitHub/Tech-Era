import {Component} from 'react'

import './index.css'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SkillCourseDetailedView extends Component {
  state = {specificProduct: [], apiStatus: apiStatusConstants.inProgress}

  componentDidMount() {
    this.renderSpecificDetails()
  }

  // renderSpecificDetails //

  renderSpecificDetails = async () => {
    const {specificProduct, apiStatus} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const data = await fetch(url)
    const jsonData = await data.json()
    if (data.ok === true) {
      const destructingData = jsonData.course_details
      const camelCaseData = {
        imageUrl: destructingData.image_url,
        name: destructingData.name,
        description: destructingData.description,
        id: destructingData.id,
      }
      this.setState({
        specificProduct: camelCaseData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  // render loader page //

  renderLoaderPage = () => {
    const {apiStatus} = this.state
    return (
      <div data-testid="loader" className="loader-div">
        <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
      </div>
    )
  }

  // render failure Page //

  renderFailurePage = () => {
    const {apiStatus} = this.state
    return (
      <div className="failure-div">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-paragraph">
          We cannot seem to find the page you are looking for.
        </p>
        <Link to="/">
          <button className="retry-button" type="button">
            Retry
          </button>
        </Link>
      </div>
    )
  }

  // render success page//
  renderSuccessPage = () => {
    const {specificProduct} = this.state
    const {imageUrl, description, name} = specificProduct
    return (
      <div className="specific-div">
        <img src={imageUrl} alt="website logo" />
        <div className="second-div">
          <h1 className="name">{name}</h1>
          <p className="description">{description}}</p>
        </div>
      </div>
    )
  }

  renderOneLastPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessPage()
      case apiStatusConstants.failure:
        return this.renderFailurePage()
      case apiStatusConstants.inProgress:
        return this.renderLoaderPage()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderOneLastPage()}</div>
  }
}
export default SkillCourseDetailedView

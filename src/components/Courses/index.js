import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import SkillItems from '../SkillItems'

import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Courses extends Component {
  state = {CoursesList: [], apiStatus: apiStatusConstants.inProgress}

  componentDidMount() {
    this.renderCoursesList()
  }

  // renderCoursesList //

  renderCoursesList = async () => {
    const {CoursesList, apiStatus} = this.state
    console.log(CoursesList)
    const url = 'https://apis.ccbp.in/te/courses'
    const data = await fetch(url)
    const jsonData = await data.json()

    // if fetched Data okay //

    if (data.ok === true) {
      const dataDestructing = jsonData.courses
      const camelCaseData = dataDestructing.map(Each => ({
        id: Each.id,
        name: Each.name,
        logoUrl: Each.logo_url,
      }))
      this.setState({
        CoursesList: camelCaseData,
        apiStatus: apiStatusConstants.success,
      })
    }
    // if fetched data not ok need to write else//
    else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  // render success page //

  renderSuccessPage = () => {
    const {CoursesList} = this.state
    return (
      <div>
        <h1 className="heading">Courses</h1>
        <ul className="skill-list-ul">
          {CoursesList.map(EachSkill => (
            <SkillItems EachSkill={EachSkill} />
          ))}
        </ul>
      </div>
    )
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
export default Courses

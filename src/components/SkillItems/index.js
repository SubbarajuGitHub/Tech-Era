import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class SkillItems extends Component {
  render() {
    const {EachSkill} = this.props
    const {logoUrl, name, id} = EachSkill
    console.log(logoUrl)
    return (
      <li>
        <Link to={`/courses/${id}`} className="detailed-item">
          <li className="skill-div">
            <img src={logoUrl} className="logo-image" alt={name} />
            <p className="name">{name}</p>
          </li>
        </Link>
      </li>
    )
  }
}
export default SkillItems

import './App.css'
import {Route, Switch} from 'react-router-dom'

import SkillCourseDetailedView from './components/SkillCourseDetailedView'

import Courses from './components/Courses'

import NotFound from './components/NotFound'

import Header from './components/Header'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Courses} />
      <Route exact path="/courses/:id" component={SkillCourseDetailedView} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App

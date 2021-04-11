import React from 'react'
import { Route, Switch } from 'react-router-dom'
import FrontPage from './FrontPage/FrontPage'

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={FrontPage}/>
    </Switch>
  )
}

export default App

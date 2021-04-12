import React from 'react'
import { Route, Switch } from 'react-router-dom'
import FrontPage from './FrontPage/FrontPage'
import Header from './Header/Header'

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={FrontPage}/>
      </Switch>
    </div>
  )
}

export default App

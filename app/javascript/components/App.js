import React from 'react'
import { Route, Switch } from 'react-router-dom'
import FrontPage from './FrontPage/FrontPage'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import LoginForm from './User/LoginForm'

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={FrontPage}/>
        <Route exact path="/login" component={LoginForm}/>
      </Switch>
      <Footer />
    </div>
  )
}

export default App

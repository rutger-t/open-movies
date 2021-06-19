import React from 'react'
import { Route, Switch } from 'react-router-dom'
import FrontPage from './FrontPage/FrontPage'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import LoginForm from './User/LoginForm'
import SignUpForm from './User/SignUpForm'
import SearchMovie from './Movie/SearchMovie'
import MyPage from './MyPage/MyPage'
import Axios from 'axios'

const App = () => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    Axios.get('/api/v1/users/profile').then(
      res => {
        setUser(res.data['data']['attributes'])
      },
      err => {
        console.log(err)
      }
    );
  }, []);

  return (
    <div>
      <Header user={user} />
      <Switch>
        <Route exact path="/">
          <FrontPage user={user} />
        </Route>
        <Route exact path="/login" component={LoginForm}/>
        <Route exact path="/signup" component={SignUpForm}/>
        <Route exact path="/mypage">
          <MyPage user={user} />
        </Route>
        <Route exact path="/search">
          <SearchMovie user={user} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App

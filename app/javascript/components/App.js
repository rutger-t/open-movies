import React from 'react'
import { Route, Switch } from 'react-router-dom'
import FrontPage from './FrontPage/FrontPage'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import LoginForm from './User/LoginForm'
import Axios from 'axios'

const App = () => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };

    Axios.get('/api/v1/users/profile', config).then(
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
        <Route exact path="/" component={FrontPage}/>
        <Route exact path="/login" component={LoginForm}/>
      </Switch>
      <Footer />
    </div>
  )
}

export default App

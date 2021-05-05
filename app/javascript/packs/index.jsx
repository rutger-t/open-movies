// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import App from '../components/App'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Axios from 'axios';

const token = document.querySelector('[name="csrf-token"]') || {content: 'no-csrf-token'}

if(localStorage.getItem('token')) {
  Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
  Axios.defaults.headers.common['X-CSRF-Token'] = token.content
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Route path="/" component={App}/>
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})

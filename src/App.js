import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import Detalhes from './Detalhes'

function App() {
  return (
    <Router>
      <Header />
      <Route path='/' exact component={Home} />
      <Route path='/detalhes/:id' component={Detalhes} />
    </Router>
  )
}

export default App

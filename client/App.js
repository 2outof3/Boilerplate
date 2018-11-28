import React from 'react'
import { Navbar, Menu } from './components'
import Routes from './Routes'

const App = () => {
  return (
    <div id="app-container" className="app-container">
    <Menu pageWrapId="page-wrap" outerContainerId="app-container" />
    <Navbar />
      <div id="page-wrap">
        <Routes  />
      </div>
    </div>
  )
}

export default App

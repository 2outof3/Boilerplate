import React from 'react'
import { Link } from 'react-router-dom'

/* -----------------    COMPONENT     ------------------ */

const Navbar = () => (
  <div className="navblock">
    <Link to="/" className="link-home">
      <img className="logo" src="/images/flower.png" alt="flower logo" />
      <h1 className="app-name">QuickI18n</h1>
    </Link>
  </div>
)

export default Navbar

/* -----------------    CONTAINER     ------------------ */
//if you'd like to show something user-related on the navbar just connect this component here

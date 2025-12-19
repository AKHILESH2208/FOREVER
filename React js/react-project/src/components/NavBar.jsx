import React from 'react'
import { Link } from 'react-router-dom'
import "../css/NavBar.css"

const NavBar = () => {
  return (
    <nav className='navbar'>
        <div className='navbar-brand'>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favourites" className="nav-link">Favourites</Link>
        </div>
    </nav>
  )
}

export default NavBar
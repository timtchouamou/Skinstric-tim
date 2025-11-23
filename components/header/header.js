import React from 'react'
import headerStyles from './header.css'

const Header = ({ section }) => {
  return (
    <div id='header'>
        <p>SKINSTRIC</p>
        <p className='uppercase'><span className='gray'>&#123; {section} &#125;</span></p>
      
    </div>
  )
}

export default Header

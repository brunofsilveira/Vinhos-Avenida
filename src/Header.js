import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const DivNav = styled.div`
  padding: 0 10px;
`

export default class Header extends Component {
  render() {
    return (
      <nav>
        <DivNav className='nav-wrapper blue darken-4'>
          <Link className='brand-logo' to='/'>Vinhos Avenida</Link>
        </DivNav>
      </nav>
    )
  }
}

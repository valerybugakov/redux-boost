/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'

const StyledBar = styled(AppBar)`
  height: 40px;
  padding: 6px;
  &&& {
    background: #fff;
  }
  text-align: center;
`

const HeaderLogo = styled.img`
  height: 30px;
`

const NavBar = () => (
  <StyledBar>
    <Link to="/">
      <HeaderLogo src="/github.svg" />
    </Link>
  </StyledBar>
)

export default NavBar

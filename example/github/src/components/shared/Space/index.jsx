import React from 'react'
import styled from 'styled-components'

const Space = ({ top, bottom, left, right, children }) => {
  const SpacedDiv = styled.div`
    padding-top: ${top}px;
    padding-bottom: ${bottom}px;
    padding-left: ${left}px;
    padding-right: ${right}px;
  `
  return <SpacedDiv>{children}</SpacedDiv>
}

export default Space

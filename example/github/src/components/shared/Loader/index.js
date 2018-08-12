import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'

import Space from '../Space'

export const StyledPaper = styled(Paper)`
  position: relative;
`

const Loader = () => (
  <Space top={10} bottom={10}>
    <CircularProgress />
  </Space>
)

export default Loader

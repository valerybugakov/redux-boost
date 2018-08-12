import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

export const StyledAvatar = styled(Avatar)`
  &&& {
    height: 100px;
    width: 100px;
  }
  margin: auto;
`

export const Caption = styled(Typography)`
  &&& {
    padding: 5px;
  }
`

export const Title = styled(Typography)`
  &&& {
    padding-top: 5px;
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
`

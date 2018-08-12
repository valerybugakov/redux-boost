import styled from 'styled-components'
import ListItem from '@material-ui/core/ListItem'

export const StyledListItem = styled(ListItem)`
  &&& {
    border-bottom: 1px solid #eaecef;
  }
  &&&:last-child {
    border-bottom: none;
  }
`

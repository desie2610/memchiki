import styled from 'styled-components'
import { Shell } from '../layout/layout.styles.js'

const FooterMood = styled.span`
  color: #82916f;
  font-weight: 600;
`

const FooterBar = styled.footer`
  padding: 18px 0 25px;
  border-top: 1px solid #e9ede4;
  color: #a1a797;
  font-size: 10px;
`

const FooterInner = styled(Shell)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export { FooterMood, FooterBar, FooterInner }

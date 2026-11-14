import { FooterMood, FooterBar, FooterInner } from './Footer.styles.js'

function Footer() {
  return (
    <FooterBar>
      <FooterInner>
        <span>© 2026 Memchiki</span>
        <FooterMood>Тёмная сторона интернета</FooterMood>
      </FooterInner>
    </FooterBar>
  )
}

export default Footer

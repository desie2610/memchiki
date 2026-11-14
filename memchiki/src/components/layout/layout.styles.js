import styled from 'styled-components'

const Page = styled.div`
  min-height: 100vh;
  overflow: hidden;
`

const Shell = styled.div`
  width: min(1180px, calc(100% - 64px));
  margin: 0 auto;

  @media (max-width: 700px) {
    width: min(100% - 36px, 560px);
  }
`

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
  padding-bottom: 76px;
`

export { Page, Shell, ContentLayout }

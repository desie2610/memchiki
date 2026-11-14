import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: 'DM Sans', sans-serif;
    color: #242a24;
    background: #f8faf5;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-optical-sizing: auto;
    font-weight: 400;
  }

  * { box-sizing: border-box; }
  body { margin: 0; min-width: 360px; min-height: 100vh; }
  button, input { font: inherit; }
  button, a { -webkit-tap-highlight-color: transparent; }
  button:focus-visible, a:focus-visible, input:focus-visible {
    outline: 3px solid #a3d946;
    outline-offset: 3px;
  }
  a { color: inherit; text-decoration: none; }
  ::selection { color: #19210e; background: #d3f49a; }
`

export default GlobalStyle

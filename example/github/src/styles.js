import { injectGlobal } from 'styled-components'

// eslint-disable-next-line
injectGlobal`
  body {
    @media (min-width: 600px) {
      margin: 0 15% !important;
    }

    @media(min-width: 321) and @media (max-width: 600px) {
      margin: 0 5% !important;
    }

    padding: 0;
    background: #EEE;
    color: #FFF;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    text-align: center
  }

  #root {
    padding-top: 50px;
  }
`

import defaultTheme from "./default";

import { createTheme } from "@material-ui/core";

const overrides = {
  MuiCssBaseline: {
    '@global': {
      body: {
        fontSize: "13px",
        backgroundColor: '#F2F4F7',
      },
      '*::-webkit-scrollbar': {
        width: '0.3em !important',
        height: '0.3em !important'
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
      },
      '*::scrollbar': {
        width: '0.3em !important',
        height: '0.3em !important'
      },
      '*::scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '*::scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
      },
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.64rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      color: "black",
      fontSize: "1.285rem",
    },
    h6: {
      fontSize: "1.142rem",
    },

    underline: {
      "&&&:before": {
        borderBottom: "none"
      },
      "&&:after": {
        borderBottom: "none"
      }
    },
  },

  MuiInputBase: {
    input: {
      background: "#dd7711",
      padding: 10
    }
  }
};

const themes = {
  default: createTheme({ ...defaultTheme, ...overrides }),
};

export default themes;

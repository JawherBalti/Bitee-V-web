import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import bg from '../src/assets/bg.jpg';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
          backgroundSize: '100vw',
          width: '100%',
          overflow: 'hidden',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.9)),url(${bg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },
        main: {
          display: 'flex',
          flex: 1,
        },

        footer: {
          backgroundImage: 'linear-gradient(to left, #000, #1b1b1bbf, #000)',
          height: '5%',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        },
        video: {
          height: '20rem',
          width: '35rem',
        },
        a: {
          textDecoration: 'none',
        },
        h6: {
          color: '#fff',
        },
        p: {
          color: '#fff',
          fontWeight: 900,
          fontSize: '0.9rem',
          marginLeft: '0.5rem',
        },
        li: {
          fontWeight: 600,
        },
        span: {
          fontWeight: 600,
        },
      },
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 540,
      laptop: 900,
      desktop: 1400,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

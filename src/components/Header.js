import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles({
  logo: {
    color: '#fff',
  },
  time: {
    color: '#fff',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '3rem',
    columnGap: '20%',
  },
  mobileHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '3rem',
    columnGap: '10%',
  },
});

function Header(props) {
  const theme = useTheme();
  const matchesLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down('desktop'));
  const classes = useStyles();

  const [currentTime, setCurrentTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const param = useParams();

  useEffect(() => {
    props.getIsOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const time = new Date();
    setCurrentTime(
      time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  }, []);

  useEffect(() => {
    setInterval(() => {
      const time = new Date();

      setCurrentTime(
        time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }, 1000 * 60);
  }, [currentTime]);

  return (
    <Box className={!matchesLaptop ? classes.header : classes.mobileHeader}>
      <Typography variant="h5" className={classes.logo}>
        TvNow
      </Typography>
      <Paper
        component="form"
        sx={
          !matchesDesktop
            ? {
                p: '2px 4px',
                display: 'flex',
                width: '25%',
                height: '100%',
                borderRadius: '1rem',
                backgroundColor: 'transparent',
                border: '1px solid grey',
                visibility: `${param.id ? 'hidden' : ''}`,
              }
            : !matchesLaptop
            ? {
                p: '2px 4px',
                display: 'flex',
                width: '25%',
                height: '80%',
                borderRadius: '1rem',
                backgroundColor: 'transparent',
                border: '1px solid grey',
                visibility: `${param.id ? 'hidden' : ''}`,
              }
            : {
                p: '1px 2px',
                display: 'flex',
                width: '35%',
                height: '70%',
                borderRadius: '1rem',
                backgroundColor: 'transparent',
                border: '1px solid grey',
                visibility: `${param.id ? 'hidden' : ''}`,
              }
        }
      >
        {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: '#fff',
            fontSize: `${!matchesDesktop ? '1.5rem' : '1rem'}`,
          }}
          placeholder="Find A Channel"
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(e) => props.getSearchedValue(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="button"
          sx={{ p: '10px', color: '#fff' }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Typography
        variant="h5"
        className={classes.time}
        sx={{
          fontFamily: '"Orbitron", sans-serif',
        }}
      >
        {!matchesLaptop ? (
          currentTime
        ) : (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setIsOpen(!isOpen);
              props.getIsOpen(!isOpen);
            }}
            edge="start"
            sx={{
              mr: 2,
              // visibility: `${param.id ? 'hidden' : ''}`
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Typography>
    </Box>
  );
}

export default Header;

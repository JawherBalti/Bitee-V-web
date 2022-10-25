import React, { useState } from 'react';
import List from '@mui/material/List';
import GradeIcon from '@mui/icons-material/Grade';
import {
  Box,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles({
  sidebar: {
    backgroundImage: 'linear-gradient(to top, #000, #1b1b1bbf, #000)',
    flex: 0.2,
    maxHeight: '100vh',
    overflowY: 'auto',
    // -ms-overflow-style: "none", /* IE and Edge */
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  mobileSidebar: {
    position: 'absolute',
    backgroundImage: 'linear-gradient(to top, #000, #1b1b1bbf, #000)',
    zIndex: 99,
    height: '100%',
    width: '35%',
    overflowY: 'scroll',
    // -ms-overflow-style: "none", /* IE and Edge */
    scrollbarWidth: 'none',
    animation: `$showSidebar 500ms ease-in-out`,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  '@keyframes showSidebar': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-200%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
});

function StreamInfo(props) {
  const theme = useTheme();
  const matchesLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down('desktop'));

  const classes = useStyles();

  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);

  const addToFavorites = (channelObj) => {
    let channel = favorites.find((ch) => ch.name === channelObj.name);
    if (!channel) {
      favorites.push(channelObj);
      setIsFavorite(true);
    }
    setFavorites(favorites);
  };

  const removeFromFavorites = () => {
    const index = favorites
      .map((favorite) => favorite.name)
      .indexOf(props.streamInfo.name);
    favorites.splice(index, 1);
    setIsFavorite(false);
    setFavorites(favorites);
  };

  const setFavorites = (channels) => {
    localStorage.setItem('favorites', JSON.stringify(channels));
  };

  const getFavorites = () => {
    if (localStorage.getItem('favorites') != null) {
      return JSON.parse(localStorage.getItem('favorites'));
    } else {
      return [];
    }
  };

  const favorites = getFavorites();

  useEffect(() => {
    favorites.some((favorite) => favorite.name === props.streamInfo.name)
      ? setIsFavorite(true)
      : setIsFavorite(false);
  }, [props.streamInfo.name]);

  return (
    <Box
      className={
        matchesLaptop && props.isOpen ? classes.mobileSidebar : classes.sidebar
      }
    >
      <List
        sx={{
          // hover states
          '& .MuiListItemButton-root:hover': {
            bgcolor: '#7c00006c',
            '&, & .MuiListItemIcon-root': {
              color: 'pink',
            },
          },
        }}
      >
        <ListItemButton onClick={() => navigate('/')}>
          <ArrowBackIosNewIcon
            sx={{
              color: '#fff',
              fontSize: `${!matchesDesktop ? '1.5rem' : '1rem'}`,
              fontWeight: 900,
            }}
          />
          <ListItemText
            primary=" Back"
            disableTypography
            sx={{
              color: '#fff',
              fontSize: `${!matchesDesktop ? '1.5rem' : '1rem'}`,
              fontWeight: 900,
            }}
          />
        </ListItemButton>
      </List>
      <Typography
        component="p"
        sx={{
          fontSize: `${!matchesDesktop ? '1.7rem' : '1rem'}`,
          fontWeight: 900,
          ml: '1rem',
          mb: '1rem',
        }}
      >
        Channel Name:{' '}
        {props.streamInfo.name && (
          <Typography
            component="span"
            sx={{
              fontSize: `${!matchesDesktop ? '1.5rem' : '1rem'}`,
              fontWeight: 900,
              mb: '1rem',
            }}
          >
            {props.streamInfo.name}
          </Typography>
        )}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: `${!matchesDesktop ? '1.7rem' : '1rem'}`,
          fontWeight: 900,
          ml: '1rem',
          mb: '1rem',
        }}
      >
        Languages:{' '}
        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {props.streamInfo.languages &&
            props.streamInfo.languages.map((language) => (
              <ListItemText
                key={language.name}
                disableTypography
                sx={{
                  fontSize: `${!matchesDesktop ? '1.5rem' : '1rem'}`,
                  display: 'list-item',
                  ml: '1rem',
                }}
              >
                {language.name}{' '}
              </ListItemText>
            ))}
        </ListItem>
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: `${!matchesDesktop ? '1.7rem' : '1rem'}`,
          fontWeight: 900,
          ml: '1rem',
        }}
      >
        Countries:{' '}
        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {props.streamInfo.countries &&
            props.streamInfo.countries.map((country) => (
              <ListItemText
                key={country.name}
                disableTypography
                sx={{
                  fontSize: `${!matchesDesktop ? '1.5rem' : '1rem'}`,
                  display: 'list-item',
                  ml: '1rem',
                }}
              >
                {country.name}
              </ListItemText>
            ))}
        </ListItem>
      </Typography>

      {isFavorite ? (
        <Button
          onClick={() => removeFromFavorites(props.streamInfo)}
          sx={{
            mb: '1rem',
            fontSize: `${!matchesDesktop ? '1.5rem' : '1rem'}`,
            textTransform: 'capitalize',
            marginLeft: '0.5rem',
            backgroundColor: '#7c00006c',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#7c00006c',
            },
          }}
        >
          <GradeIcon
            fontSize={!matchesDesktop ? 'large' : 'small'}
            sx={{
              color: 'yellow',
            }}
          />
          Remove From Favorites
        </Button>
      ) : (
        <Button
          onClick={() => addToFavorites(props.streamInfo)}
          sx={{
            fontSize: `${!matchesDesktop ? '1.5rem' : '0.9rem'}`,
            mb: '1rem',
            fontWeight: 900,
            textTransform: 'capitalize',
            marginLeft: '0.5rem',
            backgroundColor: '#7c00006c',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#7c00006c',
            },
          }}
        >
          <GradeIcon
            fontSize={!matchesDesktop ? 'large' : 'small'}
            sx={{
              color: '#fff',
            }}
          />
          Add To Favorites
        </Button>
      )}
    </Box>
  );
}

export default StreamInfo;

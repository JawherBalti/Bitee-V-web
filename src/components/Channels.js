import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Box } from '@mui/system';
import withStyles from '@material-ui/core/styles/withStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import noLogo from '../assets/nologo.jpg';

const FiCard = withStyles({
  root: {
    position: 'relative',
    backgroundColor: '#fff',
  },
})(Card);

const FiCardActionArea = withStyles({
  root: {
    position: 'relative',
    backgroundColor: '#fff',
    height: '100%',
  },
})(CardActionArea);

const FiCardContent = withStyles({
  root: {
    position: 'relative',
    backgroundColor: 'transparent',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: ' 100% 100%',
    // backgroundPosition: 'center center',
  },
})(CardContent);

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fiCardContent: {
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,.24)',
  },

  fiCardContentTextSecondary: {
    color: 'rgba(255,255,255,0.78)',
  },

  channelName: {
    fontFamily: 'Arial Black, Gadget, sans-serif',
    letterSpacing: '-1.4px',
    wordSpacing: '-2px',
    color: '#fff',
    textDecoration: 'none solid rgb(68, 68, 68)',
    fontStyle: 'italic',
    fontVariant: 'normal',
    textTransform: 'capitalize',
  },
});

function Channels(props) {
  const theme = useTheme();
  const matchesLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
  const matchesTablet = useMediaQuery(theme.breakpoints.down('tablet'));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down('desktop'));
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Link to={`/${props.name}`}>
        <FiCard
          className={classes.card}
          sx={
            !matchesDesktop
              ? { borderRadius: '16px', width: 230, height: 120 }
              : !matchesLaptop || !matchesTablet
              ? { borderRadius: '16px', width: 150, height: 80 }
              : { borderRadius: '16px', width: 110, height: 70 }
          }
        >
          <FiCardActionArea>
            <FiCardContent
              className={classes.cardContent}
              sx={{
                backgroundImage: `url(${props.logo ? props.logo : noLogo})`,
              }}
            ></FiCardContent>
          </FiCardActionArea>
        </FiCard>
        <Typography
          sx={
            !matchesDesktop
              ? {
                  fontSize: '1.5rem',
                  fontWeight: 900,
                }
              : !matchesLaptop || !matchesTablet
              ? {
                  fontSize: '0.9rem',
                  fontWeight: 900,
                }
              : {
                  fontSize: '0.7rem',
                  fontWeight: 900,
                }
          }
          align="center"
          className={classes.channelName}
        >
          {props.name.length > 22
            ? `${props.name.substring(0, 19)}...`
            : props.name}
        </Typography>
      </Link>
    </Box>
  );
}

export default Channels;

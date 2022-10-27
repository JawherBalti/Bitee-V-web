import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHlsPlayer from 'react-hls-player';
import Header from './Header';
import { Box, Typography } from '@mui/material';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5rem',
    flex: 0.8,
    marginTop: ' 0.55rem',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    rowGap: '1rem',
  },

  mobileContentHeader: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100vw',
    flex: 1,
    rowGap: '3rem',
  },

  stream: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '1rem',
    width: '100%',
  },
});

function Stream(props) {
  const theme = useTheme();
  const matchesLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down('desktop'));
  // const matchesTablet = useMediaQuery(theme.breakpoints.down('tablet'));
  const classes = useStyles();

  const [stream, setStream] = useState({});

  const param = useParams();

  useEffect(() => {
    props.getChannelName(param.id);
    axios.get('https://iptv-org.github.io/iptv/channels.json').then((res) => {
      setStream(res.data.filter((stream) => stream.name === param.id)[0]);
      props.getStreamInfo(
        res.data.filter((stream) => stream.name === param.id)[0]
      );
    });
  }, []);

  return (
    <Box className={classes.contentContainer}>
      <Box
        className={
          !matchesLaptop ? classes.contentHeader : classes.mobileContentHeader
        }
      >
        <Header getIsOpen={props.getIsOpen} />
        <Box className={classes.stream}>
          <ReactHlsPlayer
            src={stream.url && stream.url.replace('http://', 'https://')}
            autoPlay={true}
            controls={true}
            height="90%"
            width="70%"
          />
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: '#fff',
            fontSize: `${!matchesDesktop ? '1.8rem' : '0.9rem'}`,
            textAlign: 'center',
            marginTop: '0rem',
            fontWeight: 900,
            width: '80%',
          }}
        >
          If the stream is not working, it's either because the stream is
          blocked in your region or the security policy of your browser blocked
          it. In the second scenario, add the Allow CORS extension to your
          browser (Not Recommended On Other Websites)
        </Typography>
      </Box>
    </Box>
  );
}
export default Stream;

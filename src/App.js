import React, { useState } from 'react';
import Content from './components/Content';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Stream from './components/Stream';
import StreamInfo from './components/StreamInfo';
import { Box } from '@mui/material';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
});

function App() {
  const classes = useStyles();

  const [category, setCategory] = useState('');
  const [channelName, setChannelName] = useState('');
  const [streamInfo, setStreamInfo] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   setCurrentUrl(window.location.href.split('/')[3]);
  //   console.log(currentUrl);
  // }, [currentUrl]);

  const getChannelName = (channel) => {
    setChannelName(channel);
  };

  const getCategory = (category) => {
    setCategory(category);
  };

  const getStreamInfo = (stream) => {
    setStreamInfo(stream);
  };

  const getIsOpen = (isOpen) => {
    setIsOpen(isOpen);
  };

  return (
    <Box className={classes.container}>
      <main>
        {channelName === '' ? (
          <SideBar isOpen={isOpen} getCategory={getCategory} />
        ) : (
          <StreamInfo isOpen={isOpen} streamInfo={streamInfo} />
        )}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Content
                getIsOpen={getIsOpen}
                category={category}
                getChannelName={getChannelName}
              />
            }
          ></Route>
          <Route
            exact
            path="/:id"
            element={
              <Stream
                getIsOpen={getIsOpen}
                getChannelName={getChannelName}
                getStreamInfo={getStreamInfo}
              />
            }
          ></Route>
        </Routes>
      </main>
    </Box>
  );
}

export default App;

// import React from 'react'
// import Search from './components/Search'

// function App() {
//   return (
//     <div>
//       <Search/>
//     </div>
//   )
// }

// export default App

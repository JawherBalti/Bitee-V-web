import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Channels from './Channels';
import Header from './Header';
import Pagination from './Pagination';
import { Box } from '@mui/material';
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

  mobileContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '4rem',
    flex: 0.8,
    marginTop: ' 0.55rem',
  },

  contentHeader: {
    flex: 1,
  },

  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem',
    alignItems: 'center',
    height: '90%',
  },

  desktopContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    alignItems: 'center',
    height: '90%',
    width: '100vw',
  },

  mobileContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    alignItems: 'center',
    height: '90%',
    width: '100vw',
  },
});

function Content(props) {
  const theme = useTheme();
  const classes = useStyles();
  const matchesLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down('desktop'));

  const [streams, setStreams] = useState([]);
  const [searchedChannel, setSearchedChannel] = useState('');
  const [searchedChannels, setSearchedChannels] = useState([]);
  const [filterededChannels, setFilteredChannels] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [channelsPerPage, setChannelsPerPage] = useState(12);
  const [itemsList, setItemsList] = useState(0);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const lastOrder = currentPage * channelsPerPage;
  const firstOrder = lastOrder - channelsPerPage;

  const favorites = localStorage.getItem('favorites');

  useEffect(() => {
    if (!favorites) localStorage.setItem('favorites', JSON.stringify([]));
  }, []);

  useEffect(() => {
    props.getChannelName('');
    axios.get('https://iptv-org.github.io/iptv/channels.json').then((res) => {
      setStreams(
        res.data.filter((stream) =>
          stream.categories.some((cat) => cat.name !== 'XXX')
        )
      );
      if (props.category !== '') setSearchedChannel('');
      if (props.category === 'Favorites') {
        setFilteredChannels(JSON.parse(favorites));
      } else {
        setFilteredChannels(
          res.data.filter((stream) =>
            stream.categories.some((cat) => cat.name === props.category)
          )
        );
      }

      setItemsList(
        res.data.filter((stream) =>
          stream.categories.some((cat) => cat.name !== 'XXX')
        ).length
      );

      if (props.category === '' || props.category === 'All') {
        setItemsList(
          res.data.filter((stream) =>
            stream.categories.some((cat) => cat.name !== 'XXX')
          ).length
        );
      } else if (props.category === 'Favorites')
        setItemsList(JSON.parse(favorites).length);
      else
        setItemsList(
          res.data.filter((stream) =>
            stream.categories.some((cat) => cat.name === props.category)
          ).length
        );
    });
    paginate(1);
    setminPageNumberLimit(0);
    setmaxPageNumberLimit(5);
  }, [props.category]);

  const getSearchedValue = (data) => {
    setSearchedChannel(data);
    if (!data) {
      setItemsList(streams.length);
    } else {
      setItemsList(
        streams.filter((stream) => stream.name.toLowerCase().includes(data))
          .length
      );
      setSearchedChannels(
        streams.filter((stream) => stream.name.toLowerCase().includes(data))
      );
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <Box
      className={
        !matchesLaptop
          ? classes.contentContainer
          : classes.mobileContentContainer
      }
    >
      <Box className={classes.contentHeader}>
        <Header
          getIsOpen={props.getIsOpen}
          getSearchedValue={getSearchedValue}
        />
        {!searchedChannel ? (
          <Box
            className={!matchesLaptop ? classes.content : classes.mobileContent}
          >
            {props.category === '' || props.category === 'All' ? (
              <>
                {streams.slice(firstOrder, lastOrder).map((stream) => (
                  <Channels
                    key={stream.url}
                    name={stream.name}
                    logo={stream.logo}
                  />
                ))}
              </>
            ) : props.category === 'Favorites' ? (
              <>
                {filterededChannels
                  .slice(firstOrder, lastOrder)
                  .map((stream) => (
                    <Channels name={stream.name} logo={stream.logo} />
                  ))}
              </>
            ) : (
              <>
                {filterededChannels
                  .slice(firstOrder, lastOrder)

                  .filter(
                    (stream) =>
                      stream.categories.length &&
                      stream.categories.some(
                        (cat) => cat.name === props.category
                      )
                  )
                  .map((stream) => (
                    <Channels name={stream.name} logo={stream.logo} />
                  ))}
              </>
            )}
          </Box>
        ) : (
          <Box
            className={!matchesLaptop ? classes.content : classes.mobileContent}
          >
            {searchedChannels
              .slice(firstOrder, lastOrder)
              .filter((stream) => {
                return (
                  stream.name
                    .toLowerCase()
                    .indexOf(searchedChannel.toLowerCase()) !== -1
                );
              })
              .map((stream) => (
                <Channels name={stream.name} logo={stream.logo} />
              ))}
          </Box>
        )}

        <Pagination
          itemsPerPage={channelsPerPage}
          totalItems={itemsList}
          paginate={paginate}
          currentPage={currentPage}
          maxPageNumberLimit={maxPageNumberLimit}
          minPageNumberLimit={minPageNumberLimit}
          handleNextbtn={handleNextbtn}
          handlePrevbtn={handlePrevbtn}
        ></Pagination>
      </Box>
      <footer
        style={{
          fontSize: `${!matchesDesktop ? '1.5rem' : '1rem'}`,
          fontWeight: '900',
        }}
      >
        &copy; All Rights Reserved 2022
      </footer>
    </Box>
  );
}

export default Content;

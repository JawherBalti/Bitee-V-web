import { Box, List } from '@mui/material';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles({
  pagination: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '0.5rem',
    margin: 0,
    listStyleType: 'none',
    //.pagination > li > button
    '& li': {
      '& button': {
        backgroundColor: '#7c0000b4',
        color: '#fff',
        cursor: 'pointer',
        borderRadius: '0.4rem',
        width: '3rem',
        height: '2.5rem',
        border: '1px solid grey',
        '&:disabled': {
          //.pagination > li > button:disabled
          cursor: 'not-allowed',
          backgroundColor: '#7c00006c',
        },
      },
    },
  },
  pageNumber: {
    '& li': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid grey',
      borderRadius: '0.4rem',
      width: '1.5rem',
      height: '1.5rem',
      cursor: 'pointer',
      color: '#fff',
    },
  },
  activePage: {
    backgroundColor: '#7c0000b4',
  },
});

function Pagination(props) {
  const theme = useTheme();
  const matchesDesktop = useMediaQuery(theme.breakpoints.down('desktop'));
  const classes = useStyles();

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    if (
      number < props.maxPageNumberLimit + 1 &&
      number > props.minPageNumberLimit
    ) {
      return (
        <div key={number} className={classes.pageNumber}>
          <li
            style={{
              width: `${!matchesDesktop ? '2.5rem' : '1.5rem'}`,
              height: `${!matchesDesktop ? '2.5rem' : '1.5rem'}`,
              fontSize: `${!matchesDesktop ? '1.2rem' : '0.9rem'}`,
              fontWeight: `${!matchesDesktop ? 900 : 400}`,
            }}
            className={props.currentPage === number ? classes.activePage : ''}
            onClick={() => props.paginate(number)}
          >
            {number}
          </li>
        </div>
      );
    } else {
      return null;
    }
  });

  return (
    <Box>
      <List className={classes.pagination}>
        <li>
          <button
            style={{
              width: `${!matchesDesktop ? '4.5rem' : '3rem'}`,
              height: `${!matchesDesktop ? '3.5rem' : '2.5rem'}`,
              fontSize: `${!matchesDesktop ? '1.2rem' : '0.9rem'}`,
              fontWeight: `${!matchesDesktop ? 900 : 400}`,
            }}
            onClick={props.handlePrevbtn}
            disabled={props.currentPage === pageNumbers[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {renderPageNumbers}
        <li>
          <button
            style={{
              width: `${!matchesDesktop ? '4.5rem' : '3rem'}`,
              height: `${!matchesDesktop ? '3.5rem' : '2.5rem'}`,
              fontSize: `${!matchesDesktop ? '1.2rem' : '0.9rem'}`,
              fontWeight: `${!matchesDesktop ? 900 : 400}`,
            }}
            onClick={props.handleNextbtn}
            disabled={
              props.currentPage === pageNumbers[pageNumbers.length - 1]
                ? true
                : false
            }
          >
            Next
          </button>
        </li>
      </List>
    </Box>
  );
}

export default Pagination;

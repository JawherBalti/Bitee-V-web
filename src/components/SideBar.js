import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles({
  sidebar: {
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
    zIndex: 99,
    maxHeight: '100vh',
    width: '55%',
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

function SideBar(props) {
  const theme = useTheme();
  const matchesLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down('desktop'));
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-2);

  const handleListItemClick = (index, category) => {
    setSelectedIndex(index);
    props.getCategory(category);
  };

  useEffect(() => {
    axios
      .get('https://iptv-org.github.io/api/categories.json')
      .then((res) =>
        setCategories(res.data.filter((category) => category.name !== 'XXX'))
      );
  }, []);

  return (
    <div
      className={
        matchesLaptop && props.isOpen ? classes.mobileSidebar : classes.sidebar
      }
    >
      <Divider />
      <List
        sx={{
          backgroundImage: 'linear-gradient(to top, #000, #1b1b1bbf, #000)',
          // // selected and (selected + hover) states
          '&& .Mui-selected, && .Mui-selected:hover': {
            bgcolor: '#7c00006c',
            '&, & .MuiListItemIcon-root': {
              color: 'pink',
            },
          },

          // hover states
          '& .MuiListItemButton-root:hover': {
            bgcolor: '#7c00006c',
            '&, & .MuiListItemIcon-root': {
              color: 'pink',
            },
          },
        }}
      >
        <ListItemButton
          selected={selectedIndex === -2}
          onClick={() => handleListItemClick(-2, 'All')}
        >
          <ListItemText
            primary="All"
            disableTypography
            sx={{
              color: '#fff',
              fontWeight: 900,
              fontSize: `${!matchesDesktop ? '1.5rem' : '1rem'}`,
            }}
          />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === -1}
          onClick={() => handleListItemClick(-1, 'Favorites')}
        >
          <ListItemText
            primary="Favorites"
            disableTypography
            sx={{
              color: '#fff',
              fontWeight: 900,

              fontSize: `${!matchesDesktop ? '1.5rem' : '1rem'}`,
            }}
          />
        </ListItemButton>
        {categories.map((category, index) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index, category.name)}
            >
              <ListItemText
                primary={category.name}
                disableTypography
                sx={{
                  color: '#fff',
                  fontWeight: 900,

                  fontSize: `${!matchesDesktop ? '1.5rem' : '1rem'}`,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SideBar;

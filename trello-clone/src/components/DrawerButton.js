import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HeaderButton from './HeaderButton';
import './DrawerButtons.css';

const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
});

const DrowerButton = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const anchor = 'right';

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, 'menu_dialog')}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="menu_title">
        <List>
          {['Menu'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <></> : <></>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
      <div className="menu_list">
        <List>
          {[
            'About this board',
            'Change background',
            'Search cards',
            'Stickers',
            'More',
          ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <></> : <></>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );

  return (
    <div>
      <>
        <HeaderButton
          name="faEllipsisH"
          text="Show menu"
          isSubheader={true}
          myFunction={toggleDrawer(anchor, true)}
        />
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </>
    </div>
  );
};

export default DrowerButton;

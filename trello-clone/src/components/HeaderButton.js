import './HeaderButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faClipboard,
  faPlus,
  faInfoCircle,
  faBell,
  faChartBar,
  faStar,
  faUserLock,
  faEllipsisH,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Board_Popup from '../components/popovers/Board_popup';
import '../components/popovers/Popup_components.css';
import Private_Popup from '../components/popovers/Private_popup';
import Invite_Popup from '../components/popovers/Invite_popup';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  paper_popover: {
    maxWidth: '390px',
  },
}));

const HeaderButton = ({
  name,
  text,
  isSubheader,
  myFunction,
  type,
  isNotClickable,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const renderIcon = (icon) => {
    switch (icon) {
      case 'faBars':
        return faBars;
      case 'faClipboard':
        return faClipboard;
      case 'faPlus':
        return faPlus;
      case 'faBars':
        return faBars;
      case 'faInfo':
        return faInfoCircle;
      case 'faBell':
        return faBell;
      case 'faChartBar':
        return faChartBar;
      case 'faStar':
        return faStar;
      case 'faUserLock':
        return faUserLock;
      case 'faEllipsisH':
        return faEllipsisH;
      case 'faAddressBook':
        return faAddressBook;
    }
  };

  const renderClass = () => {
    if (isSubheader === true) {
      return 'subheader_button';
    }
    return 'header_button';
  };

  const callFunction = (event) => {
    if (myFunction) {
      myFunction();
    } else {
      if (isNotClickable === true) {
        return;
      } else {
        handleClick(event);
      }
    }
  };

  const renderPopover = () => {
    switch (type) {
      case 'board':
        return Board_Popup();
      case 'private':
        return Private_Popup();
      case 'invite':
        return Invite_Popup();
    }
  };

  return (
    <>
      <div onClick={(event) => callFunction(event)} className={renderClass()}>
        <FontAwesomeIcon icon={renderIcon(name)} />
        {text ? (
          <div>
            {isSubheader === true ? (
              <>&nbsp;{text}</>
            ) : (
              <>
                <strong>&nbsp;{text}</strong>
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className={classes.paper_popover}>
          <Typography className={classes.typography}>
            {renderPopover()}
          </Typography>
        </div>
      </Popover>
    </>
  );
};

export default HeaderButton;

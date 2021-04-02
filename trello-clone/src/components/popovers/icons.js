import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStream,
  faTable,
  faCalendarAlt,
  faTachometerAlt,
  faMapMarkerAlt,
  faUnlockAlt,
  faUserFriends,
  faSitemap,
  faGlobeEurope,
  faCheck,
  faLink,
  faServer,
  faSlidersH,
  faCommentDots,
  faTrash,
  faSignOutAlt,
  faBox,
  faHouseUser,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

const IconAwesome = ({ name }) => {
  const renderIcon = (icon) => {
    switch (icon) {
      case 'faStream':
        return faStream;
      case 'faTable':
        return faTable;
      case 'faCalendarAlt':
        return faCalendarAlt;
      case 'faTachometerAlt':
        return faTachometerAlt;
      case 'faMapMarkerAlt':
        return faMapMarkerAlt;
      case 'faUnlockAlt':
        return faUnlockAlt;
      case 'faUserFriends':
        return faUserFriends;
      case 'faSitemap':
        return faSitemap;
      case 'faGlobeEurope':
        return faGlobeEurope;
      case 'faGlobeEurope':
        return faGlobeEurope;
      case 'faCheck':
        return faCheck;
      case 'faLink':
        return faLink;
      case 'faServer':
        return faServer;
      case 'faSlidersH':
        return faSlidersH;
      case 'faCommentDots':
        return faCommentDots;
      case 'faTrash':
        return faTrash;
      case 'faSignOutAlt':
        return faSignOutAlt;
      case 'faBox':
        return faBox;
      case 'faHouseUser':
        return faHouseUser;
      case 'faEdit':
        return faEdit;
    }
  };

  return (
    <div>
      <FontAwesomeIcon className="icons_awesome" icon={renderIcon(name)} />
    </div>
  );
};
export default IconAwesome;

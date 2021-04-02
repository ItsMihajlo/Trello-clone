import { useContext } from 'react';
import './Header.css';
import AuthContext from '../contexts/AuthContext';
import ListsContext from '../contexts/ListsContext';
import IconAwesome from './popovers/icons';
import BoardsContext from '../contexts/BoardsContext';
import { useHistory } from 'react-router';

const Header = () => {
  const history = useHistory();

  const authContext = useContext(AuthContext);
  const listsContext = useContext(ListsContext);
  const boardsContext = useContext(BoardsContext);

  const home = () => {
    history.push('/');
  };

  const logout = () => {
    authContext.setValidated(false);
    localStorage.removeItem('key');
    localStorage.removeItem('validated');
    localStorage.removeItem('token');
    history.push('/login');
    listsContext.setLists([]);
  };

  return (
    <header className="header">
      <div className="header_part">
        <button className="header_button" onClick={() => home()}>
          <IconAwesome name="faHouseUser"></IconAwesome>
          <strong>Home</strong>
        </button>
      </div>

      <div className="header_title_part">
        <IconAwesome name="faBox"></IconAwesome>
        <div>Trello</div>
      </div>

      <div className="header_part">
        <button className="header_button" onClick={() => logout()}>
          <IconAwesome name="faSignOutAlt"></IconAwesome>
        </button>
      </div>
    </header>
  );
};

export default Header;

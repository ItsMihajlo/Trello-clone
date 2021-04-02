import { useContext, useEffect } from 'react';
import axios from 'axios';
import environment from '../environment';
import './Login.css';
import routes from '../routes';
import AuthContext from '../contexts/AuthContext';
import BoardsContext from '../contexts/BoardsContext';
import IconsAwesome from '../components/popovers/icons';
import { useHistory } from 'react-router';

const Login = ({ name }) => {
  const history = useHistory();

  const authContext = useContext(AuthContext);
  const boardsContext = useContext(BoardsContext);

  useEffect(() => {
    authContext.setKey(environment.KEY);
    authContext.setToken(environment.TOKEN);
  }, []);

  const submit = async () => {
    const result = await axios.get(
      `${environment.API_URL}/${routes.BOARDS}?key=${authContext.key}&token=${authContext.token}`
    );
    if (result.status === 200) {
      boardsContext.setBoards(result.data);
      authContext.setValidated(true);
      localStorage.setItem('key', authContext.key);
      localStorage.setItem('token', authContext.token);
      localStorage.setItem('validated', true);
      history.push('/');
    }
  };

  return (
    <div className="login_view">
      <IconsAwesome name="faBox"> </IconsAwesome>
      <div className="login_part">
        <label className="api_label" htmlFor="key">
          Your API Key:
        </label>

        <input
          className="api_input"
          type="password"
          id="key"
          name="key"
          value={authContext.key}
          onChange={(event) => authContext.setKey(event.target.value)}
        />

        <label className="api_label" htmlFor="token">
          Your API Token:
        </label>

        <input
          className="api_input"
          type="password"
          id="token"
          name="token"
          value={authContext.token}
          onChange={(event) => authContext.setToken(event.target.value)}
        />

        <button onClick={() => submit()}>Submit</button>
      </div>
    </div>
  );
};

export default Login;

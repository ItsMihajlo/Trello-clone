import './App.css';
import Login from './screens/Login';
import { useEffect, useState } from 'react';
import AuthContext from './contexts/AuthContext';
import BoardsContext from './contexts/BoardsContext';
import ChangeContext from './contexts/ChangeContext';
import ListsContext from './contexts/ListsContext';
import BoardsList from './screens/BoardsList';
import Board from './screens/Board';
import axios from 'axios';
import routes from './routes';
import environment from './environment';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [key, setKey] = useState('');
  const [token, setToken] = useState('');
  const [validated, setValidated] = useState(false);
  const [boards, setBoards] = useState([]);
  const [lists, setLists] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem('key');
    const token = localStorage.getItem('token');
    const validated = localStorage.getItem('validated');
    if (key && token && validated) {
      setKey(key);
      setToken(token);
      setValidated(validated);
      fetchBoards(key, token);
    }
  }, []);

  const fetchBoards = async (key, token) => {
    const result = await axios.get(
      `${environment.API_URL}/${routes.BOARDS}?key=${key}&token=${token}`
    );
    if (result.status === 200) {
      setBoards(result.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, key, setKey, validated, setValidated }}
    >
      <BoardsContext.Provider value={{ boards, setBoards }}>
        <ChangeContext.Provider value={{ change, setChange }}>
          <ListsContext.Provider value={{ lists, setLists }}>
            <Router>
              <div>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/board/:boardId" component={Board} />
                  <Route path="/card/:cardId" component={Board} />
                  <Route path="/" component={BoardsList} />
                </Switch>
              </div>
            </Router>
          </ListsContext.Provider>
        </ChangeContext.Provider>
      </BoardsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

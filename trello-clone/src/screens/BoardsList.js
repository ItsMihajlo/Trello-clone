import { useContext, useEffect, useState } from 'react';
import './BoardsList.css';
import '../components/BoardsBox.js';
import BoardsBox from '../components/BoardsBox.js';
import BoardsContext from '../contexts/BoardsContext';
import axios from 'axios';
import environment from '../environment';
import AuthContext from '../contexts/AuthContext';
import ListsContext from '../contexts/ListsContext';
import routes from '../routes';
import ChangeContext from '../contexts/ChangeContext';
import IconAwesome from '../components/popovers/icons';
import { useHistory } from 'react-router';

const BoardsList = () => {
  const history = useHistory();

  const boardsContext = useContext(BoardsContext);
  const authContext = useContext(AuthContext);
  const listsContext = useContext(ListsContext);
  const changeContext = useContext(ChangeContext);

  const [showNewBoardInput, setShowNewBoardInput] = useState(false);
  const [newBoardNameInput, setNewBoardNameInput] = useState('');

  const removeBoard = async (id) => {
    const res = await axios.delete(
      ` ${environment.API_URL}/${routes.BOARD}/${id}?key=${authContext.key}&token=${authContext.token}`
    );
    if (res.status === 200) {
      boardsContext.setBoards([
        ...boardsContext.boards.filter((board) => board.id !== id),
      ]);
    }
  };

  const fetchBoard = async (id) => {
    const result = await axios.get(
      `${environment.API_URL}/${routes.BOARD}/${id}/lists?key=${authContext.key}&token=${authContext.token}&cards=open`
    );
    listsContext.setLists(result.data);
    history.push(`/board/${id}`);
  };

  useEffect(() => {
    if (changeContext.change === true) {
      fetchBoard();
    }
  }, [changeContext.change]);

  const addNewBoard = async () => {
    setShowNewBoardInput(false);
    const res = await axios.post(
      `${environment.API_URL}/boards/?key=${authContext.key}&token=${authContext.token}&name=${newBoardNameInput}`
    );
    boardsContext.setBoards([...boardsContext.boards, { ...res.data }]);
    changeContext.setChange(false);
  };

  return (
    <>
      <div className="boards_list">
        <div className="header_boards">
          <div className="header_element title_part">Boards</div>
          <div className="header_element button_part">
            {showNewBoardInput ? (
              <div className="add_new_board new_board">
                <input
                  className="add_new_board_input"
                  onChange={(event) => setNewBoardNameInput(event.target.value)}
                  type="text"
                  placeholder="Enter Board title..."
                />
                <button onClick={() => addNewBoard()}>Add Board</button>
              </div>
            ) : (
              <div
                className="add_new_board board_btn"
                onClick={() => setShowNewBoardInput(true)}
              >
                + Add Board
              </div>
            )}
          </div>
        </div>

        {boardsContext.boards.map((board) => (
          <div key={board.id}>
            <div className="delete_board">
              <button onClick={() => removeBoard(board.id)}>
                <IconAwesome name="faTrash"></IconAwesome>
              </button>
            </div>
            <div className="board_element" onClick={() => fetchBoard(board.id)}>
              <BoardsBox text={board.name} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BoardsList;

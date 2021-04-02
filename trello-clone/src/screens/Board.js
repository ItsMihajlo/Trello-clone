import { useContext, useEffect, useState } from 'react';
import List from '../components/List';
import Header from '../components/Header';
import Subheader from '../components/Subheader';
import ListsContext from '../contexts/ListsContext';
import axios from 'axios';
import environment from '../environment';
import './Board.css';
import ChangeContext from '../contexts/ChangeContext';
import AuthContext from '../contexts/AuthContext';
import routes from '../routes';
import { useParams } from 'react-router-dom';

const Board = () => {
  let { boardId } = useParams();
  let { cardId } = useParams();

  const listsContext = useContext(ListsContext);
  const authContext = useContext(AuthContext);
  const changeContext = useContext(ChangeContext);

  const [showNewListInput, setShowNewListInput] = useState(false);
  const [newListNameInput, setNewListNameInput] = useState('');

  const fetchBoard = async (boardIdArg) => {
    const bId = listsContext.lists[0]
      ? listsContext.lists[0].idBoard
      : boardIdArg;
    const result = await axios.get(
      `${environment.API_URL}/${routes.BOARD}/${bId}/lists?key=${authContext.key}&token=${authContext.token}&cards=open`
    );
    changeContext.setChange(false);
    listsContext.setLists(result.data);
  };

  const fetchBoardByCard = async () => {
    const res = await axios.get(
      `${environment.API_URL}/cards/${cardId}?key=${environment.KEY}&token=${environment.TOKEN}&fields=idBoard`
    );
    fetchBoard(res.data.idBoard);
  };

  useEffect(() => {
    if (listsContext.lists.length === 0 && authContext.key !== '') {
      if (cardId) {
        fetchBoardByCard();
      }
      fetchBoard(boardId);
    }
  }, [authContext.key]);

  useEffect(() => {
    if (changeContext.change === true) {
      fetchBoard();
    }
  }, [changeContext.change]);

  const addNewList = async () => {
    setShowNewListInput(false);
    const res = await axios.post(
      `${environment.API_URL}/lists?key=${environment.KEY}&token=${environment.TOKEN}&name=${newListNameInput}&idBoard=${listsContext.lists[0].idBoard}&pos=bottom`
    );

    listsContext.setLists([...listsContext.lists, { ...res.data, cards: [] }]);
  };

  return (
    <div className="container">
      <Header />
      <Subheader />
      {/* nad njom uradi scroll */}
      <div className="board_lists">
        {listsContext.lists.map((list) => (
          <List
            name={list.name}
            key={list.id}
            listId={list.id}
            cards={list.cards}
            setLists={listsContext.setLists}
            lists={listsContext.lists}
            openCardIfIncludes={cardId}
          />
        ))}
        {showNewListInput ? (
          <div className="add_another_list another_list">
            <input
              className="add_list"
              onChange={(event) => setNewListNameInput(event.target.value)}
              type="text"
              placeholder="Enter list title..."
            />
            <button onClick={() => addNewList()}>Add List</button>
          </div>
        ) : (
          <div
            className="new-list another_list"
            onClick={() => setShowNewListInput(true)}
          >
            + Add another list
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;

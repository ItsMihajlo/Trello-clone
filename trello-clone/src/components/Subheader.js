import './Subheader.css';
import HeaderButton from './HeaderButton';
import DrawerButton from './DrawerButton';
import { useContext, useEffect, useState } from 'react';
import BoardsContext from '../contexts/BoardsContext';
import ListsContext from '../contexts/ListsContext';
import environment from '../environment';
import axios from 'axios';

const Subheader = () => {
  const listsContext = useContext(ListsContext);
  const boardsContext = useContext(BoardsContext);

  const [boardName, setBoardName] = useState('');
  const [boardNameInput, setBoardNameInput] = useState('');
  const [isEditingBoardName, setIsEditingBoardName] = useState(false);
  const [boardId, setBoardId] = useState(-1);

  useEffect(() => {
    if (listsContext.lists.length > 0) {
      const tmpBoardId = listsContext.lists[0].idBoard;
      setBoardId(tmpBoardId);
      const tmpBoard = boardsContext.boards.find(
        (board) => board.id === tmpBoardId
      );
      if (tmpBoard) {
        setBoardName(tmpBoard.name);
      }
    }
  }, [listsContext.lists, boardsContext.boards]);

  const toggleEditing = () => {
    setIsEditingBoardName(!isEditingBoardName);
  };

  const updateBoardName = async () => {
    const res = await axios.put(
      `${environment.API_URL}/boards/${boardId}?key=${environment.KEY}&token=${environment.TOKEN}&name=${boardNameInput}`
    );
    toggleEditing();
    if (res.status === 200) {
      setBoardName(boardNameInput);
    }
  };

  return (
    <div className="subheader">
      <div className="subheader_part">
        <HeaderButton
          name="faChartBar"
          text="Board"
          isSubheader={true}
          type="board"
        />
        <span className="divider_buttons"></span>
        {isEditingBoardName === true ? (
          <input
            className="input_update_board"
            onBlur={() => updateBoardName()}
            onChange={(event) => setBoardNameInput(event.target.value)}
            type="text"
          ></input>
        ) : (
          <HeaderButton
            text={boardName}
            isSubheader={true}
            myFunction={toggleEditing}
          />
        )}
        <HeaderButton
          name="faUserLock"
          text="Private"
          isSubheader={true}
          type="private"
        />
        <HeaderButton
          name="faAddressBook"
          text="Invite"
          isSubheader={true}
          type="invite"
        />
      </div>
      <div className="subheader_part">
        <DrawerButton></DrawerButton>
      </div>
    </div>
  );
};

export default Subheader;

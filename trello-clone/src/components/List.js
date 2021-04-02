import { useContext, useEffect, useState } from 'react';
import Card from './Card';
import './List.css';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import axios from 'axios';
import ChangeContext from '../contexts/ChangeContext';
import environment from '../environment';
import ListsContext from '../contexts/ListsContext';
import Draggable from 'react-draggable';
import IconAwesome from './popovers/icons';

const List = ({ name, cards, listId, openCardIfIncludes }) => {
  const changeContext = useContext(ChangeContext);
  const listsContext = useContext(ListsContext);

  const [cardNameInput, setCardNameInput] = useState('');
  const [showAddNewCardInput, setShowAddNewCardInput] = useState(false);

  const [listName, setListName] = useState(name);
  const [listNameInput, setListNameInput] = useState('');
  const [isEditingListName, setIsEditingListName] = useState(false);

  const toggleEditing = () => {
    setIsEditingListName(!isEditingListName);
  };

  const updateListName = async () => {
    const res = await axios.put(
      `${environment.API_URL}/lists/${listId}?key=${environment.KEY}&token=${environment.TOKEN}&name=${listNameInput}`
    );
    toggleEditing();
    if (res.status === 200) {
      setListName(listNameInput);
    }
  };

  const addCard = async () => {
    const res = await axios.post(`${environment.API_URL}/cards?key=${environment.KEY}&token=${environment.TOKEN}&idList=${listId}&name=${cardNameInput}
`);
    changeContext.setChange(true);
    setShowAddNewCardInput(false);
  };

  const removeList = async () => {
    const res = await axios.put(
      ` ${environment.API_URL}/lists/${listId}/closed?key=${environment.KEY}&token=${environment.TOKEN}&value=true`
    );
    if (res.data.closed === true) {
      listsContext.setLists([
        ...listsContext.lists.filter((list) => list.id !== res.data.id),
      ]);
    }
  };

  return (
    <div className="wrapper">
      <div className="card_header">
        {isEditingListName === true ? (
          <input
            className="input_list_update"
            type="text"
            onBlur={() => updateListName()}
            onChange={(event) => setListNameInput(event.target.value)}
          ></input>
        ) : (
          <div onClick={() => toggleEditing()}>
            <strong>{listName}</strong>
          </div>
        )}
        <button className="delete_list" onClick={() => removeList()}>
          <IconAwesome name="faTrash"></IconAwesome>
        </button>
      </div>
      <div className="list" data-simplebar>
        {cards.map((card) => (
          <Draggable>
            <div key={card.id}>
              {openCardIfIncludes === card.id ? (
                <Card
                  boardId={listsContext.lists[0].idBoard}
                  name={card.name}
                  id={card.id}
                  desc={card.desc}
                  shouldOpen={true}
                />
              ) : (
                <Card
                  boardId={listsContext.lists[0].idBoard}
                  name={card.name}
                  id={card.id}
                  desc={card.desc}
                />
              )}
            </div>
          </Draggable>
        ))}
      </div>
      <div className="add_card_div" style={{ paddingBottom: 7 }}>
        {showAddNewCardInput === false ? (
          <div
            className="add_another_card_button"
            onClick={() => setShowAddNewCardInput(true)}
          >
            + Add another card
          </div>
        ) : (
          <div className="add_card_button_area">
            <input
              className="add_card"
              onChange={(event) => setCardNameInput(event.target.value)}
              type="text"
              placeholder="Enter a title for this card..."
            />
            <div>
              <button className="add_card_btn" onClick={() => addCard()}>
                Add Card
              </button>
            </div>
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default List;

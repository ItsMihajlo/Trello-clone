import { useEffect, useState } from 'react';
import './Card.css';
import CardDialog from './CardDialog';
import { useHistory } from 'react-router';

const Card = ({ name, id, desc, shouldOpen, boardId }) => {
  const history = useHistory();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (shouldOpen === true) {
      setOpen(true);
    }
  }, []);

  const close = () => {
    history.push(`/board/${boardId}`);
    setOpen(false);
  };

  const openCard = () => {
    setOpen(true);
    history.replace(`/card/${id}`);
  };

  const renderName = (name) => {
    if (name.length > 75) {
      return `${name.slice(0, 75)}...`;
    }
    return name;
  };

  return (
    <div>
      <div className="card" onClick={() => openCard()}>
        {renderName(name)}
      </div>
      <CardDialog open={open} onClose={close} name={name} id={id} desc={desc} />
    </div>
  );
};

export default Card;

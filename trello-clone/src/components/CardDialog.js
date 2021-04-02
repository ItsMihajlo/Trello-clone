import React, { useContext, useEffect, useState } from 'react';
import { formatMs, makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
// import PersonIcon from '@material-ui/icons/Person';
// import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import './CardDialog.css';
import axios from 'axios';
import environment from '../environment';
import ChangeContext from '../contexts/ChangeContext';

import IconAwesome from './popovers/icons';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const SimpleDialog = ({ onClose, selectedValue, open, name, id, desc }) => {
  const classes = useStyles();

  const changeContext = useContext(ChangeContext);

  const [openNameEditInput, setOpenNameEditInput] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [descInput, setDescInput] = useState(desc);
  const [commentInput, setCommentInput] = useState('');
  const [startedEditingDesc, setStartedEditingDesc] = useState(false);
  const [comments, setComments] = useState([]);

  const [editCommentInput, setEditCommentInput] = useState('');
  const [openEditCommentInput, setOpenEditCommentInput] = useState(false);

  const handleListItemClick = (value) => {
    onClose(value);
  };

  useEffect(() => {
    fetchComments();
  }, [open]);

  const fetchComments = async () => {
    if (open === true) {
      const res = await axios.get(
        `${environment.API_URL}/cards/${id}/actions?key=${environment.KEY}&token=${environment.TOKEN}`
      );
      setComments([...res.data]);
    }
  };

  const updateName = async () => {
    const res = await axios.put(
      `${environment.API_URL}/cards/${id}?key=${environment.KEY}&token=${environment.TOKEN}&name=${nameInput}`
    );
    setOpenNameEditInput(false);
    changeContext.setChange(true);
  };

  const updateDescription = async () => {
    const res = await axios.put(
      `${environment.API_URL}/cards/${id}?key=${environment.KEY}&token=${environment.TOKEN}&desc=${descInput}`
    );
    setStartedEditingDesc(false);
    changeContext.setChange(true);
  };

  const addComment = async () => {
    const res = await axios.post(
      `${environment.API_URL}/cards/${id}/actions/comments?key=${environment.KEY}&token=${environment.TOKEN}&desc=${descInput}&text=${commentInput}`
    );
    if (res.status === 200) {
      setCommentInput('');
      setComments([res.data, ...comments]);
    }
  };

  const deleteComment = async (commentId) => {
    const res = await axios.delete(
      `${environment.API_URL}/cards/${id}/actions/${commentId}/comments?key=${environment.KEY}&token=${environment.TOKEN}`
    );
    if (res.status === 200) {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  const updateComment = async (commentId) => {
    const res = await axios.put(
      `${environment.API_URL}/cards/${id}/actions/${commentId}/comments?key=${environment.KEY}&token=${environment.TOKEN}&text=${editCommentInput} `
    );
    setOpenEditCommentInput(false);
    changeContext.setChange(true);
    if (res.status === 200) {
      setOpenEditCommentInput(false);
      changeContext.setChange(true);
    }
  };
  /* OVDE */

  const deleteCard = async () => {
    const res = await axios.delete(
      `${environment.API_URL}/cards/${id}?key=${environment.KEY}&token=${environment.TOKEN}`
    );
    if (res.status === 200) {
      onClose();
      changeContext.setChange(true);
    }
  };

  return (
    <Dialog
      onClose={onClose}
      fullWidth={true}
      maxWidth={'md'}
      aria-labelledby="simple-dialog-title"
      className="dialog"
      open={open}
    >
      <div className="delete_card">
        <button onClick={() => deleteCard()}>Delete Card</button>
      </div>
      <div className="header_card">
        <IconAwesome name="faServer"></IconAwesome>
        <DialogTitle id="simple-dialog-title" className="title">
          {openNameEditInput === false ? (
            <div onClick={() => setOpenNameEditInput(true)}>{nameInput}</div>
          ) : (
            <>
              <input
                onChange={(event) => setNameInput(event.target.value)}
                value={nameInput}
                type="text"
                className="input_title"
              />
              <button onClick={() => updateName()}>Update</button>
            </>
          )}
        </DialogTitle>
      </div>
      <div className="desciption_card">
        <div>
          <IconAwesome name="faSlidersH"></IconAwesome>
          <div className="description"> Description</div>
        </div>
        <div>
          <input
            className="update_description"
            value={descInput}
            onClick={() => setStartedEditingDesc(true)}
            onChange={(event) => setDescInput(event.target.value)}
            placeholder="Add a more detailed description..."
            type="text"
          />
          {startedEditingDesc === true ? (
            <button onClick={() => updateDescription()}>Save</button>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="comment_card">
        <div>
          <IconAwesome name="faCommentDots"></IconAwesome>
          <div className="comment"> Comment </div>
        </div>
        <div>
          <input
            value={commentInput}
            className="update_comment"
            onChange={(event) => setCommentInput(event.target.value)}
            placeholder="Write a comment..."
          />
          <button className="add_comment_btn" onClick={() => addComment()}>
            Add
          </button>
        </div>

        <div>
          {comments.map((comment) => {
            return (
              <div className="all_comments" key={comment.id}>
                {/* <img src={comment.memberCreator.avatarUrl} style={{width:20, height: 20, borderRadius:50}}/> */}
                {/* Zabranjen je pristup slikama */}
                <div className="author_name">
                  {comment.memberCreator.fullName}:
                </div>

                <div className="message_modification_area">
                  <div className="message">{comment.data.text}</div>
                  <div className="modification_message">
                    <button onClick={() => deleteComment(comment.id)}>
                      <IconAwesome name="faTrash"></IconAwesome>
                    </button>

                    {openEditCommentInput === false ? (
                      <button onClick={() => setOpenEditCommentInput(true)}>
                        <IconAwesome name="faEdit"></IconAwesome>
                      </button>
                    ) : (
                      <>
                        <input
                          onChange={(event) =>
                            setEditCommentInput(event.target.value)
                          }
                          className="input_comment_update"
                          placeholder="Edit..."
                          type="text"
                        />
                        <button
                          className="update_button"
                          onClick={() => updateComment(comment.id)}
                        >
                          Update
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Dialog>
  );
};

export default SimpleDialog;

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

// export default function SimpleDialogDemo() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
//       <br />
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
//     </div>
//   );
// }

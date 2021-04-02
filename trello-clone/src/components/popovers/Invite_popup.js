import IconAwesome from './icons';

const Invite_Popup = () => {
  return (
    <div className="invite_popup">
      <div className="popup_header">Invite to board</div>
      <input placeholder="Email address or name" className="invite_box"></input>

      <div className="link_invite_elements">
        <div className="link_invite">
          <IconAwesome name="faLink" />
          Invite with link
        </div>

        <div className="link_column">
          <a href="#">Create Link</a>
        </div>
      </div>

      <div className="description">
        Anyone with link can join as board member
      </div>
      <button className="invitation active">Send invitation</button>
    </div>
  );
};

export default Invite_Popup;

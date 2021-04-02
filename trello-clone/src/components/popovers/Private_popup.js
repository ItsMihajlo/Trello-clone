import { colors } from '@material-ui/core';
import IconAwesome from './icons';

const Private_Popup = () => {
  return (
    <div className="private_popup">
      <header className="popup_header">Change visibility</header>

      <div className="private_popup_element ">
        <div className="title_column private">
          <IconAwesome name="faUnlockAlt" />
          <div className="element_status">Private</div>
          <span className="hidden checked">
            <IconAwesome name="faCheck" />
          </span>
        </div>
        <div className="description_column">
          Only board members can see and edit this board.
        </div>
      </div>

      <div className="private_popup_element">
        <div className="title_column team">
          <IconAwesome name="faUserFriends" />
          <div className="element_status">Team</div>
          <span className="hidden checked">
            <IconAwesome name="faCheck" />
          </span>
        </div>
        <div className="description_column">
          All members of the TrainMeTeam team ca see and edit his board.
        </div>
      </div>

      <div className="private_popup_element disable">
        <div className="title_column organization">
          <IconAwesome name="faSitemap" />
          <div className="element_status">Organization</div>
        </div>
        <div className="description_column">
          All members of the organization can see this board. The board must be
          added to an enterprise team to enable this.
        </div>
      </div>

      <div className="private_popup_element">
        <div className="title_column public">
          <IconAwesome name="faGlobeEurope" />
          <div className="element_status">Public</div>
          <span className="hidden checked">
            <IconAwesome name="faCheck" />
          </span>
        </div>
        <div className="description_column">
          Anyone on the internet (including Google) can see this board. Only
          board members can edit.
        </div>
      </div>
    </div>
  );
};

export default Private_Popup;

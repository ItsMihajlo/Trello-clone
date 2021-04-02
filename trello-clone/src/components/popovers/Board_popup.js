import './Popup_components.css';
import IconAwesome from './icons';

const Board_Popup = () => {
  return (
    <div className="board_popup">
      <header className="popup_header">
        <div className="title_header"> See your work in new ways</div>
        <div className="subtitle_header">
          View key timelines, assignments, data, and more directly from your
          Trello board with Buisness Class.
        </div>
      </header>

      <div className="board_popup_element">
        <div className="timeline icon_column">
          <IconAwesome name="faStream" />
        </div>
        <div className="text_column">
          <div className="element_title">Timeline</div>
          <div className="element_description">
            Visually plan time and workload.
          </div>
        </div>
      </div>

      <div className="board_popup_element">
        <div className="table icon_column">
          <IconAwesome name="faTable" />
        </div>
        <div className="text_column">
          <div className="element_title">Table</div>
          <div className="element_description">
            Display cards in rows and columns, like a spreadsheet.
          </div>
        </div>
      </div>

      <div className="board_popup_element">
        <div className="calendar icon_column">
          <IconAwesome name="faCalendarAlt" />
        </div>
        <div className="text_column">
          <div className="element_title">Calendar</div>
          <div className="element_description">
            See cards with dates on a calendar.
          </div>
        </div>
      </div>

      <div className="board_popup_element">
        <div className="dashboard icon_column">
          <IconAwesome name="faTachometerAlt" />
        </div>
        <div className="text_column">
          <div className="element_title">Dashboard</div>
          <div className="element_description">
            Generate charts, visuals, and metrics for your work.
          </div>
        </div>
      </div>

      <div className="board_popup_element">
        <div className="map icon_column">
          <IconAwesome name="faMapMarkerAlt" />
        </div>
        <div className="text_column">
          <div className="element_title">Map</div>
          <div className="element_description">
            Visualize card locations on an interactive map.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Board_Popup;

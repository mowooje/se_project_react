import avatar from "../../assets/avatar.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="sidebar__avatar" />
      <p className="sidebar__username">Michael Owooje</p>
    </div>
  );
}

export default SideBar;

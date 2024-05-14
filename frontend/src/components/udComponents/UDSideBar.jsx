import React from 'react';
import '../../css/style.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPalette,
  faCartPlus,
  faBullhorn,
  faCreditCard,
  faChartLine,
  faUser,
  faComments,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import userAtom from "./../../atoms/userAtom";
import { useRecoilValue } from "recoil";

const UDSideBar = () => {
  const user = useRecoilValue(userAtom);
  return (
    <div id="nav-bar">
      <input id="nav-toggle" type="checkbox"/>
      <div id="nav-header">
        <a id="nav-title" href="https://codepen.io" target="_blank">
          CODEPEN
        </a>
        <label htmlFor="nav-toggle"><span id="nav-toggle-burger"></span></label>
        <hr/>
      </div>
      <div id="nav-content">
        {/* Dashboard */}
        <div className="nav-button">
          <Link to={`/userDashboard/${user.username}/udhome`}>
            <FontAwesomeIcon icon={faPalette} />
            <span> Dashboard</span>
          </Link>
        </div>

        

        {/* Product */}
        <div className="nav-button">
          <Link to={`/userDashboard/${user.username}/udproduct`}>
            <FontAwesomeIcon icon={faCartPlus} />
            <span> Product</span>
          </Link>
        </div>

        {/* Advertisement */}
        <div className="nav-button">
          <Link to={`/userDashboard/${user.username}/udadvertisement`}>
            <FontAwesomeIcon icon={faBullhorn} />
            <span> Advertisement</span>
          </Link>
        </div>
        
        <hr/>

        {/* Sales Analysis */}
        <div className="nav-button">
          <Link to={`/userDashboard/${user.username}/udslaesanalysis`}>
            <FontAwesomeIcon icon={faChartLine} />
            <span> Sales Analysis</span>
          </Link>
        </div>

        {/* Advertisement Analysis */}
        <div className="nav-button">
          <Link to={`/userDashboard/${user.username}/udadvertanalysis`}>
            <FontAwesomeIcon icon={faChartLine} />
            <span> Advertisement Analysis</span>
          </Link>
        </div>
        
        <hr/>

        {/* Profile */}
        <div className="nav-button">
          <Link to={`/userDashboard/${user.username}/udprofile`}>
            <FontAwesomeIcon icon={faUser} />
            <span> Profile</span>
          </Link>
        </div>

        {/* Chats */}
        <div className="nav-button">
          <Link to={`/userDashboard/${user.username}/udchats`}>
            <FontAwesomeIcon icon={faComments} />
            <span> Chats</span>
          </Link>
        </div>

        {/* Settings */}
        <div className="nav-button">
          <Link to={`/userDashboard/${user.username}/udsettings`}>
            <FontAwesomeIcon icon={faCog} />
            <span> Settings</span>
          </Link>
        </div>
        <div id="nav-content-highlight"></div>
      </div>
      <input id="nav-footer-toggle" type="checkbox"/>
      <div id="nav-footer">
        <div id="nav-footer-avatar">
          <img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" alt="User Avatar" />
        </div>
        <div id="nav-footer-titlebox">
        </div>
      </div>
    </div>
  );
}

export default UDSideBar;

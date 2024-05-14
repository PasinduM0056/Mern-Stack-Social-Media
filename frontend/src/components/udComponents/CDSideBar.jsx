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

const CDSideBar = () => {
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
          <Link to={`/consultantDashboard/${user.username}/cdhome`}>
            <FontAwesomeIcon icon={faPalette} />
            <span> Dashboard</span>
          </Link>
        </div>

        

        {/* Product */}
        <div className="nav-button">
          <Link to={`/consultantDashboard/${user.username}/cdpackage`}>
            <FontAwesomeIcon icon={faCartPlus} />
            <span> Package</span>
          </Link>
        </div>

        {/* Advertisement */}
        <div className="nav-button">
          <Link to={`/consultantDashboard/${user.username}/cdadvertisement`}>
            <FontAwesomeIcon icon={faBullhorn} />
            <span> Advertisement</span>
          </Link>
        </div>
        
        <hr/>

        {/* Sales Analysis */}
        <div className="nav-button">
          <Link to={`/consultantDashboard/${user.username}/cdbuyersanalysis`}>
            <FontAwesomeIcon icon={faChartLine} />
            <span> Buyers Analysis</span>
          </Link>
        </div>

        {/* Advertisement Analysis */}
        <div className="nav-button">
          <Link to={`/consultantDashboard/${user.username}/cdadvertanalysis`}>
            <FontAwesomeIcon icon={faChartLine} />
            <span> Advertisement Analysis</span>
          </Link>
        </div>
        
        <hr/>

        {/* Profile */}
        <div className="nav-button">
          <Link to={`/consultantDashboard/${user.username}/cdprofile`}>
            <FontAwesomeIcon icon={faUser} />
            <span> Profile</span>
          </Link>
        </div>

        {/* Chats */}
        <div className="nav-button">
          <Link to={`/consultantDashboard/${user.username}/cdchats`}>
            <FontAwesomeIcon icon={faComments} />
            <span> Chats</span>
          </Link>
        </div>

        {/* Settings */}
        <div className="nav-button">
          <Link to={`/consultantDashboard/${user.username}/cdsettings`}>
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

export default CDSideBar;

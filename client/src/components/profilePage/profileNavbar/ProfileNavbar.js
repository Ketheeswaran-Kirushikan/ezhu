import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/file(2).png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faGlobe,
  faMessage,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import ChatComponent from "../../Chat/ChatComponent";
import "./ProfileNavbar.css";

const ProfileNavbar = ({ userData, token }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { _id, user_name, images } = userData || {};

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const openChat = (e) => {
    e.preventDefault();
    if (!isChatOpen) {
      setIsChatOpen(true);
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="profile-nav-fixed">
      <div className="p-3 text-center profile-nav-background border-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 d-flex justify-content-center justify-content-md-start mb-1 mb-md-0">
              <Link to="/">
                <img src={logo} className="profile-nav-image" alt="MDB Logo" />
              </Link>
            </div>
            <div className="col-md-4 profile-nav-search">
              <form className="d-flex input-group my-auto">
                <input
                  autoComplete="off"
                  type="search"
                  className="form-control rounded profile-nav-input"
                  placeholder="Search"
                />
                <span className="input-group-text border-0 d-none d-lg-flex">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </form>
            </div>
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <div className="d-flex profile-nav-icons">
                <Link className="text-reset me-3" to="#" onClick={openChat}>
                  <span>
                    <FontAwesomeIcon icon={faMessage} />
                  </span>
                </Link>
                <Link className="text-reset me-3" to="/notification">
                  <span>
                    <FontAwesomeIcon icon={faBell} />
                  </span>
                </Link>
                <Link className="text-reset me-3" to="/cardForm">
                  <span>
                    <FontAwesomeIcon icon={faGlobe} />
                  </span>
                </Link>
                <div className="d-flex align-items-center profile-nav-name">
                  <Link
                    className="text-reset me-3"
                    to="/profileedit"
                    state={{ userData, token }}
                  >
                    <span>
                      <p className="m-0">{user_name}</p>
                    </span>
                  </Link>
                  <Link
                    to="/profileedit"
                    state={{ userData, token }}
                    className="btn btn-link p-0"
                  >
                    <img
                      src={images}
                      className="rounded-circle"
                      height="32"
                      alt="User Avatar"
                      loading="lazy"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary border-bottom">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarCenteredExample"
            aria-controls="navbarCenteredExample"
            aria-expanded={!isCollapsed ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={toggleCollapse}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div
            className={`collapse navbar-collapse justify-content-center ${
              !isCollapsed ? "show" : ""
            }`}
            id="navbarCenteredExample"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item profile-nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  Community
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Investors
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Skills
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Work shop
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ChatComponent
        isChatOpen={isChatOpen}
        closeChat={closeChat}
        userId={_id}
        userName={user_name}
        userImage={images}
        userToken={token}
      />
    </div>
  );
};

export default ProfileNavbar;

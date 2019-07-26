import React from "react";
import "./sidebar.scss";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <header className="sidebar-header">
        <input
          type="text"
          className="sidebar-header-search"
          placeholder="Search here..."
          spellCheck={false}
        />
      </header>
      <div className="sidebar-content">
        <nav className="sidebar-content-nav">
          <div className="sidebar-content-nav-item sidebar-content-nav-item--active">
            Trending
          </div>
          <div className="sidebar-content-nav-item">Most Popular</div>
          <div className="sidebar-content-nav-item">Most Recent</div>
        </nav>
      </div>
      <footer className="sidebar-footer" />
    </div>
  );
}

export default Sidebar;

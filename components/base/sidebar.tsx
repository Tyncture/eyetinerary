import React from "react";
import "./sidebar.scss";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
        <header className="sidebar-header">
          <input
            type="text"
            className="sidebar-header-search"
            placeholder="Search here..."
          />
        </header>
        <div className="sidebar-content">
          <nav className="sidebar-content-nav">
            <div className="sidebar-content-nav-item sidebar-content-nav-item--active">Trending</div>
            <div className="sidebar-content-nav-item">Most Popular</div>
            <div className="sidebar-content-nav-item">Most Recent</div>
          </nav>
        </div>
        <footer className="sidebar-footer" />
      </div>
    );
  }
}

export default Sidebar;

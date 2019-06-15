import React from 'react';
import './sidebar.scss';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
        <header className="sidebar-header">
          <div className="sidebar-header-logo" />
          <div className="sidebar-header-controls" />
        </header>
        <div className="sidebar-content">{this.props.children}</div>
        <footer className="sidebar-footer" />
      </div>
    );
  }
}

export default Sidebar;

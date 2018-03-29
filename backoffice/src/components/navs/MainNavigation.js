import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './mainnavigation.css';

const isdisabled = (path, currentpath) =>
  (path !== '/'
    ? path !== '/' && currentpath.indexOf(path) !== -1
    : currentpath === '/');

const renderLink = (label, path, icon, minimize, currpath) => {
  const disabled = isdisabled(path, currpath) ? 'active' : '';
  return (
    // eslint-disable-next-line
    <a href={path} className={`link ${disabled}`}>
      <i className={`icon-${icon}`} />
      {minimize ? null : <span>{label}</span>}
    </a>
  );
};

const MainNavigation = ({ path, minimize }) => (
  <div id="main-navigation"
    className={`flex-rows flex-between ${minimize ? '' : 'opened'}`}>
    <nav className="flex-rows flex-start">
      {renderLink('Dashboard', '/', 'gauge', minimize, path)}
      {renderLink('Restrictions', '/restrictions', 'alert', minimize, path)}
      {renderLink('Contributeurs', '/contributeurs', 'users', minimize, path)}
    </nav>
  </div>
);

MainNavigation.defaultProps = {
  minimize: true,
};

MainNavigation.propTypes = {
  path: PropTypes.string.isRequired,
  minimize: PropTypes.bool.isRequired,
};

export default connect()(MainNavigation);

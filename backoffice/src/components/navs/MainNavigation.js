import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const isdisabled = (path, currentpath) =>
  (path !== '/'
    ? path !== '/' && currentpath.indexOf(path) !== -1
    : currentpath === '/');

const renderLink = (label, path, icon, minimize, currpath) => {
  const disabled = isdisabled(path, currpath) ? 'active' : '';
  return (
    // eslint-disable-next-line
    <a to={path} className={`button ${disabled}`}>
      <i className={`editor-icon-${icon}`} />
      {minimize ? null : <span>{label}</span>}
    </a>
  );
};

const MainNavigation = ({
  user, path, islogged, minimize,
}) => (
  <div id="main-navigation" className="flex-rows flex-between">
    <nav className="flex-rows top-nav">
      {renderLink('Dashboard', '/', 'gauge', minimize, path)}
      {islogged &&
        renderLink('Applications', '/applications', 'window', minimize, path)}
      {/* renderLink('Games', '/games', 'gamepad', minimize, path)}
      {renderLink('Categories', '/categories', 'bookmarks', minimize, path)}
      {renderLink('Markers', '/markers', 'location', minimize, path)}
      {renderLink('Maps', '/maps', 'map', minimize, path) */}
    </nav>
    <nav className="flex-rows bottom-nav">
      {user && renderLink('User', `/users/${user._id}`, 'user', minimize, path)}
    </nav>
  </div>
);

MainNavigation.defaultProps = {
  minimize: true,
};

MainNavigation.propTypes = {
  path: PropTypes.string.isRequired,
  minimize: PropTypes.bool.isRequired,
  islogged: PropTypes.bool.isRequired,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(MainNavigation);

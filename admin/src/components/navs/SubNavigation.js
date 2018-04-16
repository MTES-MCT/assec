import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import './mainnavigation.css';
import { keypath } from './../../core/utils/keypath';

const isdisabled = (path, currentpath) =>
  (path !== '/'
    ? path !== '/' && currentpath.indexOf(path) !== -1
    : currentpath === '/');

const SubNavigation = ({ path, routes, minimize }) => (
  <div id="main-navigation"
    className={`flex-rows flex-between ${minimize ? '' : 'opened'}`}>
    <nav className="flex-rows flex-start">
      {routes.map((obj) => {
        const disabled = isdisabled(obj.path, path) ? 'active' : '';
        const key = keypath(obj.path, 'navigation');
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link to={obj.path} key={key} className={`link ${disabled}`}>
            <i className={`icon-${obj.icon}`} />
            {minimize ? null : <span>{obj.label}</span>}
          </Link>
        );
      })}
    </nav>
  </div>
);

SubNavigation.defaultProps = {
  minimize: true,
};

SubNavigation.propTypes = {
  minimize: PropTypes.bool,
  path: PropTypes.string.isRequired,
  routes: PropTypes.array.isRequired,
};

export default connect()(SubNavigation);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import { toggleNavigation } from './../actions';
import { keypath } from './../core/utils/keypath';

const isdisabled = (path, currentpath) =>
  (path !== '/'
    ? path !== '/' && currentpath.indexOf(path) !== -1
    : currentpath === '/');

const AppNavigation = ({
  path, routes, minimized, dispatch,
}) => (
  <div id="main-navigation"
    className={` flex-rows flex-between ${minimized ? '' : 'opened'}`}>
    <nav className="flex-rows flex-start">
      <button className="toggler no-background"
        onClick={() => dispatch(toggleNavigation())}>
        <span>
          <i className={`icon icon-${minimized ? 'right' : 'left'}-open-mini`} />
        </span>
      </button>
      {routes.main.map((obj) => {
        const disabled = isdisabled(obj.path, path) ? 'active' : '';
        const key = keypath(obj.path, 'navigation');
        return (
          <Link to={obj.path} key={key} className={`link ${disabled}`}>
            <i className={`icon-${obj.icon}`} />
            {minimized ? null : <span className="label">{obj.name}</span>}
          </Link>
        );
      })}
    </nav>
    <nav className="flex-rows flex-end">
      {routes.sub.map((obj) => {
        const disabled = isdisabled(obj.path, path) ? 'active' : '';
        const key = keypath(obj.path, 'navigation');
        return (
          <Link to={obj.path} key={key} className={`link ${disabled}`}>
            <i className={`icon-${obj.icon}`} />
            {minimized ? null : <span className="label">{obj.name}</span>}
          </Link>
        );
      })}
    </nav>
  </div>
);

AppNavigation.propTypes = {
  path: PropTypes.string.isRequired,
  routes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  minimized: PropTypes.bool.isRequired,
};

export default connect()(AppNavigation);

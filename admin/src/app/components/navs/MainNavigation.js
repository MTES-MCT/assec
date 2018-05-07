import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import './mainnavigation.css';
import { toggleNavigation } from './../../actions';
import { keypath } from './../../core/utils/keypath';

const isdisabled = (path, currentpath) =>
  (path !== '/'
    ? path !== '/' && currentpath.indexOf(path) !== -1
    : currentpath === '/');

const MainNavigation = ({
  path, routes, minimized, dispatch,
}) => (
  <div id="main-navigation" className={`${minimized ? '' : 'opened'}`}>
    <div className="flex-rows flex-between">
      <button className="no-background"
        onClick={() => dispatch(toggleNavigation())}>
        <span>
          <i className={`icon icon-${minimized ? 'right' : 'left'}-open-mini`} />
        </span>
      </button>
      <nav className="flex-rows flex-start">
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
  </div>
);

MainNavigation.propTypes = {
  path: PropTypes.string.isRequired,
  routes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  minimized: PropTypes.bool.isRequired,
};

export default connect()(MainNavigation);

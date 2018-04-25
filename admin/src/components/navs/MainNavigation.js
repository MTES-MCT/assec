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
  path, routes, openednav, dispatch,
}) => (
  <div id="main-navigation"
    className={`flex-rows flex-between ${!openednav ? '' : 'opened'}`}>
    <button className="no-background"
      onClick={() => dispatch(toggleNavigation())}>
      <span>
        <i className={`icon icon-${!openednav ? 'right' : 'left'}-open-mini`} />
      </span>
    </button>
    <nav className="flex-rows flex-start">
      {routes.map((obj) => {
        const disabled = isdisabled(obj.path, path) ? 'active' : '';
        const key = keypath(obj.path, 'navigation');
        return (
          <Link to={obj.path} key={key} className={`link ${disabled}`}>
            <i className={`icon-${obj.icon}`} />
            <span className="label">{obj.name}</span>
          </Link>
        );
      })}
    </nav>
  </div>
);

MainNavigation.propTypes = {
  path: PropTypes.string.isRequired,
  routes: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  openednav: PropTypes.bool.isRequired,
};

export default connect(({ openednav }) => ({ openednav }))(MainNavigation);

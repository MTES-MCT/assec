import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// application
import { routes } from './routes';
import { debug } from './lib/debug';
import { keypath } from './lib/keypath';
import { pagetitle } from './lib/pagetitle';
import MainNavigation from './components/navs/MainNavigation';

const PageComponent = ({ location, popin }) => {
  let bodyclass = `route-page-${location.pathname
    .split('/')
    .filter(v => v)
    .join('-') || 'home'}`;
  if (popin) bodyclass = `${bodyclass} noscroll`;
  return (
    <div id="app-container" className="flex-columns">
      <Helmet>
        <body className={`${bodyclass}`} />
        <title>
          {pagetitle(routes, location.pathname)}
          {debug() ? ' | DEV' : ''} | Assec Backoffice
        </title>
        {/* <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto" /> */}
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700" />
      </Helmet>
      <MainNavigation path={location.pathname} routes={routes} />
      <div id="page-container" className="flex1">
        {/* routes */}
        <Switch>
          {routes.map(({
            path, exact, name, icon, component: Page,
          }) => {
            const key = keypath(path, 'route');
            return (
              <Route key={key}
                path={path}
                render={() => <Page config={{ name, icon, path }} />}
                exact={exact || false} />
            );
          })}
        </Switch>
        {/* routes */}
      </div>
    </div>
  );
};

PageComponent.defaultProps = {
  popin: null,
};

PageComponent.propTypes = {
  popin: PropTypes.object,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  popin: state.popin,
  location: state.router.location,
});

export default connect(mapStateToProps)(PageComponent);

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

const getbodyclass = (path, haspopin) =>
  `route-page-${path
    .split('/')
    .filter(v => v)
    .join('-') || 'home'}${haspopin ? ' noscroll' : ''}`;

const PageComponent = ({ location, popin }) => (
  <div id="app-container" className="flex-columns">
    <Helmet>
      <body className={getbodyclass(location.pathname, popin)} />
      <title>
        {pagetitle(routes, location.pathname)}
        {debug() ? ' | DEV' : ''} | Assec Backoffice
      </title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600"
        rel="stylesheet" />
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

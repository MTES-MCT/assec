import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// application
import { routes } from './routes';
import AppFooter from './components/AppFooter';
import { keypath } from './core/utils/keypath';
import { usedebug } from './core/utils/usedebug';
import { pagetitle } from './core/utils/pagetitle';
import MainNavigation from './components/navs/MainNavigation';

const appversion = process.env.REACT_APP_VERSION;

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
        {usedebug() ? ' | DEV' : ''} | Assec Backoffice
      </title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600"
        rel="stylesheet" />
    </Helmet>
    <MainNavigation path={location.pathname} routes={routes.main} />
    <div id="page-container" className="flex1">
      {/* routes */}
      <Switch>
        {routes.main
          .concat(routes.sub)
          .map(({
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
      <AppFooter version={appversion} />
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

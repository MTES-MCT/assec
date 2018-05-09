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
import AppHeader from './../app/components/AppHeader';
import AppNavigation from './components/AppNavigation';

const getbodyclass = (path, haspopin) =>
  `route-page-${path
    .split('/')
    .filter(v => v)
    .join('-') || 'home'}${haspopin ? ' noscroll' : ''}`;

const PageComponent = ({
  location, popin, version, openednav,
}) => (
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
    <AppNavigation routes={routes}
      minimized={!openednav}
      path={location.pathname} />
    <div id="page-container"
      className={`flex-rows flex-between flex1 ${openednav ? 'opened' : ''}`}>
      <AppHeader title="ASSEC" version={version} />
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
      <AppFooter version={version} />
    </div>
  </div>
);

PageComponent.defaultProps = {
  popin: null,
};

PageComponent.propTypes = {
  popin: PropTypes.object,
  version: PropTypes.string.isRequired,
  openednav: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  popin: state.popin,
  openednav: state.openednav,
  location: state.router.location,
});

export default connect(mapStateToProps)(PageComponent);

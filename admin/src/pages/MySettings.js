import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';

class MySettingsPage extends React.PureComponent {
  render () {
    const {
      config: { name, ...rest },
    } = this.props;
    return (
      <AppPage name={`Gestion ${name}`} {...rest}>
        <div id="page-main-column" />
        <div id="page-aside-column" />
      </AppPage>
    );
  }
}

MySettingsPage.propTypes = {
  config: PropTypes.object.isRequired,
};

export default MySettingsPage;

import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';
import EntitySelector from './../components/forms/EntitySelector';

class AlertsPage extends React.PureComponent {
  render () {
    const { config: { name, ...rest } } = this.props;
    return (
      <AppPage name={`Gestion ${name}`}
        {...rest}
        header={() => (
          <fieldset>
            <EntitySelector onChange={this.onChange} />
          </fieldset>
        )}>
        <div id="page-main-column" />
        <div id="page-aside-column" />
      </AppPage>
    );
  }
}

AlertsPage.propTypes = {
  config: PropTypes.object.isRequired,
};

export default AlertsPage;

import React from 'react';
import PropTypes from 'prop-types';

// application
import PageTitle from './../components/ui/PageTitle';

class AppPage extends React.PureComponent {
  render () {
    const {
      children, path, name, icon,
    } = this.props;
    return (
      <div id={`${path}-page`} className="page-content">
        <PageTitle label={name} icon={icon} />
        <div className="flex-columns">{children}</div>
      </div>
    );
  }
}

AppPage.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AppPage;

import React from 'react';
import PropTypes from 'prop-types';

// application
class AppPage extends React.PureComponent {
  render () {
    const {
      children, path, name, icon,
    } = this.props;
    return (
      <div id={`${path}-page`} className="page-content">
        <h1 id="page-title" className="mb20 pb12 bb">
          {icon && <i className={`icon icon-${icon}`} />}
          <span>{name}</span>
        </h1>
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

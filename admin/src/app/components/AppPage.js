import React from 'react';
import PropTypes from 'prop-types';

// application
class AppPage extends React.PureComponent {
  render () {
    const {
      header, footer, children, path, name,
    } = this.props;
    return (
      <div id={`${path}-page`} className="page-content flex-rows flex-start">
        <h1 id="page-title" className="flex0 mb20 pb12 bb">
          <span>{name}</span>
        </h1>
        {header && <div id="page-column-header">{header()}</div>}
        <div id="page-column-content" className="flex1 flex-columns">
          {children}
        </div>
        {footer && <div id="page-column-footer">{header()}</div>}
      </div>
    );
  }
}

AppPage.defaultProps = {
  footer: null,
  header: null,
};

AppPage.propTypes = {
  footer: PropTypes.func,
  header: PropTypes.func,
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AppPage;

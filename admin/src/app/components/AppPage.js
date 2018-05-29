import React from 'react';
import PropTypes from 'prop-types';

// application
class AppPage extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { resized: false };
    this.onResizeContent = this.onResizeContent.bind(this);
  }

  onResizeContent () {
    this.setState(prev => ({ resized: !prev.resized }));
  }

  render () {
    const {
      header, footer, children, path, name,
    } = this.props;
    const { resized } = this.state;
    return (
      <div id={`${path}-page`} className="page-content flex-rows flex-start">
        <h1 id="page-title"
          className="flex-1 mb20 pb12 bb relative flex-columns flex-between">
          <span>{name}</span>
          {/* <button className="resize-button" onClick={this.onResizeContent}>
            <i className={`icon icon-${resized ? 'left' : 'right'}-dir`} />
          </button> */}
        </h1>
        {header && <div id="page-column-header">{header()}</div>}
        <div id="page-column-content"
          className={`flex1 flex-columns ${(resized && 'opened') || ''}`}>
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

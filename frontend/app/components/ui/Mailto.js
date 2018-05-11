import React from 'react';
import PropTypes from 'prop-types';

const emailstyle = {
  direction: 'rtl',
  userSelect: 'none',
  unicodeBidi: 'bidi-override',
};

export const combineHeaders = (searchParams = {}) =>
  Object.keys(searchParams)
    .map(key => `${key}=${encodeURIComponent(searchParams[key])}`)
    .join('&');

class Mailto extends React.PureComponent {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    event.preventDefault();
    const { email, headers } = this.props;
    const href = `mailto:${email}`;
    const helpers = (headers && `?${combineHeaders(headers)}`) || '';
    window.location.href = `${href}${helpers}`;
  }

  render () {
    const { email, children, ...rest } = this.props;
    return (
      <a {...rest}
        href="the_quick_brown_fox_jumps_over_the_lazy_dog"
        onClick={this.handleClick}
        style={(!children && emailstyle) || {}}>
        {children ||
          email
            .split('')
            .reverse()
            .join('')
            .replace('(', ')')
            .replace(')', '(')}
      </a>
    );
  }
}

Mailto.defaultProps = {
  headers: null,
  children: null,
};

Mailto.propTypes = {
  children: PropTypes.node,
  headers: PropTypes.object,
  email: PropTypes.string.isRequired,
};

export default Mailto;

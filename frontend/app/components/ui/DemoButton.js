import React from 'react';
import PropTypes from 'prop-types';
import { ScrollLink } from 'react-scroll';

const LinkComponent = ({ children, ...rest }) => (
  <button {...rest}>{children}</button>
);

LinkComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

const Link = ScrollLink(LinkComponent);

const DemoButton = ({ islarge }) => (
  <Link to="essayez-la-demo"
    spy
    hashSpy
    smooth
    duration={800}
    className={`demo-button ${(islarge && 'large') || ''}`}>
    <span>Essayer la démo</span>
    <i className="icon icon-thumbs-up ml7" />
  </Link>
);

DemoButton.defaultProps = {
  islarge: false,
};

DemoButton.propTypes = {
  islarge: PropTypes.bool,
};

export default DemoButton;

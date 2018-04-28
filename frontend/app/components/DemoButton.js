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

const styles = {
  container: {
    right: '0',
    top: '70px',
    position: 'absolute',
  },
  button: {
    color: '#FFFFFF',
    fontSize: '1.3em',
    borderRadius: '4px',
    textDecoration: 'none',
    padding: '12px 18px 12px 24px',
  },
  icon: {
    fontSize: '1.3em',
  },
};

const DemoButton = () => (
  <div id="demobutton" className="padded" style={styles.container}>
    <Link style={styles.button} to="demo" smooth duration={500}>
      <span>Essayez la démo</span>
      <i className="icon icon-thumbs-up ml7" style={styles.icon} />
    </Link>
  </div>
);

export default DemoButton;

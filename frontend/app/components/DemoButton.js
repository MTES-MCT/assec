import React from 'react';

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
    <button href="#demo" style={styles.button}>
      <span>Essayez la démo</span>
      <i className="icon icon-thumbs-up ml7" style={styles.icon} />
    </button>
  </div>
);

export default DemoButton;

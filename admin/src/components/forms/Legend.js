import React from 'react';
import PropTypes from 'prop-types';

const Legend = ({ label, icon }) => (
  <legend>
    <h5>
      {icon && <i className={`icon icon-${icon}`} />}
      <span>{label}</span>
    </h5>
  </legend>
);

Legend.defaultProps = {
  icon: null,
};

Legend.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default Legend;

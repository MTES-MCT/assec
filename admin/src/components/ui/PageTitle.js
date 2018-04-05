import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ label, icon }) => (
  <h1 className="mb20">
    {icon && <i className={`icon icon-${icon}`} />}
    <span>{label}</span>
  </h1>
);

PageTitle.defaultProps = {
  icon: null,
};

PageTitle.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default PageTitle;

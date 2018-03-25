import React from 'react';
import PropTypes from 'prop-types';

const FormResults = ({ alertlevel }) => (
  <div id="form-results">
    <h3>{alertlevel.name}</h3>
    <p>{alertlevel.description}</p>
  </div>
);

FormResults.propTypes = {
  alertlevel: PropTypes.object.isRequired,
};

export default FormResults;

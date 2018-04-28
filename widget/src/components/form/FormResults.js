import React from 'react';
import PropTypes from 'prop-types';

const FormResults = ({ rules }) => (
  <div id="form-results" className="flex-rows">
    {rules.map(obj => (
      <div key={`rule::${obj.id}`}>
        <h3>{obj.title}</h3>
        <p>{obj.description}</p>
      </div>
    ))}
  </div>
);

FormResults.propTypes = {
  rules: PropTypes.array.isRequired,
};

export default FormResults;

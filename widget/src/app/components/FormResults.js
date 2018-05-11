import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const FormResults = ({ rules }) => (
  <div id="form-results" className="flex-rows">
    {rules.map(obj => (
      <div key={`rule::${obj.id}`}>
        <h3>{obj.title}</h3>
        <ReactMarkdown className="markdown-body" source={obj.description} />
      </div>
    ))}
  </div>
);

FormResults.propTypes = {
  rules: PropTypes.array.isRequired,
};

export default FormResults;

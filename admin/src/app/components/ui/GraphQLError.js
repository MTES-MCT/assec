import React from 'react';
import PropTypes from 'prop-types';

// application
import './grapqhlerror.css';

const GraphQLError = ({ error }) => (
  <div id="grapqhlerror" className="p20">
    <pre>
      <code>{JSON.stringify(error, null, 2)}</code>
    </pre>
  </div>
);

GraphQLError.propTypes = {
  error: PropTypes.object.isRequired,
};

export default GraphQLError;

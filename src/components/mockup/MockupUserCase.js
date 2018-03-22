import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MockupUserCase = ({ values }) => (
  <div id="mockup-usercase">
    <ul>
      {Object.keys(values).map(key => (
        <li key={`question_${key}`}>
          {`${key}: ${JSON.stringify(values[key])}`}
        </li>
      ))}
    </ul>
  </div>
);

MockupUserCase.propTypes = {
  values: PropTypes.object.isRequired,
};

const mapStateToProps = ({ form }) => ({
  values: form.decisionnal.values || {},
});

export default connect(mapStateToProps)(MockupUserCase);

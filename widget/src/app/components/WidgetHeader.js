import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import PreviousButton from './buttons/PreviousButton';
import { LOAD_DEPARTMENT_WIDGET } from './../apolloql/queries';

const WidgetHeader = ({ step, code }) => {
  const canbackward = step > 0;
  return (
    <Query query={LOAD_DEPARTMENT_WIDGET} skip={!code} variables={{ code }}>
      {({ loading, error, data: { widget } }) => {
        if (error || !widget || loading) return <p>...</p>;
        const questions = (widget && widget.questions) || null;
        const question = (questions && questions[step]) || null;
        if (!question) return null;
        return (
          <div id="assec-widget-header" className="mb20">
            {canbackward && <PreviousButton />}
            <h4 className="title">
              <span>{question.title}</span>
            </h4>
            <p className="description mt7">
              <span>{question.description}</span>
            </p>
          </div>
        );
      }}
    </Query>
  );
};

WidgetHeader.propTypes = {
  code: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
};

export default connect(({ step }) => ({ step }))(WidgetHeader);

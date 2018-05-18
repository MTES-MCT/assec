import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import { stepBackward } from './../actions';
import { LOAD_DEPARTMENT_WIDGET } from './../apolloql/queries';

const WidgetHeader = ({ step, code, dispatch }) => {
  const canbackward = step > 0;
  return (
    <Query query={LOAD_DEPARTMENT_WIDGET} skip={!code} variables={{ code }}>
      {({ loading, error, data: { widget } }) => {
        if (error || !widget || loading) return <p>...</p>;
        const questions = (widget && widget.questions) || null;
        const question = (questions && questions[step]) || null;
        if (!question) return <p>...</p>;
        return (
          <div id="assec-widget-header" className="">
            {canbackward && (
              <button className="small mb12"
                type="button"
                onClick={() => dispatch(stepBackward())}>
                <i className="icon icon-left-open-big mr3" />
                <span>Question précédente</span>
              </button>
            )}
            <h4 className="title">
              <span>{question.title}</span>
            </h4>
            <p className="mt0">
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
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ step }) => ({ step }))(WidgetHeader);

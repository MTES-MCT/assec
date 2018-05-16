import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { noop } from './../core/noop';
import { stepForward } from './../actions';

const WidgetSurveyNavigation = ({
  islast,
  dispatch,
  cansubmit,
  canforward,
}) => (
  <div id="assec-widget-survey-navigation">
    <button type={islast ? 'submit' : 'button'}
      disabled={!canforward || (canforward && !cansubmit)}
      onClick={islast ? noop : () => dispatch(stepForward())}>
      <span>{!islast ? 'Question suivante' : 'Voir les résultats'}</span>
    </button>
  </div>
);

WidgetSurveyNavigation.propTypes = {
  islast: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  cansubmit: PropTypes.bool.isRequired,
  canforward: PropTypes.bool.isRequired,
};

export default connect()(WidgetSurveyNavigation);

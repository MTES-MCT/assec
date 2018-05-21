import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { stepForward } from './../actions';

const FormNavigation = ({
  islast, dispatch, cansubmit, canforward,
}) => (
  <nav />
  // <div id="assec-widget-survey-navigation" className="mt20">
  //   <button className="next action"
  //     type={islast ? 'submit' : 'button'}
  //     disabled={!canforward || (canforward && !cansubmit)}
  //     onClick={() => dispatch(stepForward())}>
  //     <span>{!islast ? 'Question suivante' : 'Voir les résultats'}</span>
  //     <i className="icon icon-right-open-big ml7" />
  //   </button>
  // </div>
);

FormNavigation.propTypes = {
  islast: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  cansubmit: PropTypes.bool.isRequired,
  canforward: PropTypes.bool.isRequired,
};

export default connect()(FormNavigation);

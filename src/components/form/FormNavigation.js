import React from 'react';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';
import { connect } from 'react-redux';

// application
import './form-navigation.css';
import { FORM_NAME } from './../../constants';
import { formReset } from './../../actions/form';
import { stepForward, stepBackward } from './../../actions/navigation';

const FormNavigation = ({
  dispatch,
  canreset,
  canforward,
  canbackward,
  showresults,
}) => (
  <div id="form-navigation" className="flex-columns flex-end">
    {(!canreset && [
      <button key="backward"
        onClick={() => dispatch(stepBackward())}
        disabled={!canbackward}>
        <i className="icon icon-left-open-big" />
        <span>Précédent</span>
      </button>,
      (!showresults && (
        <button key="forward"
          onClick={() => dispatch(stepForward())}
          disabled={!canforward}>
          <span>Suivant</span>
          <i className="icon icon-right-open-big" />
        </button>
      )) ||
        null,
      (showresults && (
        <button key="results"
          onClick={() => dispatch(submit(FORM_NAME))}
          className="last-step">
          <i className="icon icon-adjust" />
          <span>Résultats</span>
          <i className="icon icon-right-open-big" />
        </button>
      )) ||
        null,
    ]) ||
      null}
    {canreset && (
      <button onClick={() => dispatch(formReset())}>
        <span>reset</span>
      </button>
    )}
  </div>
);
FormNavigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  canreset: PropTypes.bool.isRequired,
  canforward: PropTypes.bool.isRequired,
  canbackward: PropTypes.bool.isRequired,
  showresults: PropTypes.bool.isRequired,
};

export default connect()(FormNavigation);

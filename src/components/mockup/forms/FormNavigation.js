import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './form-navigation.css';
import Constants from './../../../constants';
import {
  // stepReset,
  stepForward,
  stepBackward,
} from './../../../actions/navigation';

const FormNavigation = ({
  dispatch, disabled, activestep, completedcount,
}) => (
  <div id="form-navigation" className="flex-columns flex-end">
    <button onClick={() => dispatch(stepBackward())}
      disabled={disabled || activestep === 0}>
      <i className="icon icon-left-open-big" />
      <span>Précédent</span>
    </button>
    <button onClick={() => dispatch(stepForward())}
      disabled={disabled || activestep >= completedcount}>
      <span>Suivant</span>
      <i className="icon icon-right-open-big" />
    </button>
    {/* {current >= maxsteps && (
      <button onClick={() => dispatch(stepReset())} disabled={disabled}>
        <span>reset</span>
      </button>
    )} */}
  </div>
);
FormNavigation.propTypes = {
  disabled: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  activestep: PropTypes.number.isRequired,
  completedcount: PropTypes.number.isRequired,
};

const mapStateToProps = ({ form, activestep }) => {
  const { values } = form[Constants.FORM_NAME];
  const completedcount = (values && Object.keys(values).length) || 0;
  return {
    activestep,
    completedcount,
    disabled: activestep === completedcount && !completedcount,
  };
};

export default connect(mapStateToProps)(FormNavigation);

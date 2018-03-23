import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './form-navigation.css';
// import Constants from './../../constants';

const FormNavigation = ({
  // dispatch,
  // laststep,
  disabled,
  // resetstep,
  // activestep,
  // userchoicecount,
}) => (
  <div id="form-navigation" className="flex-columns flex-end">
    <button onClick={() => {}} disabled={disabled}>
      <i className="icon icon-left-open-big" />
      <span>Précédent</span>
    </button>
    <button onClick={() => {}} disabled={disabled}>
      <span>Suivant</span>
      <i className="icon icon-right-open-big" />
    </button>
    {/* {laststep && (
      <button onClick={() => {}}
        className="last-step"
        disabled={disabled || activestep >= completedcount}>
        <i className="icon icon-adjust" />
        <span>Résultats</span>
        <i className="icon icon-right-open-big" />
      </button>
    )}
    {resetstep && (
      <button onClick={() => dispatch(stepReset())} disabled={disabled}>
        <span>reset</span>
      </button>
    )} */}
  </div>
);
FormNavigation.propTypes = {
  disabled: PropTypes.bool.isRequired,
  // dispatch: PropTypes.func.isRequired,
  // laststep: PropTypes.bool.isRequired,
  // resetstep: PropTypes.bool.isRequired,
  // activestep: PropTypes.number.isRequired,
  // userchoicecount: PropTypes.number.isRequired,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(FormNavigation);

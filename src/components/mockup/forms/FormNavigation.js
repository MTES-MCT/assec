import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './form-navigation.css';
import Constants from './../../../constants';

const FormNavigation = ({
  disabled,
  // current,
  // nextstep,
  // maxsteps,
  // resetClick,
  // forwardClick,
  // backwardClick,
}) => (
  // const canbackward = current - 1 < 0;
  // const canforward = dirty && nextstep > current;
  <div id="form-navigation" className="flex-columns flex-end">
    {/* {current < maxsteps && ( */}
    <button onClick={() => {}} disabled={disabled}>
      <i className="icon icon-left-open-big" />
      <span>back</span>
    </button>
    {/* )}
    {current < maxsteps && ( */}
    <button onClick={() => {}} disabled={disabled}>
      <span>next</span>
      <i className="icon icon-right-open-big" />
    </button>
    {/* )}
    {current >= maxsteps && ( */}
    <button onClick={() => {}} disabled={disabled}>
      <span>reset</span>
    </button>
    {/* )} */}
  </div>
);
FormNavigation.propTypes = {
  disabled: PropTypes.bool.isRequired,
  activestep: PropTypes.number.isRequired,
  completedcount: PropTypes.number.isRequired,
  // current: PropTypes.number.isRequired,
  // nextstep: PropTypes.number.isRequired,
  // maxsteps: PropTypes.number.isRequired,
  // resetClick: PropTypes.func.isRequired,
  // forwardClick: PropTypes.func.isRequired,
  // backwardClick: PropTypes.func.isRequired,
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { closePopin } from './../../actions';
import SubmitButton from './../buttons/SubmitButton';
import ConfirmButton from './../buttons/ConfirmButton';

const FormPopin = ({ islast, dispatch }) => (
  <div className="popin dark">
    <button className="absolute" onClick={() => dispatch(closePopin())} />
    <div className="container flex-rows items-center flex-end">
      <nav className="navigation">
        <button className="mx12 action"
          type="button"
          onClick={() => dispatch(closePopin())}>
          <i className="icon icon-left-open-big mr7" />
          <span>Modifier</span>
        </button>
        {(islast && <SubmitButton />) || <ConfirmButton />}
      </nav>
    </div>
  </div>
);

FormPopin.propTypes = {
  islast: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(FormPopin);

import React from 'react';
import PropTypes from 'prop-types';

// application
import CancelButton from './buttons/CancelButton';
import SubmitButton from './buttons/SubmitButton';

const FormButtons = ({
  reset, submit, labels, display, disabled,
}) => (
  <div className={`flex-${display} flex-end pt20`}>
    <CancelButton disabled={(disabled && disabled.cancel) || disabled === true || false}
      onClick={reset || null}
      label={(labels && labels.cancel) || null} />
    <SubmitButton disabled={(disabled && disabled.submit) || disabled === true || false}
      onClick={submit || null}
      label={(labels && labels.submit) || null} />
  </div>
);

FormButtons.defaultProps = {
  reset: null,
  submit: null,
  labels: null,
  disabled: null,
  display: 'columns',
};

FormButtons.propTypes = {
  reset: PropTypes.func,
  submit: PropTypes.func,
  labels: PropTypes.object,
  display: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default FormButtons;

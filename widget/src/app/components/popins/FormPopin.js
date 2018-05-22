import React from 'react';
import PropTypes from 'prop-types';

// application
import SubmitButton from './../buttons/SubmitButton';
import ConfirmButton from './../buttons/ConfirmButton';

const FormPopin = ({ islast, cancel }) => (
  <div className="popin dark">
    <button type="button" className="absolute" onClick={cancel} />
    <div className="container flex-rows items-center flex-end">
      <nav className="navigation">
        <button className="mr12 action" type="button" onClick={cancel}>
          <i className="icon icon-left-open-big" />
          <span>Modifier</span>
        </button>
        {!islast && <ConfirmButton />}
        {islast && <SubmitButton />}
      </nav>
    </div>
  </div>
);

FormPopin.propTypes = {
  islast: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default FormPopin;

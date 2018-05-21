import React from 'react';
import PropTypes from 'prop-types';

const FormPopin = ({ cancelHandler, confirmHandler }) => (
  <div className="popin dark">
    <div className="container flex-rows items-center flex-end">
      <nav className="navigation">
        <button className="mx12 action" type="button" onClick={cancelHandler}>
          <i className="icon icon-left-open-big mr7" />
          <span>Modifier</span>
        </button>
        <button className="mx12 next action"
          type="button"
          onClick={confirmHandler}>
          <span>Question suivante</span>
          <i className="icon icon-right-open-big mr7" />
        </button>
      </nav>
    </div>
  </div>
);
FormPopin.propTypes = {
  cancelHandler: PropTypes.func.isRequired,
  confirmHandler: PropTypes.func.isRequired,
};

export default FormPopin;

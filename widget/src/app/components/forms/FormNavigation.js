import React from 'react';
import PropTypes from 'prop-types';

const FormNavigation = ({ confirmHandler }) => (
  <nav className="navigation">
    <button className="mx12 next action" type="button" onClick={confirmHandler}>
      <span>Question suivante</span>
      <i className="icon icon-right-open-big mr7" />
    </button>
  </nav>
);

FormNavigation.propTypes = {
  confirmHandler: PropTypes.func.isRequired,
};

export default FormNavigation;

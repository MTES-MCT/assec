import React from 'react';
import PropTypes from 'prop-types';

const CloseButton = ({ onClose }) => (
  <div className="popin-controls">
    <button className="br50" onClick={onClose}>
      <i className="icon icon-cancel" />
    </button>
  </div>
);

CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default CloseButton;

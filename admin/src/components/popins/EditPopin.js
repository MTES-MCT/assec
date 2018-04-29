import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

// application
import CloseButton from './CloseButton';

const EditPopin = ({ onClose, updateAction }) => (
  <Mutation update={updateAction} onCompleted={onClose}>
    {() => (
      <div id="edit-popin" className="popin-container p40">
        <CloseButton onClose={onClose} />
      </div>
    )}
  </Mutation>
);

EditPopin.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  updateAction: PropTypes.func.isRequired,
};

export default EditPopin;

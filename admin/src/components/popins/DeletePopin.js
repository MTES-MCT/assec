import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

// application
import CloseButton from './CloseButton';

const DeletePopin = ({
  id, name, onClose, deleteAction, updateAction,
}) => (
  <Mutation mutation={deleteAction} update={updateAction} onCompleted={onClose}>
    {deleteDepartment => (
      <div id="delete-popin" className="popin-container p40">
        <CloseButton onClose={onClose} />
        <p className="align-center">
          <span>Êtes vous sûr de vouloir supprimer</span>
          <b>{` ${name} `}</b>
          <span>?</span>
        </p>
        <div className="buttons flex-columns flex-around">
          <button className="big" onClick={onClose}>
            <span>Non</span>
            <i className="icon icon-cancel" />
          </button>
          <button className="big primary"
            onClick={() => {
              deleteDepartment({ variables: { id } });
            }}>
            <span>Oui</span>
            <i className="icon icon-trash" />
          </button>
        </div>
      </div>
    )}
  </Mutation>
);

DeletePopin.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  updateAction: PropTypes.func.isRequired,
  deleteAction: PropTypes.object.isRequired,
};

export default DeletePopin;

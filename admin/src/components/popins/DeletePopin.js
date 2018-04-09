import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

// application
import CloseButton from './CloseButton';
import { DELETE_DEPARTEMENT, UPDATE_DEPARTEMENTS } from './../../apolloql';

const DeletePopin = ({ id, name, onClose }) => (
  <Mutation mutation={DELETE_DEPARTEMENT}
    update={UPDATE_DEPARTEMENTS}
    onCompleted={onClose}>
    {deleteDepartment => (
      <div id="delete-popin" className="popin-inner">
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
};

export default DeletePopin;

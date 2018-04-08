import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

// application
import { GET_DEPARTEMENT } from './../../apolloql';
import CloseButton from './../../components/popins/CloseButton';

const DepartmentPopin = ({ id, onClose }) => (
  <Query query={GET_DEPARTEMENT} variables={{ id }}>
    {({ loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      return (
        <div id="delete-popin" className="popin-inner">
          <CloseButton onClose={onClose} />
        </div>
      );
    }}
  </Query>
);

DepartmentPopin.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DepartmentPopin;

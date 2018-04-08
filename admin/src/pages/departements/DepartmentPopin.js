import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

// application
import { GET_DEPARTEMENT } from './../../apolloql';

const DepartmentPopin = ({ id }) => (
  <Query query={GET_DEPARTEMENT} variables={{ id }}>
    {({ loading, error, data: { departement } }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      console.log('departement', departement);
      return <div />;
    }}
  </Query>
);

DepartmentPopin.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DepartmentPopin;

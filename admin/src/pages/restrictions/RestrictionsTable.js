import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

// application
import { ALL_DEPARTEMENT_RESTRICTIONS } from './../../graphql';

const renderRestrictionsTableHeader = () => (
  <thead>
    <tr>
      <th>Lastname</th>
      <th>Firstname</th>
      <th>eMail</th>
    </tr>
  </thead>
);

const renderRestrictionsTableRow = person => (
  <tr key={person.id}>
    <td>{person.lastname}</td>
    <td>{person.firstname}</td>
    <td>{person.email}</td>
  </tr>
);

const RestrictionsTable = ({ selected }) => (
  <Query query={ALL_DEPARTEMENT_RESTRICTIONS}
    variables={{ departement: selected }}>
    {({ loading, error, data: { allDepartementRestrictions } }) => {
      if (loading) return <p>Loading... </p>;
      if (error) return <p>Error </p>;
      return (
        <div>
          <table>
            {renderRestrictionsTableHeader()}
            <tbody>
              {allDepartementRestrictions &&
                allDepartementRestrictions.map(renderRestrictionsTableRow)}
            </tbody>
          </table>
        </div>
      );
    }}
  </Query>
);

RestrictionsTable.defaultProps = {
  selected: null,
};

RestrictionsTable.propTypes = {
  selected: PropTypes.string,
};

export default RestrictionsTable;

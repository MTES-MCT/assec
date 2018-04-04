import React from 'react';
import { Query } from 'react-apollo';

import { ALL_PERSONS } from './../../apollo';

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

const RestrictionsTable = () => (
  <Query query={ALL_PERSONS} displayName="RestrictionsTableQuery">
    {({ loading, error, data: { allPersons } }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      return (
        <div>
          <table>
            {renderRestrictionsTableHeader()}
            <tbody>{allPersons.map(renderRestrictionsTableRow)}</tbody>
          </table>
        </div>
      );
    }}
  </Query>
);

export default RestrictionsTable;

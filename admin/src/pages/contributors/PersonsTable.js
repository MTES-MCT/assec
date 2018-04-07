import React from 'react';
import { Query } from 'react-apollo';

import { ALL_PERSONS } from './../../apolloql';

const renderPersonTableHeader = () => (
  <thead>
    <tr>
      <th>Lastname</th>
      <th>Firstname</th>
      <th>eMail</th>
    </tr>
  </thead>
);

const renderPersonTableRow = person => (
  <tr key={person.id}>
    <td>{person.lastname}</td>
    <td>{person.firstname}</td>
    <td>{person.email}</td>
  </tr>
);

const PersonTable = () => (
  <Query query={ALL_PERSONS} displayName="PersonTableQuery">
    {({ loading, error, data: { allPersons } }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      return (
        <div>
          <table>
            {renderPersonTableHeader()}
            <tbody>{allPersons.map(renderPersonTableRow)}</tbody>
          </table>
        </div>
      );
    }}
  </Query>
);

export default PersonTable;

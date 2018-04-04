import React from 'react';
import { Query } from 'react-apollo';

import { getAllPersons } from './graph';

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
  <Query query={getAllPersons} displayName="PersonTableQuery">
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      return (
        <div className="page-contributors-persons">
          <table>
            {renderPersonTableHeader()}
            <tbody>{data.persons.map(renderPersonTableRow)}</tbody>
          </table>
        </div>
      );
    }}
  </Query>
);

export default PersonTable;

import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const renderPersonRow = person => (
  <tr key={person.id}>
    <td>{person.lastname}</td>
    <td>{person.firstname}</td>
    <td>{person.email}</td>
  </tr>
);

const ALL_PERSONS = gql(`
    {
      allPersons {
        id
        email
        lastname
        firstname
      }
    }
  `);

const PersonTable = () => (
  <Query query={ALL_PERSONS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;

      console.log('data', data.allPersons);

      return (
        <div className="page-contributors-persons">
          <table>
            <thead>
              <tr>
                <th>N° Département</th>
                <th>Nom Département</th>
                <th>Nom du contact</th>
                <th>eMail du contact</th>
                <th>Telephone du contact</th>
                <th>Adresse du contact</th>
              </tr>
            </thead>
            <tbody>{data.allPersons.map(renderPersonRow)}</tbody>
          </table>
        </div>
      );
    }}
  </Query>
);

export default PersonTable;

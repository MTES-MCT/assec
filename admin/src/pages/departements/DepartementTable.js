import React from 'react';
import { Query } from 'react-apollo';

import { ALL_DEPARTEMENTS } from './../../graphql';

const renderDepartementTableHeader = () => (
  <thead>
    <tr>
      <th>Code</th>
      <th>Nom</th>
      <th className="btn-cell" />
    </tr>
  </thead>
);

const renderDepartementTableRow = person => (
  <tr key={person.id}>
    <td>{person.code}</td>
    <td>{person.nom}</td>
    <td className="btn-cell">
      <button type="button" onClick={() => {}}>
        <i className="icon icon-pencil" />
      </button>
    </td>
  </tr>
);

const DepartementTable = () => (
  <Query query={ALL_DEPARTEMENTS} displayName="DepartementTableQuery">
    {({ loading, error, data: { allDepartements: dpts } }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      return (
        <div>
          <table>
            {renderDepartementTableHeader()}
            <tbody>{dpts.map(renderDepartementTableRow)}</tbody>
          </table>
        </div>
      );
    }}
  </Query>
);

export default DepartementTable;

import React from 'react';
import { Query } from 'react-apollo';

import { ALL_DEPARTEMENTS } from './../../apolloql';

const renderDepartementTableHeader = () => (
  <thead>
    <tr>
      <th>Code</th>
      <th>Nom</th>
      <th className="btn-cell" />
      <th className="btn-cell" />
    </tr>
  </thead>
);

const renderDepartementTableRow = departement => (
  <tr key={departement.id}>
    <td>{departement.code}</td>
    <td>{departement.name}</td>
    <td className="btn-cell">
      <button type="button" onClick={() => {}}>
        <i className="icon icon-pencil" />
      </button>
    </td>
    <td className="btn-cell">
      <button type="button" className="button-remove" onClick={() => {}}>
        <i className="icon icon-cancel-circled" />
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

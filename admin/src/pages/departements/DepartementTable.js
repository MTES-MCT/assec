import React from 'react';
import { Query } from 'react-apollo';

// application
import { ALL_DEPARTEMENTS } from './../../apolloql';

const renderDepartementTableHeader = () => (
  <thead>
    <tr>
      <th className="small">Code</th>
      <th>Nom</th>
      <th className="small" />
    </tr>
  </thead>
);

const renderDepartementTableRow = departement => (
  <tr key={departement.id}>
    <td className="small">{departement.code}</td>
    <td>{departement.name}</td>
    <td className="small">
      <button type="button" onClick={() => {}}>
        <i className="icon icon-pencil" />
      </button>
    </td>
  </tr>
);

const DepartementTable = () => (
  <Query query={ALL_DEPARTEMENTS} displayName="DepartementTableQuery">
    {({ loading, error, data: { departements: dpts } }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      return (
        <div>
          <table>
            {renderDepartementTableHeader()}
            <tbody>{dpts && dpts.map(renderDepartementTableRow)}</tbody>
          </table>
        </div>
      );
    }}
  </Query>
);

export default DepartementTable;

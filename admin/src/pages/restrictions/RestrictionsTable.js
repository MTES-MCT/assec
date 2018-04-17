import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

// application
import { ALL_RESTRICTIONS } from './../../apolloql';

const renderRestrictionsTableHeader = () => (
  <thead>
    <tr>
      <th>Titre</th>
      <th>Description</th>
      <th className="small" />
      <th className="small" />
    </tr>
  </thead>
);

const renderRestrictionsTableRow = obj => (
  <tr key={obj.id}>
    <td>{obj.title}</td>
    <td>{obj.description}</td>
    <td className="small">
      <button type="button" onClick={() => {}}>
        <i className="icon icon-pencil" />
      </button>
    </td>
    <td className="small">
      <button type="button" className="button-remove" onClick={() => {}}>
        <i className="icon icon-trash" />
      </button>
    </td>
  </tr>
);

const RestrictionsTable = ({ selected }) => (
  <Query query={ALL_RESTRICTIONS} variables={{ dpt: selected }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading... </p>;
      if (error) return <p>Error </p>;
      const { restrictions } = data;
      return (
        <div>
          <table>
            {renderRestrictionsTableHeader()}
            <tbody>
              {restrictions && restrictions.map(renderRestrictionsTableRow)}
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

import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

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

class DepartementTable extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  onClick (id) {
    const popin = {
      id,
      type: 'DepartmentPopin',
    };
    this.props.dispatch({ type: 'onOpenPopin', popin });
  }

  renderTableRow (departement) {
    const { id, code, name } = departement;
    return (
      <tr key={id}>
        <td className="small">{code}</td>
        <td>{name}</td>
        <td className="small">
          <button type="button" onClick={() => this.onClick(id)}>
            <i className="icon icon-pencil" />
          </button>
        </td>
      </tr>
    );
  }

  render () {
    return (
      <Query query={ALL_DEPARTEMENTS}>
        {({ loading, error, data: { departements: dpts } }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error </p>;
          return (
            <div>
              <table>
                {renderDepartementTableHeader()}
                <tbody>{dpts && dpts.map(this.renderTableRow)}</tbody>
              </table>
            </div>
          );
        }}
      </Query>
    );
  }
}

DepartementTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DepartementTable);

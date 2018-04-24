import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import {
  ALL_DEPARTMENTS,
  DELETE_DEPARTMENT,
  UPDATE_DEPARTMENTS,
} from './../../apolloql';
import NoContent from './../../components/ui/NoContent';

const renderNoDepartement = () => (
  <div id="page-main-column">
    <NoContent description="Ajouter un département en utilisant le formulaire ci-contre" />
  </div>
);

const renderDepartementTableHeader = () => (
  <thead>
    <tr>
      <th className="small">Code</th>
      <th>Nom</th>
      {/* <th className="small" /> */}
      <th className="small" />
    </tr>
  </thead>
);

class DepartementTable extends React.PureComponent {
  constructor (props) {
    super(props);
    // this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  // onEditClick ({ id, label }) {
  //   const popin = { id, label, type: 'DepartementPopin' };
  //   this.props.dispatch({ type: 'onOpenPopin', popin });
  // }

  onDeleteClick ({ id, label }) {
    const popin = {
      id,
      name: label,
      type: 'DeletePopin',
      deleteAction: DELETE_DEPARTMENT,
      updateAction: UPDATE_DEPARTMENTS,
    };
    this.props.dispatch({
      popin,
      type: 'onOpenPopin',
    });
  }

  renderTableRow (department) {
    const { id, code, label } = department;
    return (
      <tr key={id}>
        <td className="small">{code}</td>
        <td>{label}</td>
        {/* <td className="small">
          <button type="button" onClick={() => this.onEditClick(department)}>
            <i className="icon icon-pencil" />
          </button>
        </td> */}
        <td className="small">
          <button type="button"
            className="danger"
            onClick={() => this.onDeleteClick(department)}>
            <i className="icon icon-trash" />
          </button>
        </td>
      </tr>
    );
  }

  render () {
    return (
      <Query query={ALL_DEPARTMENTS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error </p>;
          const { departments } = data;
          if (!departments || !departments.length) {
            return renderNoDepartement();
          }
          return (
            <div>
              <table>
                {renderDepartementTableHeader()}
                <tbody>{departments.map(this.renderTableRow)}</tbody>
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

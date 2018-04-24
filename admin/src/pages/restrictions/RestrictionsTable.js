import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import {
  DELETE_RESTRICTION,
  GET_DEPARTMENT_RESTRICTIONS,
  UPDATE_DEPARTMENT_RESTRICTIONS,
} from './../../apolloql';
import NoContent from './../../components/ui/NoContent';

const renderRestrictionsTableHeader = () => (
  <thead>
    <tr>
      <th>Titre</th>
      {/* <th className="small" /> */}
      {/* <th className="small" /> */}
      <th className="small" />
    </tr>
  </thead>
);

const renderNoRestrictions = () => (
  <div id="page-main-column">
    <NoContent description="Pour ajouter une nouvelle restriction utilisez le formulaire ci-contre" />
  </div>
);

class RestrictionsTable extends React.PureComponent {
  constructor (props) {
    super(props);
    // this.onEditClick = this.onEditClick.bind(this);
    // this.onCloneClick = this.onCloneClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
  }

  // onCloneClick (obj) {
  //   const { label, id } = obj;
  //   const popin = { id, name: label, type: 'EditRestrictionsPopin' };
  //   this.props.dispatch({ type: 'onOpenPopin', popin });
  // }
  //
  // onEditClick (obj) {
  //   const { label, id } = obj;
  //   const popin = { id, name: label, type: 'EditRestrictionsPopin' };
  //   this.props.dispatch({ type: 'onOpenPopin', popin });
  // }

  onDeleteClick (obj) {
    const { label, id } = obj;
    const popin = {
      id,
      name: label,
      type: 'DeletePopin',
      deleteAction: DELETE_RESTRICTION,
      updateAction: UPDATE_DEPARTMENT_RESTRICTIONS,
    };
    this.props.dispatch({
      popin,
      type: 'onOpenPopin',
    });
  }

  renderTableRow (obj) {
    const { id, label } = obj;
    return (
      <tr key={id}>
        <td>{label}</td>
        {/* <td className="small">
          <button type="button" onClick={() => this.onCloneClick(obj)}>
            <i className="icon icon-clone" />
          </button>
        </td>
        <td className="small">
          <button type="button" onClick={() => this.onEditClick(obj)}>
            <i className="icon icon-pencil" />
          </button>
        </td> */}
        <td className="small">
          <button type="button"
            className="danger"
            onClick={() => this.onDeleteClick(obj)}>
            <i className="icon icon-trash" />
          </button>
        </td>
      </tr>
    );
  }

  render () {
    const { selected } = this.props;
    return (
      <Query query={GET_DEPARTMENT_RESTRICTIONS} variables={{ id: selected }}>
        {({ loading, error, data }) => {
          if (error) return <p>Error </p>;
          // FIXME -> ajouter le loading dans le vue
          // mais ne pas remplacer completement la vue
          // par exemple afficher le "pas de données" + "Loading"
          if (loading) return <p>Loading... </p>;
          const { restrictions } = data;
          if (!restrictions || !restrictions.length) {
            return renderNoRestrictions();
          }
          return (
            <div>
              <table>
                {renderRestrictionsTableHeader()}
                <tbody>
                  {restrictions && restrictions.map(this.renderTableRow)}
                </tbody>
              </table>
            </div>
          );
        }}
      </Query>
    );
  }
}

RestrictionsTable.defaultProps = {
  selected: null,
};

RestrictionsTable.propTypes = {
  selected: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(RestrictionsTable);

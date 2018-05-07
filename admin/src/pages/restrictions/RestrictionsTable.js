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
import { openDeletePopin } from './../../actions';
import NoContent from './../../components/ui/NoContent';
import TinyLoader from './../../components/ui/TinyLoader';
import DataTable from './../../components/datatable/DataTable';

class RestrictionsTable extends React.PureComponent {
  constructor (props) {
    super(props);
    // this.onEditClick = this.onEditClick.bind(this);
    // this.onCloneClick = this.onCloneClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
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
    const opts = {
      id,
      name: label,
      deleteAction: DELETE_RESTRICTION,
      updateAction: UPDATE_DEPARTMENT_RESTRICTIONS,
    };
    this.props.dispatch(openDeletePopin(opts));
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
      <Query query={GET_DEPARTMENT_RESTRICTIONS}
        variables={{ department: selected }}>
        {({ loading, error, data }) => {
          if (error) return <p>Error </p>;
          const provider = data.departmentRestrictions || null;
          const hasrestrictions = provider && provider.length > 0;
          return (
            <React.Fragment>
              {loading && <TinyLoader />}
              {!hasrestrictions && (
                <div id="page-main-column">
                  <NoContent description="Pour ajouter une nouvelle restriction utilisez le formulaire ci-contre" />
                </div>
              )}
              {hasrestrictions && (
                <DataTable provider={provider}
                  actions={{
                    edit: () => {},
                    delete: this.onDeleteClick,
                  }}
                  cols={[
                    {
                      key: 'label',
                      type: 'label',
                      label: 'Nom du département',
                    },
                  ]} />
              )}
            </React.Fragment>
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

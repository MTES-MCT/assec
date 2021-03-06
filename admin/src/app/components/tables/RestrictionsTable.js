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
import NoContent from './../ui/NoContent';
import TinyLoader from './../ui/TinyLoader';
import DataTable from './../ui/datatable/DataTable';
import RestrictionPopin from './../popins/RestrictionPopin';
import { openDeletePopin, openPopin } from './../../actions';

class RestrictionsTable extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onEditClick (obj) {
    const { label, id } = obj;
    const popin = { id, name: label, Type: RestrictionPopin };
    this.props.dispatch(openPopin(popin));
  }

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

  render () {
    const { selected } = this.props;
    return (
      <Query query={GET_DEPARTMENT_RESTRICTIONS}
        variables={{ department: selected }}>
        {({ loading, error, data }) => {
          if (error) return <p>Error </p>;
          const provider = data.departmentRestrictions || null;
          const hasentities = provider && provider.length > 0;
          return (
            <React.Fragment>
              {loading && <TinyLoader />}
              {!hasentities && (
                <div id="page-main-column">
                  <NoContent description="Pour ajouter une nouvelle restriction utilisez le formulaire ci-contre" />
                </div>
              )}
              {hasentities && (
                <DataTable provider={provider}
                  actions={{
                    edit: this.onEditClick,
                    delete: this.onDeleteClick,
                  }}
                  cols={[
                    {
                      key: 'label',
                      label: 'Restrictions',
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

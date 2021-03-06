import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import {
  DELETE_DEPARTMENT,
  GET_ALL_DEPARTMENTS,
  UPDATE_ALL_DEPARTMENTS,
} from './../../apolloql';
import NoContent from './../ui/NoContent';
import TinyLoader from './../ui/TinyLoader';
import DataTable from './../ui/datatable/DataTable';
import DepartementPopin from './../popins/DepartementPopin';
import { openPopin, openDeletePopin } from './../../actions';

class DepartementTable extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onEditClick ({ id, label }) {
    const popin = { id, label, Type: DepartementPopin };
    this.props.dispatch(openPopin(popin));
  }

  onDeleteClick ({ id, label }) {
    const opts = {
      id,
      name: label,
      deleteAction: DELETE_DEPARTMENT,
      updateAction: UPDATE_ALL_DEPARTMENTS,
    };
    this.props.dispatch(openDeletePopin(opts));
  }

  render () {
    return (
      <Query query={GET_ALL_DEPARTMENTS}>
        {({ loading, error, data }) => {
          if (error) return <p>Error </p>;
          const provider = data.departments || null;
          const hasentities = provider && provider.length > 0;
          return (
            <React.Fragment>
              {loading && <TinyLoader />}
              {!hasentities && (
                <div id="page-main-column">
                  <NoContent description="Ajouter un département en utilisant le formulaire ci-contre" />
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
                      key: 'code',
                      cssclass: 'small',
                      label: '',
                    },
                    {
                      key: 'label',
                      label: 'Départements',
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

DepartementTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DepartementTable);

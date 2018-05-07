import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import {
  DELETE_SUBSCRIBER,
  GET_DEPARTMENT_SUBSCRIBERS,
  UPDATE_DEPARTMENT_SUBSCRIBERS,
} from './../../apolloql';
import NoContent from './../ui/NoContent';
import TinyLoader from './../ui/TinyLoader';
import DataTable from './../datatable/DataTable';
import { openDeletePopin } from './../../actions';

class SubscribersTable extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick (obj) {
    const { email, id } = obj;
    const opts = {
      id,
      name: email,
      deleteAction: DELETE_SUBSCRIBER,
      updateAction: UPDATE_DEPARTMENT_SUBSCRIBERS,
    };
    this.props.dispatch(openDeletePopin(opts));
  }

  render () {
    const { selected } = this.props;
    return (
      <Query query={GET_DEPARTMENT_SUBSCRIBERS}
        variables={{ department: selected }}>
        {({ loading, error, data }) => {
          if (error) return <p>Error </p>;
          const provider = data.departmentSubscribers || null;
          const hasSubscribers = provider && provider.length > 0;
          return (
            <React.Fragment>
              {loading && <TinyLoader />}
              {!hasSubscribers && (
                <div id="page-main-column">
                  <NoContent description="Aucun utilisateur est inscrit à la newsletter alerte" />
                </div>
              )}
              {hasSubscribers && (
                <DataTable provider={provider}
                  actions={{
                    delete: this.onDeleteClick,
                  }}
                  cols={[
                    {
                      key: 'email',
                      label: 'eMail utilisateur',
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

SubscribersTable.defaultProps = {
  selected: null,
};

SubscribersTable.propTypes = {
  selected: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SubscribersTable);

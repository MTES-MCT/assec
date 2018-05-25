import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import {
  DELETE_SUBSCRIBER,
  GET_SUBSCRIBERS,
  UPDATE_SUBSCRIBERS,
} from './../../apolloql';
import NoContent from './../ui/NoContent';
import TinyLoader from './../ui/TinyLoader';
import { openDeletePopin } from './../../actions';
import DataTable from './../ui/datatable/DataTable';

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
      updateAction: UPDATE_SUBSCRIBERS,
    };
    this.props.dispatch(openDeletePopin(opts));
  }

  render () {
    const { selected } = this.props;
    return (
      <Query query={GET_SUBSCRIBERS}
        variables={{ department: selected }}>
        {({ loading, error, data }) => {
          if (error) return <p>Error </p>;
          const provider = data.subscribers || null;
          const hasentities = provider && provider.length > 0;
          return (
            <React.Fragment>
              {loading && <TinyLoader />}
              {!hasentities && (
                <div id="page-main-column">
                  <NoContent description="Aucun utilisateur est inscrit à la newsletter alerte" />
                </div>
              )}
              {hasentities && (
                <DataTable provider={provider}
                  actions={{
                    delete: this.onDeleteClick,
                  }}
                  cols={[
                    {
                      key: 'email',
                      label: 'Inscrits',
                    },
                    {
                      type: 'bool',
                      key: 'preferences',
                      label: 'Preferences',
                      validate: v => (!!(v && v.length)),
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

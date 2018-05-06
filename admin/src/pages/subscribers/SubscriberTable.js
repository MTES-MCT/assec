import React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import { GET_ALL_SUBSCRIBERS } from './../../apolloql';
import NoContent from './../../components/ui/NoContent';
import TinyLoader from './../../components/ui/TinyLoader';
import DataTable from './../../components/datatable/DataTable';

const SubscriberTable = () => (
  <Query query={GET_ALL_SUBSCRIBERS}>
    {({ loading, error, data }) => {
      if (error) return <p>Error </p>;
      const provider = data.subscribers || null;
      const hassubscribers = provider && provider.length > 0;
      return (
        <React.Fragment>
          {loading && <TinyLoader />}
          {!hassubscribers && (
            <div id="page-main-column">
              <NoContent description="Aucune personne n'est encore inscrit" />
            </div>
          )}
          {hassubscribers && (
            <DataTable provider={provider}
              actions={{
                edit: () => {},
                delete: () => {},
              }}
              cols={[
                {
                  key: 'email',
                  type: 'label',
                  label: 'eMail',
                },
              ]} />
          )}
        </React.Fragment>
      );
    }}
  </Query>
);

SubscriberTable.propTypes = {};

export default connect()(SubscriberTable);

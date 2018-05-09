import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import {
  DELETE_BLOCK,
  GET_ALL_BLOCKS,
  UPDATE_ALL_BLOCKS,
} from './../../apolloql';
import NoContent from './../ui/NoContent';
import TinyLoader from './../ui/TinyLoader';
import BlockPopin from './../popins/BlockPopin';
import DataTable from './../ui/datatable/DataTable';
import { openPopin, openDeletePopin } from './../../actions';

class BlockTable extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onEditClick ({ id, label }) {
    const popin = { id, label, Type: BlockPopin };
    this.props.dispatch(openPopin(popin));
  }

  onDeleteClick ({ id, label }) {
    const opts = {
      id,
      name: label,
      deleteAction: DELETE_BLOCK,
      updateAction: UPDATE_ALL_BLOCKS,
    };
    this.props.dispatch(openDeletePopin(opts));
  }

  render () {
    return (
      <Query query={GET_ALL_BLOCKS}>
        {({ loading, error, data }) => {
          if (error) return <p>Error </p>;
          const provider = data.blocks || null;
          const hasblocks = provider && provider.length > 0;
          const len = (provider && provider.length) || 0;
          return (
            <React.Fragment>
              {loading && <TinyLoader />}
              {!hasblocks && (
                <div id="page-main-column">
                  <NoContent description="Ajouter un block en utilisant le formulaire ci-contre" />
                </div>
              )}
              {hasblocks && (
                <DataTable provider={provider}
                  actions={{
                    edit: this.onEditClick,
                    delete: this.onDeleteClick,
                  }}
                  cols={[
                    {
                      key: 'slug',
                      type: 'slug',
                      label: `${len} Blocks CMS`,
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

BlockTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(BlockTable);

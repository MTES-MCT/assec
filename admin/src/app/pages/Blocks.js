import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';
import BlockForm from './../components/forms/BlockForm';
import BlockTable from './../components/tables/BlockTable';

class BlocksPages extends React.PureComponent {
  render () {
    const { config } = this.props;
    const { name, ...pageopts } = config;
    return (
      <AppPage name={`Gestion des ${name}`} {...pageopts}>
        <React.Fragment>
          <div id="page-main-column" className="col50">
            <BlockTable />
          </div>
          <div id="page-aside-column" className="col50">
            <BlockForm />
          </div>
        </React.Fragment>
      </AppPage>
    );
  }
}

BlocksPages.propTypes = {
  config: PropTypes.object.isRequired,
};

export default BlocksPages;

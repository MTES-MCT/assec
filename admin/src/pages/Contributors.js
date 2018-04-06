import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';
import PersonsTable from './contributors/PersonsTable';
import DepartementSelector from './ui/DepartementSelector';
import ContributorForm from './contributors/ContributorForm';

class ContributorsPage extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { selected: null };
    this.onChange = this.onChange.bind(this);
  }

  onChange (departementId) {
    this.setState({ selected: departementId });
  }

  render () {
    const { config } = this.props;
    const { selected } = this.state;
    return (
      <AppPage {...config}
        header={() => <DepartementSelector onChange={this.onChange} />}>
        <div id="page-main-column">
          <PersonsTable selected={selected} />
        </div>
        <div id="page-aside-column">
          <ContributorForm />
        </div>
      </AppPage>
    );
  }
}

ContributorsPage.propTypes = {
  config: PropTypes.object.isRequired,
};

export default ContributorsPage;

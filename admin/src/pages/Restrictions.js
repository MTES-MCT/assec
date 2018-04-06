import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';
import DepartementSelector from './ui/DepartementSelector';
import RestrictionsTable from './restrictions/RestrictionsTable';

class RestrictionsPage extends React.PureComponent {
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
        <div id="page-main-column" className="col50">
          <RestrictionsTable selected={selected} />
        </div>
        <div id="page-aside-column" className="col50" />
      </AppPage>
    );
  }
}

RestrictionsPage.propTypes = {
  config: PropTypes.object.isRequired,
};

export default RestrictionsPage;

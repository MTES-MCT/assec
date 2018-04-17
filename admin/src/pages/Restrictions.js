import React from 'react';
import PropTypes from 'prop-types';

// application
import AppPage from './../components/AppPage';
import RestrictionsForm from './restrictions/RestrictionsForm';
import EntitySelector from './../components/forms/EntitySelector';
import RestrictionsTable from './restrictions/RestrictionsTable';

class RestrictionsPage extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { selected: null };
    this.onChange = this.onChange.bind(this);
  }

  onChange (id) {
    if (!id) return;
    this.setState({ selected: id });
  }

  render () {
    const { selected } = this.state;
    const {
      config: { name, ...rest },
    } = this.props;
    return (
      <AppPage name={`Gestion ${name}`}
        {...rest}
        header={() => (
          <fieldset>
            <EntitySelector onChange={this.onChange} />
          </fieldset>
        )}>
        <div id="page-main-column" className="col50">
          <RestrictionsTable selected={selected} />
        </div>
        <div id="page-aside-column" className="col50">
          {selected && <RestrictionsForm selected={selected} />}
        </div>
      </AppPage>
    );
  }
}

RestrictionsPage.propTypes = {
  config: PropTypes.object.isRequired,
};

export default RestrictionsPage;

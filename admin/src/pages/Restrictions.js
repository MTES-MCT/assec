import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

// application
import { ALL_DEPARTEMENTS } from './../apolloql';
import AppPage from './../components/AppPage';
import NoContent from './../components/ui/NoContent';
import RestrictionsForm from './restrictions/RestrictionsForm';
import RestrictionsTable from './restrictions/RestrictionsTable';
import EntitySelector from './../components/forms/EntitySelector';

const renderNoContent = () => (
  <div id="page-main-column">
    <NoContent link="departements"
      description="Vous devez ajouter un département avant de pouvoir ajouter des restrictions" />
  </div>
);

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

  renderContent () {
    const { selected } = this.state;
    return (
      <React.Fragment>
        <div id="page-main-column" className="col50">
          <RestrictionsTable selected={selected} />
        </div>
        <div id="page-aside-column" className="col50">
          {selected && <RestrictionsForm selected={selected} />}
        </div>
      </React.Fragment>
    );
  }

  render () {
    const { config, data } = this.props;
    const { name, ...pageopts } = config;
    const hasdepartements = data.departements && data.departements.length > 0;
    return (
      <AppPage name={`Gestion ${name}`}
        {...pageopts}
        header={() =>
          hasdepartements && (
            <fieldset>
              <EntitySelector query={ALL_DEPARTEMENTS}
                onChange={this.onChange} />
            </fieldset>
          )
        }>
        {!hasdepartements && renderNoContent()}
        {hasdepartements && this.renderContent()}
      </AppPage>
    );
  }
}

RestrictionsPage.propTypes = {
  data: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

export default graphql(ALL_DEPARTEMENTS)(RestrictionsPage);

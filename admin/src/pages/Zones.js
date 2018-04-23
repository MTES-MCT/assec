import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

// application
import { ALL_DEPARTMENTS } from './../apolloql';
import ZonesForm from './zones/ZonesForm';
import ZonesTable from './zones/ZonesTable';
import AppPage from './../components/AppPage';
import NoContent from './../components/ui/NoContent';
import EntitySelector from './../components/forms/EntitySelector';

const renderNoDepartement = () => (
  <div id="page-main-column">
    <NoContent link="departements"
      description="Vous devez ajouter un département avant de pouvoir ajouter des zones" />
  </div>
);

const renderNoSelected = () => (
  <div id="page-main-column">
    <NoContent description="Sélectionnez un département pour modifier/ajouter ses zones" />
  </div>
);

class ZonesPage extends React.PureComponent {
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
          <ZonesTable selected={selected} />
        </div>
        <div id="page-aside-column" className="col50">
          {selected && <ZonesForm selected={selected} />}
        </div>
      </React.Fragment>
    );
  }

  render () {
    const { selected } = this.state;
    const { config, data } = this.props;
    const { name, ...pageopts } = config;
    const hasdepartements = data.departments && data.departments.length > 0;
    return (
      <AppPage name={`Gestion ${name}`}
        {...pageopts}
        header={() =>
          hasdepartements && (
            <fieldset>
              <EntitySelector query={ALL_DEPARTMENTS}
                onChange={this.onChange} />
            </fieldset>
          )
        }>
        {!hasdepartements && renderNoDepartement()}
        {!selected && hasdepartements && renderNoSelected()}
        {selected && hasdepartements && this.renderContent()}
      </AppPage>
    );
  }
}

ZonesPage.propTypes = {
  data: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

export default graphql(ALL_DEPARTMENTS)(ZonesPage);

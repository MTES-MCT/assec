import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

// application
import { GET_ALL_DEPARTMENTS } from './../apolloql';
import AppPage from './../components/AppPage';
import NoContent from './../components/ui/NoContent';
import QuestionForm from './../components/forms/QuestionForm';
import QuestionTable from './../components/tables/QuestionTable';
import EntitySelector from './../components/ui/forms/EntitySelector';

const renderNoDepartement = () => (
  <div id="page-main-column">
    <NoContent link="departements"
      description="Vous devez ajouter un département avant de pouvoir gérer ses questions" />
  </div>
);

const renderNoSelected = () => (
  <div id="page-main-column">
    <NoContent description="Sélectionnez un département pour voir ses questions" />
  </div>
);

class QuestionsPage extends React.PureComponent {
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
          <QuestionTable selected={selected} />
        </div>
        <div id="page-aside-column" className="col50">
          {selected && <QuestionForm selected={selected} />}
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
              <EntitySelector query={GET_ALL_DEPARTMENTS}
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

QuestionsPage.propTypes = {
  data: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

export default graphql(GET_ALL_DEPARTMENTS)(QuestionsPage);

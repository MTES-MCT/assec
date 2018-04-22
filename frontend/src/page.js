import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// application
import { usedebug } from './core/utils';
import { loadForm } from './actions/form';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

// routes
import FormScreen from './components/pages/FormScreen';

class PageComponent extends React.Component {
  constructor (props) {
    super(props);
    const { dispatch } = props;
    this.actions = bindActionCreators(
      {
        loadForm,
      },
      dispatch,
    );
  }
  componentDidMount () {
    // charge le schema du formulaire au chargement de la page
    const { client } = this.props;
    this.actions.loadForm(client);
  }

  render () {
    const { activestep } = this.props;
    return (
      <div id="app-container" className="flex-rows">
        <Helmet>
          <body className={`current-step-${activestep}`} />
          <title>Assec{usedebug() ? ' | Development' : ''}</title>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600"
            rel="stylesheet" />
        </Helmet>
        <AppHeader title="ASSEC"
          subtitle="Accédez aux règles d’utilisation de l’eau en période de sécheresse en 3 clics" />
        {/* routes */}
        <FormScreen />
        {/* routes */}
        <AppFooter />
      </div>
    );
  }
}

PageComponent.propTypes = {
  client: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  activestep: PropTypes.number.isRequired,
};

export default connect(state => ({
  activestep: state.stepper.activestep,
}))(PageComponent);

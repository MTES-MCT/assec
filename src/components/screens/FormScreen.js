import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import loadForm from './../../actions/load-form';
import FormNavigation from './../form/FormNavigation';
import StepperProgress from './../form/stepper/StepperProgress';

class FormScreen extends React.PureComponent {
  componentDidMount () {
    // charge le schema du formulaire au chargement de la page
    this.props.dispatch(loadForm());
  }

  render () {
    const { disabled, stepper } = this.props;
    console.log('stepper', stepper);
    return (
      <div id="screen-container">
        <StepperProgress {...stepper} />
        <div id="app-content" className="flex-columns">
          {/*
          <AppSidebar />
          <div id="stepper-form" className="column flex4">
            <AppForm />
          </div> */}
          <FormNavigation disabled={disabled} />
        </div>
      </div>
    );
  }
}

FormScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  stepper: PropTypes.object.isRequired,
};

const mapStateToProps = ({ stepper }) => ({
  stepper,
  disabled: true,
});

export default connect(mapStateToProps)(FormScreen);

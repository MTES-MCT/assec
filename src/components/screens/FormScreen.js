import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { FORM_NAME } from './../../constants';
import FormFields from './../form/FormFields';
import loadForm from './../../actions/load-form';
import FormNavigation from './../form/FormNavigation';
import StepperProgress from './../form/stepper/StepperProgress';
import FormSidebarHeader from './../form/sidebar/FormSidebarHeader';
import FormSidebarContent from './../form/sidebar/FormSidebarContent';

class FormScreen extends React.PureComponent {
  componentDidMount () {
    // charge le schema du formulaire au chargement de la page
    this.props.dispatch(loadForm());
  }

  render () {
    const {
      disabled, stepper, formfields, responses,
    } = this.props;
    console.log('formfields', formfields);
    return (
      <div id="screen-container">
        <StepperProgress {...stepper} />
        <div id="app-content" className="flex-columns">
          <div id="app-sidebar-left" className="column flex1">
            <FormSidebarHeader />
            <FormSidebarContent responses={responses} />
          </div>
          <div id="stepper-form" className="column flex4">
            <FormFields fields={formfields} active={stepper.active} />
            <FormNavigation disabled={disabled} />
          </div>
        </div>
      </div>
    );
  }
}

FormScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  stepper: PropTypes.object.isRequired,
  responses: PropTypes.array.isRequired,
  formfields: PropTypes.array.isRequired,
};

const mapStateToProps = ({ form, stepper, formfields }) => {
  const values = (form[FORM_NAME] && form[FORM_NAME].values) || [];
  return {
    stepper,
    formfields,
    disabled: true,
    responses: [],
  };
};

export default connect(mapStateToProps)(FormScreen);

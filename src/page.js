import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// pages
import loadForm from './actions/load-form';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
// import AppForm from './components/mockup/AppForm';
// import AppResults from './components/mockup/AppResults';
// import AppSidebar from './components/mockup/AppSidebar';
// import FormNavigation from './components/mockup/forms/FormNavigation';
// import StepperProgress from './components/mockup/stepper/StepperProgress';

class PageComponent extends React.PureComponent {
  componentDidMount () {
    this.props.dispatch(loadForm());
  }

  render () {
    return (
      <div id="app-container" className="flex-rows">
        <Helmet>
          <title>Assec</title>
          <link rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto" />
        </Helmet>
        <AppHeader />
        {/* <StepperProgress />
        <div id="app-content" className="flex-columns">
          <AppSidebar />
          <div id="stepper-form" className="column flex4">
            <AppForm />
            <FormNavigation />
          </div>
        </div> */}
        <AppFooter />
      </div>
    );
  }
}

PageComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// const mapStateToProps = ({ activestep, fields }) => {
//   const showresults =
//     fields && fields.length > 0 && activestep === fields.length;
//   return { showresults };
// };

export default connect()(PageComponent);

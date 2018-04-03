import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, FormSection, Form } from 'redux-form';

// application
import PersonsTable from './contributors/PersonsTable';
import { CONTRIBUTORS_FORM_NAME } from './../constants';

class ContributorsPage extends React.PureComponent {
  render () {
    return (
      <div id="contributors-page" className="flex-rows">
        <div className="page-contributors-form">
          <Form onSubmit={() => {}}>
            <FormSection name="contributor" component="fieldset">
              <label htmlFor="name">
                <span>Nom du contact</span>
                <input type="text" name="name" />
              </label>
            </FormSection>
          </Form>
        </div>
        <PersonsTable />
      </div>
    );
  }
}

ContributorsPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

export default reduxForm({
  form: CONTRIBUTORS_FORM_NAME,
})(connect(() => ({}))(ContributorsPage));

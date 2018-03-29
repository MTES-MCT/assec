import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, FormSection, Form } from 'redux-form';

import { CONTRIBUTORS_FORM_NAME } from './../constants';

class ContributorsPage extends React.PureComponent {
  render () {
    const { contributors } = this.props;
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
        <div className="page-contributors-persons">
          <table>
            <thead>
              <tr>
                <th>N° Département</th>
                <th>Nom Département</th>
                <th>Nom du contact</th>
                <th>eMail du contact</th>
                <th>Telephone du contact</th>
                <th>Adresse du contact</th>
              </tr>
            </thead>
            <tbody>
              {contributors.map(obj => (
                <tr>
                  <td>{obj.dpt_num}</td>
                  <td>{obj.dpt_name}</td>
                  <td>{obj.person.name}</td>
                  <td>{obj.person.email}</td>
                  <td>{obj.person.phone}</td>
                  <td>{obj.person.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ContributorsPage.propTypes = {
  contributors: PropTypes.array.isRequired,
};

export default reduxForm({
  form: CONTRIBUTORS_FORM_NAME,
})(connect(() => ({
  contributors: [],
}))(ContributorsPage));

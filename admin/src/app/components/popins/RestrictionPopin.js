import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Field } from 'react-final-form';

// application
import {
  GET_RESTRICTION,
  UPDATE_RESTRICTION,
  GET_DEPARTMENT_SUOS,
} from './../../apolloql';
import withEditPopin from './../ui/popins/withEditPopin';
import TextArea from './../../components/ui/forms/TextArea';
import TextInput from './../../components/ui/forms/TextInput';
import CheckboxGroup from './../../components/ui/forms/CheckboxGroup';

const validator = (values) => {
  const errors = {};
  if (!values.label || values.label === '') {
    errors.label = 'Required';
  }
  if (!values.description || values.description === '') {
    errors.description = 'Required';
  }
  if (!values.usages || values.usages.length <= 0) {
    errors.usages = 'Required';
  }
  if (!values.origines || values.origines.length <= 0) {
    errors.origines = 'Required';
  }
  if (!values.situations || values.situations.length <= 0) {
    errors.situations = 'Required';
  }
  return errors;
};

const RestrictionPopin = ({ formrenderprops: { values } }) => (
  <Query query={GET_DEPARTMENT_SUOS}
    variables={{ department: values.department }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      const {
        departmentSUOs: { situations, usages, origines },
      } = data;
      return (
        <div className="flex-rows">
          <Field name="department" type="hidden" component="input" />
          <TextInput inline name="label" label="Titre de la restriction" />
          <TextArea inline
            large
            name="description"
            className="inline"
            label="Description de la restriction" />
          <CheckboxGroup name="situations"
            display="inline"
            label="Situation"
            provider={situations || []} />
          <CheckboxGroup name="usages"
            label="Usage"
            display="inline"
            provider={usages || []} />
          <CheckboxGroup name="origines"
            label="Origine"
            display="inline"
            provider={origines || []} />
          <TextArea inline
            large
            name="information"
            className="inline"
            label="Plus d'informations pédagogiques" />
        </div>
      );
    }}
  </Query>
);

RestrictionPopin.propTypes = {
  formrenderprops: PropTypes.object.isRequired,
};

export default withEditPopin(RestrictionPopin, {
  query: GET_RESTRICTION,
  mutation: UPDATE_RESTRICTION,
  validator,
  entityname: 'restriction',
  suptitle: 'Modification de la restriction',
});

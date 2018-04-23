import React from 'react';
import arrayMutators from 'final-form-arrays';
import { Mutation, Query } from 'react-apollo';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-calculate';

// application
import {
  ALL_DEPARTMENTS,
  CREATE_DEPARTMENT,
  UPDATE_DEPARTMENTS,
} from './../../apolloql';
import Legend from './../../components/forms/Legend';
import dptsutils from './../../core/utils/departments';
import TagValues from './../../components/forms/TagValues';
import SelectBox from './../../components/forms/SelectBox';
import SubmitButton from './../../components/forms/SubmitButton';

const calculator = createDecorator({
  // permet de calculer une valeur en fonction
  // d'une autre, ici c'est le code du département
  // qui permet d'en sélectionner son nom dans liste
  // prédéfinies des departements.json
  field: 'code',
  updates: {
    name: code => (!code || code === '' ? '' : dptsutils.get.name(code)),
  },
});

const validateSUOS = (suos) => {
  // vérifie que tous les champs validations
  // contiennent au moins une valeur
  const results = Object.keys(suos).filter(key => suos[key].length > 0);
  return results.length === 3;
};

const validator = (values) => {
  const errors = {};
  if (!values.code || values.code === '') {
    errors.code = 'Required';
  }
  if (!values.name || values.name === '') {
    errors.name = 'Required';
  }
  if (!values.suos || !validateSUOS(values.suos)) {
    errors.suos = 'Required';
  }
  return errors;
};

const initialValues = {
  name: '',
  code: '',
  suos: {
    usages: [],
    origines: [],
    situations: [],
  },
};

const DepartementForm = () => (
  <Query query={ALL_DEPARTMENTS}>
    {({ loading, data }) => {
      if (loading) return <p>Loading... </p>;
      const dptslist = dptsutils.omit(data.departments);
      return (
        <Mutation mutation={CREATE_DEPARTMENT} update={UPDATE_DEPARTMENTS}>
          {(createDepartement, result) => (
            <Form mutators={{ ...arrayMutators }}
              validate={validator}
              decorators={[calculator]}
              initialValues={initialValues}
              onSubmit={(values, form) =>
                createDepartement({ variables: values })
                  .then(() => form.reset())
                  .catch(() => {})
              }
              render={({
                form, invalid, pristine, handleSubmit,
              }) => (
                <form onSubmit={handleSubmit} className="mb20">
                  <fieldset>
                    <Field name="name" type="hidden" component="input" />
                    <Legend label="Ajouter un département" />
                    <SelectBox name="code"
                      label="Département"
                      disabled={result.loading}
                      provider={dptslist.map(obj => ({
                        id: obj.departmentCode,
                        label: `${obj.departmentCode} - ${obj.departmentName}`,
                      }))} />
                    <TagValues name="suos.situations"
                      label="Situations"
                      mutatorpush={form.mutators.unshift}
                      disabled={pristine || result.loading}
                      placeholder="Nom de la situation" />
                    <TagValues name="suos.usages"
                      label="Usages"
                      disabled={pristine || result.loading}
                      mutatorpush={form.mutators.unshift}
                      placeholder="Nom de l'usage" />
                    <TagValues name="suos.origines"
                      label="Origines"
                      mutatorpush={form.mutators.unshift}
                      disabled={pristine || result.loading}
                      placeholder="Nom de l'origine" />
                    <SubmitButton label="Ajouter"
                      invalid={invalid || result.loading}
                      pristine={pristine || result.loading} />
                  </fieldset>
                </form>
              )} />
          )}
        </Mutation>
      );
    }}
  </Query>
);

export default DepartementForm;

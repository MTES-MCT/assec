import React from 'react';
import { ARRAY_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { Form, Field } from 'react-final-form';
import { Query, Mutation } from 'react-apollo';
import createDecorator from 'final-form-calculate';

// application
import {
  CREATE_DEPARTMENT,
  GET_ALL_DEPARTMENTS,
  UPDATE_ALL_DEPARTMENTS,
} from './../../apolloql';
import dptsutils from './../../core/utils/departments';
import Legend from './../../components/ui/forms/Legend';
import TagValues from './../../components/ui/forms/TagValues';
import SelectBox from './../../components/ui/forms/SelectBox';
import SubmitButton from './../../components/ui/forms/SubmitButton';

const calculator = createDecorator({
  // permet de calculer une valeur en fonction d'une autre
  field: 'code',
  updates: {
    // ici c'est le code du département
    // qui permet de récupérer son nom dans la liste
    // prédéfinies des departements.json
    label: code => (!code || code === '' ? '' : dptsutils.get.name(code)),
  },
});

const validator = (values) => {
  // valide que les valeurs du formulaire
  // sont OK avec ce que l'on attend
  const errors = {};
  if (!values.code || values.code === '') {
    errors.code = 'Required';
  }
  if (!values.label || values.label === '') {
    errors.label = 'Required';
  }
  if (!values.usages || values.usages.length <= 0) {
    errors.usages = [];
    errors.usages[ARRAY_ERROR] = 'Required';
  }
  if (!values.origines || values.origines.length <= 0) {
    errors.origines = [];
    errors.origines[ARRAY_ERROR] = 'Required';
  }
  if (!values.situations || values.situations.length <= 0) {
    errors.situations = [];
    errors.situations[ARRAY_ERROR] = 'Required';
  }
  return errors;
};

const initialValues = {
  code: '',
  label: '',
  usages: [],
  origines: [],
  situations: [],
};

const DepartementForm = () => (
  <Query query={GET_ALL_DEPARTMENTS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading... </p>;
      if (error) return <p>error... </p>;
      const dptslist = dptsutils.omit(data.departments);
      return (
        <Mutation mutation={CREATE_DEPARTMENT} update={UPDATE_ALL_DEPARTMENTS}>
          {(createDepartement, result) => (
            <Form mutators={{ ...arrayMutators }}
              validate={validator}
              decorators={[calculator]}
              initialValues={initialValues}
              render={({
                form, invalid, pristine, handleSubmit,
              }) => (
                <form onSubmit={handleSubmit} className="mb20">
                  <fieldset>
                    <Field name="label" type="hidden" component="input" />
                    <Legend label="Ajouter un département" />
                    <SelectBox name="code"
                      label="Département"
                      provider={dptslist.map(obj => ({
                        id: obj.departmentCode,
                        label: `${obj.departmentCode} - ${obj.departmentName}`,
                      }))} />
                    <TagValues name="situations"
                      label="Situations"
                      placeholder="Nom de la situation"
                      mutatorpush={form.mutators.unshift}
                      disabled={pristine || result.loading} />
                    <TagValues name="usages"
                      label="Usages"
                      placeholder="Nom de l'usage"
                      disabled={pristine || result.loading}
                      mutatorpush={form.mutators.unshift} />
                    <TagValues name="origines"
                      label="Origines"
                      placeholder="Nom de l'origine"
                      mutatorpush={form.mutators.unshift}
                      disabled={pristine || result.loading} />
                    <SubmitButton label="Ajouter"
                      invalid={invalid || result.loading}
                      pristine={pristine || result.loading} />
                  </fieldset>
                </form>
              )}
              onSubmit={(variables, form) =>
                createDepartement({ variables })
                  .then(() => form.reset())
                  .catch(() => {})
              } />
          )}
        </Mutation>
      );
    }}
  </Query>
);

export default DepartementForm;

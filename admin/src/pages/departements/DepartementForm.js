import React from 'react';
import arrayMutators from 'final-form-arrays';
import { Mutation, Query } from 'react-apollo';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-calculate';

// application
import {
  ALL_DEPARTEMENTS,
  CREATE_DEPARTEMENT,
  UPDATE_DEPARTEMENTS,
} from './../../apolloql';
import dptsutils from './../../lib/departments';
import Legend from './../../components/forms/Legend';
import TagValues from './../../components/forms/TagValues';
import SelectBox from './../../components/forms/SelectBox';
import SubmitButton from './../../components/forms/SubmitButton';

const calculator = createDecorator({
  field: 'code',
  updates: {
    name: code => (!code || code === '' ? '' : dptsutils.get.name(code)),
  },
});

const validateSUOS = (suos) => {
  const results = Object.keys(suos).filter(key => suos[key].length > 0);
  return results.length === 3;
};

const validator = (values) => {
  const errors = {};
  if (!values.code || values.code === '') {
    errors.code = 'Required';
  }
  if (!values.name || values.code === '') {
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
  <Query query={ALL_DEPARTEMENTS}>
    {({ loading, data: { departements: loaded } }) => {
      if (loading) return <p>Loading... </p>;
      const dptslist = dptsutils.omit(loaded);
      return (
        <Mutation mutation={CREATE_DEPARTEMENT} update={UPDATE_DEPARTEMENTS}>
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
                invalid,
                pristine,
                handleSubmit,
                mutators: { unshift },
              }) => (
                <form onSubmit={handleSubmit} className="mb20">
                  <fieldset>
                    <Legend label="Ajouter un département" />
                    <SelectBox name="code"
                      label="Département"
                      disabled={result.loading}
                      provider={dptslist.map(obj => ({
                        id: obj.departmentCode,
                        label: `${obj.departmentCode} - ${obj.departmentName}`,
                      }))} />
                    <Field name="name" type="hidden" component="input" />
                    <TagValues name="suos.situations"
                      push={unshift}
                      label="Situations"
                      disabled={pristine || result.loading}
                      placeholder="Nom de la situation" />
                    <TagValues name="suos.usages"
                      label="Usages"
                      push={unshift}
                      disabled={pristine || result.loading}
                      placeholder="Nom de l'usage" />
                    <TagValues name="suos.origines"
                      push={unshift}
                      label="Origines"
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

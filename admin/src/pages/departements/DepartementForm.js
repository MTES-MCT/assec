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
import SelectBox from './../../components/forms/SelectBox';
import ArrayValues from './../../components/forms/ArrayValues';
import SubmitButton from './../../components/forms/SubmitButton';

const calculator = createDecorator({
  field: 'code',
  updates: {
    name: code => (!code || code === '' ? '' : dptsutils.get.name(code)),
  },
});

const validator = (values) => {
  const errors = {};
  if (!values.code || values.code === '') {
    errors.code = 'Required';
  }
  if (!values.name || values.code === '') {
    errors.name = 'Required';
  }
  // if (!values.suos) {
  //   errors.suos = 'required';
  // }
  // // FIXME -> validate empty fields
  // if (!values.suos.usages || !values.suos.usages.length) {
  //   errors['suos.usages'] = 'Required';
  // }
  // if (!values.suos.origines || !values.suos.origines.length) {
  //   errors['suos.origines'] = 'Required';
  // }
  // if (!values.suos.situations || !values.suos.situations.length) {
  //   errors['suos.situations'] = 'Required';
  // }
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
          {createDepartement => (
            <Form mutators={{ ...arrayMutators }}
              validate={validator}
              decorators={[calculator]}
              initialValues={initialValues}
              onSubmit={(values, form) => {
                createDepartement({ variables: values });
                form.reset();
              }}
              render={({
                invalid,
                pristine,
                handleSubmit,
                mutators: { unshift },
              }) => (
                <form onSubmit={handleSubmit} className="mb20">
                  <fieldset>
                    <Legend icon="globe" label="Ajouter un département" />
                    <SelectBox name="code"
                      label="Département"
                      provider={dptslist.map(obj => ({
                        id: obj.departmentCode,
                        label: `${obj.departmentCode} - ${obj.departmentName}`,
                      }))} />
                    <Field name="name" type="hidden" component="input" />
                    <ArrayValues name="suos.situations"
                      initial={[]}
                      push={unshift}
                      label="Situations"
                      placeholder="Nom de la situation" />
                    <ArrayValues name="suos.usages"
                      initial={[]}
                      label="Usages"
                      push={unshift}
                      placeholder="Nom de l'usage" />
                    <ArrayValues name="suos.origines"
                      initial={[]}
                      push={unshift}
                      label="Origines"
                      placeholder="Nom de l'origine" />
                    <SubmitButton label="Ajouter"
                      invalid={invalid}
                      pristine={pristine} />
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

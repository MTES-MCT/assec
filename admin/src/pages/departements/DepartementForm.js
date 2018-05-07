import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import arrayMutators from 'final-form-arrays';
import { Mutation, Query } from 'react-apollo';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-calculate';

// application
import {
  GET_ALL_DEPARTMENTS,
  CREATE_DEPARTMENT,
  UPDATE_ALL_DEPARTMENTS,
} from './../../apolloql';
import { validatesuos, parsesuos } from './../../core/utils/suos';
import Legend from './../../components/forms/Legend';
import dptsutils from './../../core/utils/departments';
import TagValues from './../../components/forms/TagValues';
import SelectBox from './../../components/forms/SelectBox';
import SubmitButton from './../../components/forms/SubmitButton';

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
  if (!values.suos || !validatesuos(values.suos)) {
    errors.suos = 'Required';
  }
  /*
  a utilser si on doit valider les suos unitairement
  if (!values.usages || !values.usages.length) {
    errors.usages = 'Required';
  }
  if (!values.origines || !values.origines.length) {
    errors.origines = 'Required';
  }
  if (!values.situations || !values.situations.length) {
    errors.situations = 'Required';
  }
  */
  return errors;
};

const initialValues = {
  code: '',
  label: '',
  suos: {
    usages: [],
    origines: [],
    situations: [],
  },
};

class DepartementForm extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onHydrateSituations = this.onHydrateSituations.bind(this);
  }

  onHydrateSituations ({ code, label, situations }, callback) {
    this.props.dispatch({
      type: 'onOpenPopin',
      popin: {
        callback,
        situations,
        type: 'SituationPopin',
        label: `${label} (${code})`,
      },
    });
  }

  render () {
    return (
      <Query query={GET_ALL_DEPARTMENTS}>
        {({ loading, data }) => {
          if (loading) return <p>Loading... </p>;
          const dptslist = dptsutils.omit(data.departments);
          return (
            <Mutation mutation={CREATE_DEPARTMENT}
              update={UPDATE_ALL_DEPARTMENTS}>
              {(createDepartement, result) => (
                <Form mutators={{ ...arrayMutators }}
                  validate={validator}
                  decorators={[calculator]}
                  initialValues={initialValues}
                  onSubmit={({ suos, ...base }, form) => {
                    const parsed = parsesuos(suos);
                    const vars = { ...base, ...parsed };
                    this.onHydrateSituations(vars, (situations) => {
                      const variables = { ...vars, ...situations };
                      return createDepartement({ variables })
                        .then(() => form.reset())
                        .catch(() => {});
                    });
                  }}
                  render={({
                    form, invalid, pristine, handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit} className="mb20">
                      <fieldset>
                        <Field name="label" type="hidden" component="input" />
                        <Legend label="Ajouter un département" />
                        <SelectBox name="code"
                          label="Département"
                          disabled={result.loading}
                          provider={dptslist.map(obj => ({
                            id: obj.departmentCode,
                            label: `${obj.departmentCode} - ${
                              obj.departmentName
                            }`,
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
  }
}

DepartementForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DepartementForm);

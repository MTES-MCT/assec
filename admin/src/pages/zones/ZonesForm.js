import React from 'react';
import arrayMutators from 'final-form-arrays';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-calculate';

// application
import Legend from './../../components/forms/Legend';
import dptsutils from './../../core/utils/departments';
import TextArea from './../../components/forms/TextArea';
// import TagValues from './../../components/forms/TagValues';
// import SelectBox from './../../components/forms/SelectBox';
import TextInput from './../../components/forms/TextInput';
import NumberInput from './../../components/forms/NumberInput';
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

const validator = (values) => {
  const errors = {};
  if (!values.name || values.name === '') {
    errors.name = 'Required';
  }
  return errors;
};

const initialValues = {
  name: '',
};

const ZonesForm = () => (
  <Form mutators={{ ...arrayMutators }}
    validate={validator}
    decorators={[calculator]}
    initialValues={initialValues}
    onSubmit={() => {}}
    render={({
      form, invalid, pristine, handleSubmit,
    }) => (
      <form onSubmit={handleSubmit} className="mb20">
        <fieldset>
          <Field name="department" type="hidden" component="input" />
          <Legend label="Ajouter une zone" />
          <TextInput disabled={false} name="name" label="Nom de la zone" />
          <NumberInput disabled={false}
            name="order"
            label="Ordre d'affichage de la zone" />
          <TextArea disabled={false}
            name="help"
            label="Texte d'information utilisateur" />
          <SubmitButton label="Ajouter" invalid={invalid} pristine={pristine} />
        </fieldset>
      </form>
    )} />
);

export default ZonesForm;

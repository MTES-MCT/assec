import React from 'react';
import { Form } from 'react-final-form';
import { Mutation } from 'react-apollo';

// application
import { CREATE_RESTRICTION, UPDATE_RESTRICTIONS } from './../../graphql';
import Legend from './../../components/forms/Legend';
import TextArea from './../../components/forms/TextArea';
import SelectBox from './../../components/forms/SelectBox';
import RadioGroup from './../../components/forms/RadioGroup';
import SubmitButton from './../../components/forms/SubmitButton';

const RestrictionsForm = () => (
  <Mutation mutation={CREATE_RESTRICTION} update={UPDATE_RESTRICTIONS}>
    {createDepartement => (
      <Form onSubmit={variables => createDepartement({ variables })}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className="mb40">
            <span name="restriction-form-anchor" />
            <fieldset>
              <Legend icon="attention" label="Ajouter une restriction" />
              <SelectBox name="restriction.decription"
                provider={[]}
                label="Sélectionner un département" />
              <TextArea name="restriction.description" label="Description" />
              <RadioGroup name="restriction.situation"
                label="Situation"
                provider={[]} />
              <RadioGroup name="restriction.usage"
                label="Usage"
                provider={[]} />
              <RadioGroup name="restriction.origine"
                label="Origine"
                provider={[]} />
              <TextArea name="restriction.informations"
                label="Plus d'informations"
                large />
              <SubmitButton pristine={pristine} invalid={invalid} />
            </fieldset>
          </form>
        )} />
    )}
  </Mutation>
);

export default RestrictionsForm;

import React from 'react';
import { Form } from 'react-final-form';
import { Mutation } from 'react-apollo';

// application
import { CREATE_PERSON, UPDATE_PERSONS } from './../../graphql';
import Legend from './../../components/forms/Legend';
import InputText from './../../components/forms/InputText';
import SubmitButton from './../../components/forms/SubmitButton';

const PersonForm = () => (
  <Mutation mutation={CREATE_PERSON} update={UPDATE_PERSONS}>
    {createPerson => (
      <Form onSubmit={variables => createPerson({ variables })}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className="mb20">
            <fieldset>
              <Legend icon="user" label="Ajouter un nouveau contributeur" />
              <InputText name="firstname" label="Prénom" />
              <InputText name="lastname" label="Nom" />
              <InputText name="email" label="eMail" />
              <SubmitButton invalid={invalid} pristine={pristine} />
            </fieldset>
          </form>
        )} />
    )}
  </Mutation>
);

export default PersonForm;

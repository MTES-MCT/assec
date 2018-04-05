import React from 'react';
import { Form } from 'react-final-form';
import { Mutation } from 'react-apollo';

// application
import { CREATE_PERSON, UPDATE_PERSONS } from './../../graphql';
import Legend from './../../components/forms/Legend';
import TextInput from './../../components/forms/TextInput';
import SubmitButton from './../../components/forms/SubmitButton';

const PersonForm = () => (
  <Mutation mutation={CREATE_PERSON} update={UPDATE_PERSONS}>
    {createPerson => (
      <Form onSubmit={variables => createPerson({ variables })}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className="mb40">
            <span name="person-form-anchor" />
            <fieldset>
              <Legend icon="user" label="Ajouter un nouveau contributeur" />
              <TextInput name="person.firstname" label="Prénom" />
              <TextInput name="person.lastname" label="Nom" />
              <TextInput name="person.email" label="eMail" />
              <SubmitButton invalid={invalid} pristine={pristine} />
            </fieldset>
          </form>
        )} />
    )}
  </Mutation>
);

export default PersonForm;

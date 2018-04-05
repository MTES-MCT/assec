import React from 'react';
import { Form } from 'react-final-form';
import { Mutation } from 'react-apollo';

// application
import { CREATE_DEPARTEMENT, UPDATE_DEPARTEMENTS } from './../../graphql';
import Legend from './../../components/forms/Legend';
import InputText from './../../components/forms/InputText';
import SubmitButton from './../../components/forms/SubmitButton';

const DepartementForm = () => (
  <Mutation mutation={CREATE_DEPARTEMENT} update={UPDATE_DEPARTEMENTS}>
    {createDepartement => (
      <Form onSubmit={variables => createDepartement({ variables })}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className="mb20">
            <fieldset>
              <Legend icon="globe" label="Ajouter un département" />
              <InputText name="code" label="Numéro" />
              <InputText name="name" label="Nom du département" />
              <SubmitButton pristine={pristine} invalid={invalid} />
            </fieldset>
          </form>
        )} />
    )}
  </Mutation>
);

export default DepartementForm;

import React from 'react';
import { Form } from 'react-final-form';
import { Mutation } from 'react-apollo';

// application
import { CREATE_DEPARTEMENT, UPDATE_DEPARTEMENTS } from './../../graphql';
import Legend from './../../components/forms/Legend';
import SelectBox from './../../components/forms/SelectBox';
import SubmitButton from './../../components/forms/SubmitButton';

const provider = require('./../../datas/departements.json');

const DepartementForm = () => (
  <Mutation mutation={CREATE_DEPARTEMENT} update={UPDATE_DEPARTEMENTS}>
    {createDepartement => (
      <Form onSubmit={variables => createDepartement({ variables })}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className="mb20">
            <fieldset>
              <Legend icon="globe" label="Ajouter un département" />
              <SelectBox name="departement.code"
                label="Département"
                provider={
                  provider &&
                  provider.map(({ code, name }) => ({
                    id: code,
                    name: `${code} - ${name}`,
                  }))
                } />
              <SubmitButton label="Ajouter"
                pristine={pristine}
                invalid={invalid} />
            </fieldset>
          </form>
        )} />
    )}
  </Mutation>
);

export default DepartementForm;

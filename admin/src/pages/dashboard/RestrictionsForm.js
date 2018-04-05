import React from 'react';
import { Form } from 'react-final-form';
import { ApolloConsumer, Mutation } from 'react-apollo';

// application
import {
  CREATE_RESTRICTION,
  GET_DEPARTEMENT_SUO,
  UPDATE_RESTRICTIONS,
} from './../../graphql';
import Legend from './../../components/forms/Legend';
import TextArea from './../../components/forms/TextArea';
import SelectBox from './../../components/forms/SelectBox';
import RadioGroup from './../../components/forms/RadioGroup';
import SubmitButton from './../../components/forms/SubmitButton';

const provider = require('./../../datas/departements.json');

const RestrictionsForm = () => (
  <Mutation mutation={CREATE_RESTRICTION} update={UPDATE_RESTRICTIONS}>
    {createDepartement => (
      <Form onSubmit={variables => createDepartement({ variables })}
        render={({
          handleSubmit, pristine, invalid, values,
        }) => {
          const disabled = !(
            values &&
            values.departement &&
            values.departement.code &&
            values.departement.code !== ''
          );
          return (
            <ApolloConsumer>
              {client => (
                <form onSubmit={handleSubmit} className="mb40">
                  <span name="restriction-form-anchor" />
                  <fieldset>
                    <Legend icon="attention" label="Ajouter une restriction" />
                    <SelectBox name="departement.code"
                      label="Département"
                      onChange={async (value) => {
                        const { data } = await client.query({
                          query: GET_DEPARTEMENT_SUO,
                          variables: { departement: value },
                        });
                        console.log('data', data);
                      }}
                      provider={
                        provider &&
                        provider.map(({ code, name }) => ({
                          id: code,
                          name: `${code} - ${name}`,
                        }))
                      } />
                    <TextArea disabled={disabled}
                      name="restriction.description"
                      label="Description" />
                    <RadioGroup disabled={disabled}
                      name="restriction.situation"
                      label="Situation"
                      provider={[]} />
                    <RadioGroup disabled={disabled}
                      name="restriction.usage"
                      label="Usage"
                      provider={[]} />
                    <RadioGroup disabled={disabled}
                      name="restriction.origine"
                      label="Origine"
                      provider={[]} />
                    <TextArea disabled={disabled}
                      name="restriction.informations"
                      label="Plus d'informations"
                      large />
                    <SubmitButton pristine={pristine} invalid={invalid} />
                  </fieldset>
                </form>
              )}
            </ApolloConsumer>
          );
        }} />
    )}
  </Mutation>
);

export default RestrictionsForm;

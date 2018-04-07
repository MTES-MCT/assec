import React from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Mutation, Query } from 'react-apollo';

// application
import {
  ALL_DEPARTEMENTS,
  CREATE_DEPARTEMENT,
  UPDATE_DEPARTEMENTS,
} from './../../graphql';
import Legend from './../../components/forms/Legend';
import SelectBox from './../../components/forms/SelectBox';
import ArrayValues from './../../components/forms/ArrayValues';
import SubmitButton from './../../components/forms/SubmitButton';

const provider = require('./../../datas/departements.json');

const DepartementForm = () => (
  <Query query={ALL_DEPARTEMENTS}>
    {({ loading, error, data: { allDepartements: dpts } }) => {
      if (loading) return <p>Loading... </p>;
      if (error) return <p>Error </p>;
      const dptsfilter = dpts.map(({ code }) => code);
      const selectprovider = provider
        .filter(({ code }) => !dptsfilter.includes(code))
        .map(({ code, name }) => ({
          id: code,
          name: `${code} - ${name}`,
          // FIXME -> consomme de la memoire
          // et il doit y avoir une meilleure facon de faire
          // en utilisant react-final-form
          value: JSON.stringify({ code, name }),
        }));
      return (
        <Mutation mutation={CREATE_DEPARTEMENT} update={UPDATE_DEPARTEMENTS}>
          {createDepartement => (
            <Form mutators={{ ...arrayMutators }}
              onSubmit={({ departement: { object, ...rest } }, form) => {
                const vars = {
                  ...JSON.parse(object),
                  suos: JSON.stringify(rest),
                };
                createDepartement({ variables: vars });
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
                    <SelectBox name="departement.object"
                      label="Département"
                      provider={selectprovider} />
                    <ArrayValues name="departement.situations"
                      push={unshift}
                      label="Situations"
                      placeholder="Nom de la situation" />
                    <ArrayValues name="departement.usages"
                      label="Usages"
                      push={unshift}
                      placeholder="Nom de l'usage" />
                    <ArrayValues name="departement.origines"
                      label="Origines"
                      push={unshift}
                      placeholder="Nom de l'origine" />
                    <SubmitButton label="Ajouter"
                      pristine={pristine}
                      invalid={invalid} />
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

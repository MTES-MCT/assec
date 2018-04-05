import React from 'react';
import { Form } from 'react-final-form';
import { Mutation } from 'react-apollo';
import arrayMutators from 'final-form-arrays';

// application
import { CREATE_DEPARTEMENT, UPDATE_DEPARTEMENTS } from './../../graphql';
import Legend from './../../components/forms/Legend';
import SelectBox from './../../components/forms/SelectBox';
import ArrayValues from './../../components/forms/ArrayValues';
import SubmitButton from './../../components/forms/SubmitButton';

const provider = require('./../../datas/departements.json');

const DepartementForm = () => (
  <Mutation mutation={CREATE_DEPARTEMENT} update={UPDATE_DEPARTEMENTS}>
    {createDepartement => (
      <Form mutators={{ ...arrayMutators }}
        onSubmit={(variables) => {
          console.log('variables', variables);
          // variables => createDepartement({ variables })
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
              <SelectBox name="departement.code"
                label="Département"
                provider={
                  provider &&
                  provider.map(({ code, name }) => ({
                    id: code,
                    name: `${code} - ${name}`,
                  }))
                } />
              <ArrayValues name="departement.zones"
                push={unshift}
                label="Zones"
                placeholder="Nom de la zone" />
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

export default DepartementForm;

import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Query, Mutation } from 'react-apollo';

// application
import {
  CREATE_RESTRICTION,
  GET_DEPARTEMENT_SUO,
  UPDATE_RESTRICTIONS,
} from './../../graphql';
import Legend from './../../components/forms/Legend';
import TextArea from './../../components/forms/TextArea';
import RadioGroup from './../../components/forms/RadioGroup';
import SubmitButton from './../../components/forms/SubmitButton';

// eslint-disable-next-line
const renderConsummer = (provider, selected, args) => {
  const { handleSubmit, pristine, invalid } = args;
  const disabled = !(selected && selected !== null);
  return (
    <form onSubmit={handleSubmit} className="mb40">
      <span name="restriction-form-anchor" />
      <fieldset>
        <Legend icon="attention" label="Ajouter une restriction" />
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
  );
};

const renderMutation = (provider, selected) => (
  <Mutation mutation={CREATE_RESTRICTION} update={UPDATE_RESTRICTIONS}>
    {createDepartement => (
      <Form onSubmit={variables => createDepartement({ variables })}
        render={args => renderConsummer(provider, selected, args)} />
    )}
  </Mutation>
);

const parseProvider = (suos) => {
  console.log('suos', suos);
  return suos;
};

const RestrictionsForm = ({ selected }) => {
  console.log('selected', selected);
  return (
    <Query query={GET_DEPARTEMENT_SUO} variables={{ departement: selected }}>
      {({ loading, error, data: { getDepartementSUO: suos } }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error </p>;
        const provider = parseProvider(suos);
        return renderMutation(provider, selected);
      }}
    </Query>
  );
};

RestrictionsForm.defaultProps = {
  selected: null,
};

RestrictionsForm.propTypes = {
  selected: PropTypes.string,
};

export default RestrictionsForm;

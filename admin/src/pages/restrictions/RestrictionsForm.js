import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Query, Mutation } from 'react-apollo';

// application
import {
  CREATE_RESTRICTION,
  UPDATE_RESTRICTIONS,
  GET_DEPARTEMENT_SUOS,
} from './../../apolloql';
import Legend from './../../components/forms/Legend';
import TextArea from './../../components/forms/TextArea';
import RadioGroup from './../../components/forms/RadioGroup';
import SubmitButton from './../../components/forms/SubmitButton';

const RestrictionsForm = ({ selected }) => (
  <Query query={GET_DEPARTEMENT_SUOS} variables={{ id: selected }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      const suos = data.departmentSUOS;
      return (
        <Mutation mutation={CREATE_RESTRICTION} update={UPDATE_RESTRICTIONS}>
          {() => (
            <Form onSubmit={() => {}}
              render={({ handleSubmit, pristine, invalid }) => {
                const disabled = !(selected && selected !== null);
                return (
                  <form onSubmit={handleSubmit} className="mb40">
                    <span name="restriction-form-anchor" />
                    <fieldset>
                      <Legend icon="attention"
                        label="Ajouter une restriction" />
                      <TextArea disabled={disabled}
                        name="description"
                        label="Description" />
                      <RadioGroup disabled={disabled}
                        name="situations"
                        label="Situation"
                        provider={(suos && suos.situations) || []} />
                      <RadioGroup disabled={disabled}
                        name="usages"
                        label="Usage"
                        provider={(suos && suos.usages) || []} />
                      <RadioGroup disabled={disabled}
                        name="origines"
                        label="Origine"
                        provider={(suos && suos.origines) || []} />
                      <TextArea disabled={disabled}
                        name="informations"
                        label="Plus d'informations"
                        large />
                      <SubmitButton pristine={pristine} invalid={invalid} />
                    </fieldset>
                  </form>
                );
              }} />
          )}
        </Mutation>
      );
    }}
  </Query>
);

RestrictionsForm.defaultProps = {
  selected: null,
};

RestrictionsForm.propTypes = {
  selected: PropTypes.string,
};

export default RestrictionsForm;

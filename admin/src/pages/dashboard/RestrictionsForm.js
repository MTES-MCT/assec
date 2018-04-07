import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { ApolloConsumer, Query, Mutation } from 'react-apollo';

// application
import {
  ALL_DEPARTEMENTS,
  CREATE_RESTRICTION,
  GET_DEPARTEMENT_SUO,
  UPDATE_RESTRICTIONS,
} from './../../apolloql';
import Legend from './../../components/forms/Legend';
import TextArea from './../../components/forms/TextArea';
import RadioGroup from './../../components/forms/RadioGroup';
import DepartementSelector from './../ui/DepartementSelector';
import SubmitButton from './../../components/forms/SubmitButton';

const parseProvider = dpts =>
  dpts.map(({ id, code, name }) => ({
    id,
    code,
    value: id,
    name: `${code} - ${name}`,
  }));

class RestrictionsForm extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.renderConsummer = this.renderConsummer.bind(this);
  }

  onChange () {
    console.log('onchange onchange onchange');
  }

  renderConsummer (provider, args) {
    const {
      handleSubmit, pristine, invalid, values,
    } = args;
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
              <DepartementSelector onChange={this.onChange} />
              {/* <SelectBox name="departement.code"
                label="Département"
                provider={provider}
                onChange={async (id) => {
                  console.log('id', id);
                  const { data } = await client.query({
                    query: GET_DEPARTEMENT_SUO,
                    variables: { departement: id },
                  });
                }} /> */}
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
  }

  render () {
    const { selected } = this.props;
    console.log('selected', selected);
    return (
      <Query query={ALL_DEPARTEMENTS}>
        {({ loading, error, data: { allDepartements: dpts } }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error </p>;
          const provider = parseProvider(dpts);
          return (
            <Mutation mutation={CREATE_RESTRICTION}
              update={UPDATE_RESTRICTIONS}>
              {createDepartement => (
                <Form onSubmit={variables => createDepartement({ variables })}
                  render={args => this.renderConsummer(provider, args)} />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

RestrictionsForm.defaultProps = {
  selected: null,
};

RestrictionsForm.propTypes = {
  selected: PropTypes.string,
};

export default RestrictionsForm;

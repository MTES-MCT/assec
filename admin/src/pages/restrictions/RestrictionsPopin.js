import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

// application
import { GET_RESTRICTION } from './../../apolloql';
import TagValues from './../../components/forms/TagValues';
import CloseButton from './../../components/popins/CloseButton';
import SubmitButton from './../../components/forms/SubmitButton';

const validator = () => {
  const errors = {};
  return errors;
};

const RestrictionsPopin = ({ id, onClose }) => (
  <Query query={GET_RESTRICTION} variables={{ id }}>
    {({ loading, error, data: { departement } }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      return (
        <div id="edit-popin" className="popin-inner">
          <CloseButton onClose={onClose} />
          <Form mutators={{ ...arrayMutators }}
            validate={validator}
            initialValues={departement}
            onSubmit={() => {}}
            render={({
              form, invalid, pristine, handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <h3>
                  <span>{`${departement.code} - ${departement.name}`}</span>
                </h3>
                <div className="flex-columns flex-between">
                  <TagValues name="suos.situations"
                    initial={departement.suos.situations}
                    push={form.mutators.unshift}
                    label="Situations"
                    placeholder="Nom de la situation" />
                  <TagValues name="suos.usages"
                    initial={departement.suos.usages}
                    label="Usages"
                    push={form.mutators.unshift}
                    placeholder="Nom de l'usage" />
                  <TagValues name="suos.origines"
                    initial={departement.suos.origines}
                    push={form.mutators.unshift}
                    label="Origines"
                    placeholder="Nom de l'origine" />
                </div>
                <SubmitButton label="Mettre à jour"
                  invalid={invalid}
                  pristine={pristine} />
              </form>
            )} />
        </div>
      );
    }}
  </Query>
);

RestrictionsPopin.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RestrictionsPopin;

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

const EditRestrictionsPopin = ({ id, onClose }) => (
  <Query query={GET_RESTRICTION} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      console.log('data', data);
      const { restriction } = data;
      return (
        <div id="edit-popin" className="flex-columns popin-container p20">
          <CloseButton onClose={onClose} />
          <Form mutators={{ ...arrayMutators }}
            validate={validator}
            initialValues={restriction}
            onSubmit={() => {}}
            render={({
              form, invalid, pristine, handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <h3>
                  <span>{`${restriction.title}`}</span>
                </h3>
                <div className="flex-columns flex-between">
                  <TagValues name="suos.situations"
                    initial={restriction.situations}
                    push={form.mutators.unshift}
                    label="Situations"
                    placeholder="Situation" />
                  <TagValues name="suos.usages"
                    initial={restriction.usages}
                    label="Usages"
                    push={form.mutators.unshift}
                    placeholder="Usage" />
                  <TagValues name="suos.origines"
                    initial={restriction.origines}
                    push={form.mutators.unshift}
                    label="Origines"
                    placeholder="Origine" />
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

EditRestrictionsPopin.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditRestrictionsPopin;

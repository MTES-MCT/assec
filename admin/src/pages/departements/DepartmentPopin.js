import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

// application
import { GET_DEPARTEMENT } from './../../apolloql';
import CloseButton from './../../components/popins/CloseButton';
import TagValues from './../../components/forms/TagValues';
import SubmitButton from './../../components/forms/SubmitButton';

const validator = () => {
  const errors = {};
  return errors;
};

const DepartmentPopin = ({ id, onClose }) => (
  <Query query={GET_DEPARTEMENT} variables={{ id }}>
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
              invalid,
              pristine,
              handleSubmit,
              mutators: { unshift },
            }) => (
              <form onSubmit={handleSubmit}>
                <h3>
                  <span>{`${departement.code} - ${departement.name}`}</span>
                </h3>
                <div className="flex-columns flex-between">
                  <TagValues name="suos.situations"
                    initial={departement.suos.situations}
                    push={unshift}
                    label="Situations"
                    placeholder="Nom de la situation" />
                  <TagValues name="suos.usages"
                    initial={departement.suos.usages}
                    label="Usages"
                    push={unshift}
                    placeholder="Nom de l'usage" />
                  <TagValues name="suos.origines"
                    initial={departement.suos.origines}
                    push={unshift}
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

DepartmentPopin.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DepartmentPopin;

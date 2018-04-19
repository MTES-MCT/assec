import React from 'react';
// import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Query, Mutation } from 'react-apollo';

// application
import { GET_DEPARTMENT, UPDATE_DEPARTMENT } from './../../apolloql';
import ArrayValues from './../../components/forms/ArrayValues';
import CloseButton from './../../components/popins/CloseButton';
import SubmitButton from './../../components/forms/SubmitButton';

const validator = (values) => {
  const errors = {};
  if (!values.code || values.code === '') {
    errors.code = 'Required';
  }
  if (!values.name || values.name === '') {
    errors.name = 'Required';
  }
  return errors;
};

// const parsesuos = (obj) => {
//   const res = Object.keys(obj).reduce((acc, key) => {
//     const test =
//       (obj[key] &&
//         obj[key].map &&
//         Object.assign({}, acc, {
//           [key]: obj[key].map(o => omit(o, ['__typename'])),
//         })) ||
//       acc;
//     return test;
//   }, {});
//   return res;
// };

const DepartementPopin = ({ id, onClose }) => (
  <Query query={GET_DEPARTMENT} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      const { department } = data;
      return (
        <Mutation mutation={UPDATE_DEPARTMENT}>
          {(updateDepartement, result) => (
            <div id="edit-popin" className="popin-inner">
              <CloseButton onClose={onClose} />
              <Form mutators={{ ...arrayMutators }}
                validate={validator}
                initialValues={department}
                onSubmit={() => {
                  // const parsed = parsesuos(suos);
                  // return updateDepartement({
                  //   variables: { suos: parsed, id: rest.id },
                  // })
                  //   .then(() => form.reset())
                  //   .catch(() => {});
                }}
                render={({
                  form, invalid, pristine, handleSubmit,
                }) => (
                  <div>
                    <h3>{`${department.code} - ${department.name}`}</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="flex-columns flex-between">
                        <ArrayValues name="situations"
                          label="Situations"
                          push={form.mutators.unshift}
                          placeholder="Ajouter une situation"
                          disabled={pristine || result.loading} />
                        <ArrayValues name="usages"
                          label="Usages"
                          push={form.mutators.unshift}
                          placeholder="Ajouter un usage"
                          disabled={pristine || result.loading} />
                        <ArrayValues name="origines"
                          label="Origines"
                          push={form.mutators.unshift}
                          placeholder="Ajouter une Origine"
                          disabled={pristine || result.loading} />
                      </div>
                      <div>
                        <SubmitButton label="Modifier"
                          invalid={invalid || result.loading}
                          pristine={pristine || result.loading} />
                      </div>
                    </form>
                  </div>
                )} />
            </div>
          )}
        </Mutation>
      );
    }}
  </Query>
);

DepartementPopin.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DepartementPopin;

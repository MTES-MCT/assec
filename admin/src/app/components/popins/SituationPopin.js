import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import arrayMutators from 'final-form-arrays';
import { Form, Field } from 'react-final-form';

// application
import { CREATE_DEPARTMENT, UPDATE_ALL_DEPARTMENTS } from './../../apolloql';
import { noop } from './../../core/utils/noop';
import CloseButton from './../ui/popins/CloseButton';
import SubmitButton from './../ui/forms/SubmitButton';
import SituationInput from './../ui/forms/SituationInput';

const validator = () => {
  const errors = {};
  return errors;
};

class SituationPopin extends React.PureComponent {
  render () {
    const { values, onClose } = this.props;
    // code, label, situations, origines, usages,
    return (
      <Mutation mutation={CREATE_DEPARTMENT}
        update={UPDATE_ALL_DEPARTMENTS}
        onCompleted={() => {}}>
        {(createDepartment, result) => (
          <div id="situation-popin" className="popin-container">
            <div className="popin-header p40">
              <CloseButton onClose={result.loading ? noop : onClose} />
              <h6 className="popin-suptitle">
                <span>Gestion des couleurs situations</span>
              </h6>
              <h3 className="popin-title">
                <b>{`${values.code} - ${values.label}`}</b>
              </h3>
            </div>
            <Form initialValues={values}
              onSubmit={() => {}}
              validate={validator}
              mutators={{ ...arrayMutators }}
              render={({
                handleSubmit, invalid, pristine, form,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Field type="hidden" name="code" component="input" />
                  <Field type="hidden" name="label" component="input" />
                  <Field type="hidden" name="usages" component="input" />
                  <Field type="hidden" name="origines" component="input" />
                  <SituationInput />
                  <SubmitButton label="Modifier"
                    submit={(values) => {
                      console.log('values', values);
                      console.log('submit submit submit submit');
                    }}
                    invalid={invalid || result.loading}
                    pristine={pristine || result.loading} />
                </form>
              )} />
          </div>
        )}
      </Mutation>
    );
  }
}

SituationPopin.propTypes = {
  reset: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default SituationPopin;

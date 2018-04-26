import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Query, Mutation } from 'react-apollo';

// application
import {
  UPDATE_ZONE_ALERTE,
  GET_DEPARTMENT_SUOS,
  UPDATE_DEPARTMENT_ZONES,
} from './../../apolloql';
import RadioGroup from './../../components/forms/RadioGroup';
import CloseButton from './../../components/popins/CloseButton';
import SubmitButton from './../../components/forms/SubmitButton';

const ZonePopin = ({
  department, id, label, alerte, onClose,
}) => (
  <Query query={GET_DEPARTMENT_SUOS} variables={{ department }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      const { situations } = data.departmentSUOs;
      const initialValues = {
        id,
        situationid: alerte.situation.id,
      };
      return (
        <Mutation mutation={UPDATE_ZONE_ALERTE}
          update={UPDATE_DEPARTMENT_ZONES}>
          {(updateZoneAlerte, result) => (
            <div id="edit-popin" className="popin-container">
              <CloseButton onClose={onClose} />
              <Form initialValues={initialValues}
                onSubmit={(variables, form) =>
                  updateZoneAlerte({ variables })
                    .then(() => {
                      form.reset();
                      onClose();
                    })
                    .catch(() => {})
                }
                render={({
                  form, invalid, pristine, handleSubmit,
                }) => (
                  <div className="popin-inner">
                    <h6 className="popin-title">Déclaration d&apos;alerte</h6>
                    <h3 className="popin-subtitle">{label}</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="flex-rows flex-between p12 mt20">
                        <fieldset className="popin-fieldset">
                          <Field name="id" type="hidden" component="input" />
                          <RadioGroup name="situationid"
                            display="inline"
                            provider={situations}
                            disabled={result.loading}
                            label="Selectionnez une situation" />
                        </fieldset>
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

ZonePopin.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  alerte: PropTypes.object.isRequired,
  department: PropTypes.string.isRequired,
};

export default ZonePopin;

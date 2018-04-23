import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Form, Field } from 'react-final-form';

// application
import { SUOS } from './../../apolloql';
import RadioGroup from './../../components/forms/RadioGroup';
import CloseButton from './../../components/popins/CloseButton';
import SubmitButton from './../../components/forms/SubmitButton';

const ZonePopin = ({
  dpt, id, name, onClose,
}) => (
  <Query query={SUOS} variables={{ dpt }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error </p>;
      const { situations } = data.suos;
      return (
        <div id="edit-popin" className="popin-inner">
          <CloseButton onClose={onClose} />
          <Form initialValues={{ id }}
            onSubmit={() => {
              // const parsed = parsesuos(suos);
              // return updateDepartement({
              //   variables: { suos: parsed, id: rest.id },
              // })
              //   .then(() => {
              //   form.reset()
              //   onClose();
              //   })
              //   .catch(() => {});
            }}
            render={({
              form, invalid, pristine, handleSubmit,
            }) => (
              <div>
                <h6>Déclaration d&apos;alerte</h6>
                <h3>{name}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="flex-rows flex-between p12 mt20">
                    <fieldset className="popin-fieldset">
                      <Field name="id" type="hidden" component="input" />
                      <RadioGroup name="alerte.situation"
                        display="inline"
                        provider={situations}
                        label="Selectionnez une situation" />
                    </fieldset>
                    <SubmitButton label="Modifier"
                      invalid={invalid}
                      pristine={pristine} />
                  </div>
                </form>
              </div>
            )} />
        </div>
      );
    }}
  </Query>
);

ZonePopin.propTypes = {
  id: PropTypes.string.isRequired,
  dpt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ZonePopin;

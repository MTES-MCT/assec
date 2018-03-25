import React from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';

// application
import LeafletMap from './../leafletmap/LeafletMap';

const ZoningInput = ({
  id, help, label, values,
}) => (
  <FormSection name={id} component="fieldset" onChange={() => {}}>
    <h3>{label}</h3>
    {help && <p>{help}</p>}
    <div id="zoning-map">
      <LeafletMap />
      <Field type="hidden" component="input" name="choice" value="" />
    </div>
  </FormSection>
);

ZoningInput.propTypes = {
  id: PropTypes.string.isRequired,
  help: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  // onChange: PropTypes.func.isRequired,
};

export default ZoningInput;

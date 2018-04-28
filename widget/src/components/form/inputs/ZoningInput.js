import React from 'react';
import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';

// application
import LeafletMap from './../leafletmap/LeafletMap';

const ZoningInput = ({
  id, help, label, values,
}) => (
  <FormSection name={id} component="fieldset">
    <div className="input-type-map">
      <div className="flex-columns">
        <div id="zoning-map" className="flex2">
          <LeafletMap zones={values} />
        </div>
        <div className="flex1">
          <h3>{label}</h3>
          {help && <p>{help}</p>}
        </div>
      </div>
    </div>
  </FormSection>
);

ZoningInput.propTypes = {
  id: PropTypes.string.isRequired,
  help: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

export default ZoningInput;

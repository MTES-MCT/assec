import React from 'react';
import PropTypes from 'prop-types';

const WidgetForm = ({ code }) => (
  <div id="assec-widget-form" className="flex-1" />
);

WidgetForm.propTypes = {
  code: PropTypes.string.isRequired,
};

export default WidgetForm;

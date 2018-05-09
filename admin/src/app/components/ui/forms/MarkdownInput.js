import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

// application
import MarkdownEditor from './adpaters/MarkdownEditor';

const MarkdownInput = ({
  inline, name, label, ...rest
}) => (
  <div>
    <label className={inline ? 'inline' : ''} htmlFor={name}>
      <span>{label}</span>
      <span className="markdown-input">
        <Field id={name} name={name} component={MarkdownEditor} {...rest} />
      </span>
    </label>
  </div>
);

MarkdownInput.defaultProps = {
  inline: false,
};

MarkdownInput.propTypes = {
  inline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default MarkdownInput;
